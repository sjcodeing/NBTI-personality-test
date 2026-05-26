const app = getApp();
const quizEngine = require('../../utils/quiz-engine');

Page({
  data: {
    result: null,
    dimensionScores: [],
    radarData: [],
    character: null,
    shareImageUrl: '',
    isGeneratingImage: false,
    isShared: false,
    showDeepAnalysis: false
  },

  onLoad(options) {
    // 从 URL 参数读取 skin（最可靠），fallback 到 storage
    const skin = (options && options.skin) || (wx.getStorageSync('nbti_current_result') && wx.getStorageSync('nbti_current_result').skin) || 'workplace';
    const result = wx.getStorageSync('nbti_current_result');

    console.log('>>> [result] skin from URL/storage:', skin);
    console.log('>>> [result] result.skin:', result && result.skin);
    console.log('>>> [result] result.character.id:', result && result.character && result.character.id);
    console.log('>>> [result] result.character.name:', result && result.character && result.character.name);

    if (!result || !result.character) {
      wx.showToast({ title: '请先完成测试', icon: 'none' });
      setTimeout(() => wx.redirectTo({ url: '/pages/index/index' }), 1500);
      return;
    }

    // 直接用 storage 里存好的 result.character（已经在 test.js 按正确 skin 算好了）
    // 不要 recalc，避免用错误的 skin 去查角色
    const character = quizEngine.getCharacterById(result.character.id, skin) || result.character;
    console.log('>>> [result] getCharacterById => name =', character.name, 'skin =', skin);

    // 检查是否已分享过
    const isShared = wx.getStorageSync('nbti_shared_' + character.id) || false;

    this.setData({
      result,
      dimensionScores: result.dimensionScores || [],
      radarData: result.radarData || [],
      character,
      isShared: isShared,
      showDeepAnalysis: isShared
    });

    // 解锁该角色
    this.unlockCharacter(character.id);

    // 绘制雷达图（需等wx:if渲染完成）
    if (isShared && (result.radarData || []).length > 0) {
      setTimeout(() => this.drawRadarChart(), 300);
    }
  },

  // 解锁角色
  unlockCharacter(characterId) {
    let unlockedIds = wx.getStorageSync('unlockedCharacters') || [];
    
    if (!unlockedIds.includes(characterId)) {
      unlockedIds.push(characterId);
      wx.setStorageSync('unlockedCharacters', unlockedIds);
    }
  },

  onShow() {
    // 每次显示时刷新结果（只刷新分享状态，不覆盖皮肤角色）
    const result = wx.getStorageSync('nbti_current_result');
    if (result) {
      const isShared = wx.getStorageSync('nbti_shared_' + result.character.id) || false;
      this.setData({
        result,
        isShared: isShared,
        showDeepAnalysis: isShared
      });
      // 深度分析显示后重新绘制雷达图（wx:if导致canvas重新渲染）
      if (isShared && this.data.radarData.length > 0) {
        setTimeout(() => this.drawRadarChart(), 300);
      }
    }
  },

  // 绘制雷达图
  drawRadarChart() {
    const query = wx.createSelectorQuery();
    query.select('#radarCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const centerX = res[0].width / 2;
        const centerY = res[0].height / 2;
        const radius = Math.min(centerX, centerY) - 30;
        const dimensions = this.data.radarData;

        // 清空画布
        ctx.clearRect(0, 0, res[0].width, res[0].height);

        // 绘制背景网格
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(26, 26, 46, 0.1)';
          ctx.lineWidth = 1;
          for (let j = 0; j < 8; j++) {
            const angle = (Math.PI * 2 / 8) * j - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius * i / 5);
            const y = centerY + Math.sin(angle) * (radius * i / 5);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // 绘制轴线
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(26, 26, 46, 0.2)';
          ctx.lineWidth = 1;
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();

          // 绘制维度标签
          const labelX = centerX + Math.cos(angle) * (radius + 20);
          const labelY = centerY + Math.sin(angle) * (radius + 20);
          ctx.fillStyle = '#1a1a2e';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(dimensions[i]?.name || '', labelX, labelY);
        }

        // 绘制数据区域
        ctx.beginPath();
        ctx.fillStyle = 'rgba(26, 26, 46, 0.3)';
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
          const value = dimensions[i]?.value || 0;
          const x = centerX + Math.cos(angle) * (radius * value / 100);
          const y = centerY + Math.sin(angle) * (radius * value / 100);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 绘制数据点
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
          const value = dimensions[i]?.value || 0;
          const x = centerX + Math.cos(angle) * (radius * value / 100);
          const y = centerY + Math.sin(angle) * (radius * value / 100);
          
          ctx.beginPath();
          ctx.fillStyle = '#1a1a2e';
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
  },

  // 重新测试
  onRetest() {
    wx.redirectTo({
      url: '/pages/test/test'
    });
  },

  // 分享结果（生成卡片图）
  onShareResult() {
    this.setData({ isGeneratingImage: true });
    
    const character = this.data.character;
    if (!character || !character.image) {
      this.setData({ isGeneratingImage: false });
      wx.showToast({ title: '图片生成失败', icon: 'none' });
      return;
    }

    // 使用角色图片作为分享图
    wx.previewImage({
      urls: [character.image],
      current: character.image
    });
    
    this.setData({ isGeneratingImage: false });
  },

  // 分享给朋友（点击分享按钮即解锁，因微信无可靠分享成功回调）
  onShareAppMessage() {
    const character = this.data.character;
    const id = character?.id || '';
    // 点击分享按钮即视为有分享意图，直接解锁
    if (!this.data.isShared) {
      wx.setStorageSync('nbti_shared_' + id, true);
      this.setData({ isShared: true, showDeepAnalysis: true });
      wx.showToast({ title: '解锁成功！', icon: 'none' });
      // wx:if导致canvas重新渲染，延迟绘制雷达图
      setTimeout(() => this.drawRadarChart(), 300);
    }
    return {
      title: '你的职场面具掉了！速来领取你的专属牛马标签🏷️',
      path: '/pages/index/index',
      imageUrl: character?.image || ''
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const character = this.data.character;
    return {
      title: '你的职场面具掉了！速来领取你的专属牛马标签🏷️',
      query: '',
      imageUrl: character?.image || ''
    };
  },

  // 手动解锁（不分享也看）
  onUnlockDeep() {
    const character = this.data.character;
    const id = character?.id || '';
    wx.setStorageSync('nbti_shared_' + id, true);
    this.setData({ isShared: true, showDeepAnalysis: true });
  },

  // 查看排行榜
  onViewRanking() {
    wx.switchTab({
      url: '/pages/ranking/ranking'
    });
  },

  // 返回首页
  onBackHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 图片加载错误
  onImageError(e) {
    console.error('Image load error:', e);
    wx.showToast({
      title: '图片加载失败',
      icon: 'none'
    });
  }
});
