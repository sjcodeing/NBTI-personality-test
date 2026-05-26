const { CHARACTERS } = require('../../data/characters');

Page({
  data: {
    characters: [],
    unlockedIds: []
  },

  onLoad() {
    this.loadCharacters();
  },

  onShow() {
    this.loadCharacters();
  },

  loadCharacters() {
    // 从本地存储获取已解锁的角色ID
    const unlockedIds = wx.getStorageSync('unlockedCharacters') || [];
    
    // 构建展示数据
    const characters = CHARACTERS.map(char => ({
      ...char,
      unlocked: unlockedIds.includes(char.id)
    }));

    this.setData({ characters, unlockedIds });
  },

  onCharacterTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/collection-detail/collection-detail?id=${id}`
    });
  },

  onShareAppMessage() {
    return {
      title: '来看看你是哪种牛马！',
      path: '/pages/index/index'
    };
  }
});
