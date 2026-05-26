const { getAvailableTypes, generateCombination } = require('../../data/combinations');
const { CHARACTERS } = require('../../data/characters');

Page({
  data: {
    myType: null,           // 用户自己的牛马类型ID
    myCharacter: null,      // 用户自己的角色对象
    colleagueType: null,    // 同事的牛马类型ID
    colleagueCharacter: null,// 同事的角色对象
    showResult: false,      // 是否显示结果
    combinationResult: null,// 组合结果
    characters: [],         // 16个角色列表（用于选择）
    searchKeyword: '',      // 搜索关键词
    filteredCharacters: [], // 过滤后的角色列表
    hasTested: false        // 用户是否已测试过
  },

  onLoad() {
    // 构建角色选择列表
    const characters = CHARACTERS.map(c => ({
      id: c.id,
      name: c.name,
      alias: c.alias || '',
      level: c.level || '',
      description: this.getShortDesc(c.id)
    }));

    // 尝试读取用户自己的测试结果
    const lastResult = wx.getStorageSync('nbti_current_result');
    let myType = null;
    let myCharacter = null;
    let hasTested = false;

    if (lastResult && lastResult.character) {
      myType = lastResult.character.id;
      myCharacter = lastResult.character;
      hasTested = true;
    }

    this.setData({
      characters,
      filteredCharacters: characters,
      myType,
      myCharacter,
      hasTested
    });
  },

  // 获取角色简短描述
  getShortDesc(id) {
    const descs = {
      'MPJF': '拼命三郎，卷出天际',
      'MPJL': '暗中发力，无声卷',
      'MPRF': '哪里有火救哪里',
      'MPRL': '默默干活不刷存在',
      'MTJF': '边焦虑边卷，停不下来',
      'MTJL': '佛系但焦虑，纠结体',
      'MTRF': '热血干活但容易累',
      'MTRL': '摸鱼是一门艺术',
      'DPJF': '社恐但拼命卷',
      'DPJL': '安静地透明着',
      'DPRF': '独来独往的狼',
      'DPRL': '来无影去无踪',
      'DTJF': '焦虑但躺平，内耗严重',
      'DTJL': '真正的躺平大师',
      'DTRF': '随遇而安，佛系本系',
      'DTRL': '职场上最透明的存在'
    };
    return descs[id] || '神秘的牛马';
  },

  // 用户选择自己的类型（如果没测试过）
  onSelectMyType(e) {
    const typeId = e.currentTarget.dataset.id;
    const character = CHARACTERS.find(c => c.id === typeId);
    
    this.setData({
      myType: typeId,
      myCharacter: character
    });
  },

  // 选择同事的类型
  onSelectColleague(e) {
    const typeId = e.currentTarget.dataset.id;
    const character = CHARACTERS.find(c => c.id === typeId);
    
    this.setData({
      colleagueType: typeId,
      colleagueCharacter: character
    });

    // 自动计算组合
    this.calculateCombination();
  },

  // 搜索过滤
  onSearchInput(e) {
    const keyword = e.detail.value.trim();
    const { characters } = this.data;
    
    if (!keyword) {
      this.setData({ filteredCharacters: characters, searchKeyword: '' });
      return;
    }

    const filtered = characters.filter(c => 
      c.id.toLowerCase().includes(keyword.toLowerCase()) ||
      c.name.includes(keyword) ||
      c.alias.includes(keyword) ||
      c.description.includes(keyword)
    );

    this.setData({ filteredCharacters: filtered, searchKeyword: keyword });
  },

  // 计算组合结果
  calculateCombination() {
    const { myCharacter, colleagueCharacter } = this.data;
    
    if (!myCharacter || !colleagueCharacter) {
      wx.showToast({ title: '请选择两个角色', icon: 'none' });
      return;
    }

    const result = generateCombination(myCharacter, colleagueCharacter);
    
    this.setData({
      combinationResult: result,
      showResult: true
    });
  },

  // 重新选择
  onReset() {
    this.setData({
      colleagueType: null,
      colleagueCharacter: null,
      showResult: false,
      combinationResult: null,
      searchKeyword: ''
    });
    // 重新过滤
    this.setData({ filteredCharacters: this.data.characters });
  },

  // 分享
  onShareAppMessage() {
    const { combinationResult, myCharacter, colleagueCharacter } = this.data;
    if (!combinationResult) return {};

    return {
      title: combinationResult.shareText || '我和同事的牛马组合出炉了！',
      path: '/pages/index/index'
    };
  },

  // 返回首页
  onBackHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
