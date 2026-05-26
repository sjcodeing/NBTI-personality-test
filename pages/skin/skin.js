const { getAllSkins, getDefaultSkin } = require('../../data/skins');

Page({
  data: {
    skins: [],
    selectedSkin: null
  },

  onLoad() {
    const skins = getAllSkins();
    // 默认选中职场版
    this.setData({
      skins,
      selectedSkin: 'workplace'
    });
  },

  onSelectSkin(e) {
    const skinId = e.currentTarget.dataset.id;
    this.setData({ selectedSkin: skinId });
  },

  onStartTest() {
    const { selectedSkin } = this.data;
    if (!selectedSkin) return;

    // 保存选择的皮肤
    wx.setStorageSync('selectedSkin', selectedSkin);

    // 跳转到测试页
    wx.navigateTo({
      url: '/pages/test/test'
    });
  }
});
