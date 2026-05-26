const { CHARACTERS } = require('../../data/characters');

Page({
  data: {
    rankings: [],
    totalPeople: 12847
  },

  onLoad() {
    this.generateRankings();
  },

  generateRankings() {
    // 模拟排行榜数据
    const rankings = CHARACTERS
      .map((char, index) => ({
        id: char.id,
        name: char.name,
        alias: char.alias,
        level: char.level,
        badges: char.badges || [],
        count: Math.floor(Math.random() * 3000) + 500,
        rank: index + 1
      }))
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    this.setData({ rankings });
  },

  onItemTap(e) {
    const characterId = e.currentTarget.dataset.id;
    const character = CHARACTERS.find(c => c.id === characterId);
    if (character) {
      wx.showModal({
        title: character.name,
        content: `${character.alias}\n\n${character.description}\n\n"${character.quote}"`,
        showCancel: false,
        confirmText: '知道了'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: 'NBTI 牛马排行榜 - 看看大家都是什么牛马',
      path: '/pages/index/index'
    };
  }
});
