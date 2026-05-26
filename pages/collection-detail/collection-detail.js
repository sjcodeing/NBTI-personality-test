const { CHARACTERS } = require('../../data/characters');

Page({
  data: {
    character: null
  },

  onLoad(options) {
    const { id } = options;
    const character = CHARACTERS.find(c => c.id === id);
    
    if (character) {
      this.setData({ character });
      wx.setNavigationBarTitle({ title: character.name });
    }
  },

  onShareAppMessage() {
    const { character } = this.data;
    return {
      title: `我是${character.name}！快来测测你是哪种牛马`,
      path: '/pages/index/index'
    };
  },

  // 解锁该角色（测试后调用）
  unlockCharacter() {
    const { character } = this.data;
    let unlockedIds = wx.getStorageSync('unlockedCharacters') || [];
    
    if (!unlockedIds.includes(character.id)) {
      unlockedIds.push(character.id);
      wx.setStorageSync('unlockedCharacters', unlockedIds);
      wx.showToast({ title: `解锁${character.name}！` });
    }
  }
});
