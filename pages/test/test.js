const quizEngine = require('../../utils/quiz-engine');
const app = getApp();

Page({
  data: {
    questions: [],
    currentIndex: 0,
    answers: {},
    currentQuestion: null,
    progress: 0,
    isComplete: false,
    totalQuestions: 0,
    skin: 'workplace'
  },

  onLoad() {
    const skin = wx.getStorageSync('selectedSkin') || 'workplace';
    const questions = quizEngine.getQuestions(skin);
    console.log('[test] onLoad skin:', skin, 'questions.length:', questions.length, 'firstQ:', questions[0] ? JSON.stringify(questions[0]).substring(0, 150) : 'UNDEFINED');

    this.setData({
      questions,
      totalQuestions: questions.length,
      currentQuestion: questions[0],
      progress: 0,
      skin
    });
  },

  onSelectOption(e) {
    // 优先从 dataset 取，其次 fallback 到 currentQuestion
    const dataset = e.currentTarget ? e.currentTarget.dataset : {};
    const optionKey = dataset.key || (this.data.currentQuestion && this.data.currentQuestion.options && this.data.currentQuestion.options[0] && this.data.currentQuestion.options[0].key);
    const qidFromDataset = dataset.qid;
    const currentQ = this.data.currentQuestion;
    const qid = qidFromDataset || (currentQ && currentQ.id);
    console.log('[test] TAP dataset:', JSON.stringify(dataset), 'qid:', qid, 'optionKey:', optionKey);
    console.log('[test] currentQuestion:', currentQ ? JSON.stringify(currentQ).substring(0, 200) : 'UNDEFINED');
    console.log('[test] currentQuestion.options:', currentQ && currentQ.options ? JSON.stringify(currentQ.options) : 'UNDEFINED');

    if (!qid) {
      console.error('[test] BUG: qid is undefined! dataset:', JSON.stringify(dataset), 'currentQ:', currentQ);
      return;
    }

    const answers = { ...this.data.answers, [String(qid)]: optionKey };
    console.log('[test] answers collected:', Object.keys(answers).length, '/', this.data.questions.length);
    const nextIndex = this.data.currentIndex + 1;
    const progress = Math.round((nextIndex / this.data.questions.length) * 100);
    
    if (nextIndex >= this.data.questions.length) {
      this.setData({ answers, progress: 100, isComplete: true });
      this.calculateAndNavigate(answers);
    } else {
      this.setData({
        answers,
        currentIndex: nextIndex,
        currentQuestion: this.data.questions[nextIndex],
        progress
      });
    }
  },

  calculateAndNavigate(answers) {
    wx.showLoading({ title: '分析中...', mask: true });
    
    setTimeout(() => {
      try {
        const { skin } = this.data;
        console.log('>>> [test] calculating with skin =', skin, 'answers =', JSON.stringify(answers));
        const result = quizEngine.calculateResult(answers, skin);
        console.log('>>> [test] result.skin =', result.skin, 'result.character.name =', result.character.name, 'result.character.id =', result.character.id);
        
        app.saveHistory(result);
        wx.setStorageSync('nbti_current_result', result);
        
        wx.hideLoading();
        wx.redirectTo({
          url: `/pages/result/result?skin=${skin}`
        });
      } catch (error) {
        wx.hideLoading();
        console.error('Calculate result error:', error);
        wx.showToast({
          title: '分析失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    }, 1000);
  },

  onPrevQuestion() {
    if (this.data.currentIndex > 0) {
      const prevIndex = this.data.currentIndex - 1;
      this.setData({
        currentIndex: prevIndex,
        currentQuestion: this.data.questions[prevIndex],
        progress: Math.round((prevIndex / this.data.questions.length) * 100)
      });
    }
  },

  onQuestionTap(e) {
    const index = e.currentTarget.dataset.index;
    if (index >= 0 && index < this.data.questions.length) {
      this.setData({
        currentIndex: index,
        currentQuestion: this.data.questions[index],
        progress: Math.round((index / this.data.questions.length) * 100)
      });
    }
  }
});
