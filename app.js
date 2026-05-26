App({
  globalData: {
    userInfo: null,
    history: [],
  },
  onLaunch() {
    this.loadHistory();
  },
  loadHistory() {
    try {
      const history = wx.getStorageSync('nbti_history');
      if (history) this.globalData.history = history;
    } catch (e) {}
  },
  saveHistory(result) {
    this.globalData.history.unshift(result);
    if (this.globalData.history.length > 10) this.globalData.history = this.globalData.history.slice(0, 10);
    wx.setStorageSync('nbti_history', this.globalData.history);
  },
});