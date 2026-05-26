// NBTI 人格测试引擎 - 多皮肤支持

// 皮肤映射（懒加载，按需导入）
const SKIN_QUESTIONS = {
  workplace: require('../data/questions/workplace'),
  campus: require('../data/questions/campus'),
  love: require('../data/questions/love')
};

const SKIN_CHARACTERS = {
  workplace: require('../data/characters/workplace'),
  campus: require('../data/characters/campus'),
  love: require('../data/characters/love')
};

// 维度定义（通用）
const DIMENSIONS = [
  { key: 'energy', name: '能量', left: '社牛', right: '社恐', leftKey: 'M', rightKey: 'D' },
  { key: 'style', name: '做事', left: '计划', right: '随性', leftKey: 'P', rightKey: 'R' },
  { key: 'attitude', name: '态度', left: '卷王', right: '躺平', leftKey: 'J', rightKey: 'T' },
  { key: 'express', name: '表达', left: '表现', right: '沉默', leftKey: 'F', rightKey: 'L' }
];

/**
 * 获取题目列表
 * @param {string} skin - 皮肤ID，默认 workplace
 */
function getQuestions(skin = 'workplace') {
  return SKIN_QUESTIONS[skin] || SKIN_QUESTIONS.workplace;
}

/**
 * 获取角色列表
 * @param {string} skin - 皮肤ID，默认 workplace
 */
function getCharacters(skin = 'workplace') {
  return SKIN_CHARACTERS[skin] || SKIN_CHARACTERS.workplace;
}

/**
 * 根据ID获取角色
 * @param {string} id - 角色ID
 * @param {string} skin - 皮肤ID
 */
function getCharacterById(id, skin = 'workplace') {
  const chars = getCharacters(skin);
  return chars.find(c => c.id === id);
}

/**
 * 根据维度分数计算角色
 * @param {object} scores - 维度分数 {M, D, P, R, J, T, F, L}
 * @param {string} skin - 皮肤ID
 */
function calculateCharacter(scores, skin = 'workplace') {
  const chars = getCharacters(skin);
  
  // 四维度组合
  const energy = scores.M >= scores.D ? 'M' : 'D';
  const style = scores.P >= scores.R ? 'P' : 'R';
  const attitude = scores.J >= scores.T ? 'J' : 'T';
  const express = scores.F >= scores.L ? 'F' : 'L';
  
  const typeId = energy + style + attitude + express;
  return chars.find(c => c.id === typeId) || chars[0];
}

/**
 * 计算测试结果
 * @param {object} answers - 答案 {questionId: optionKey}
 * @param {string} skin - 皮肤ID
 */
function calculateResult(answers, skin = 'workplace') {
  const questions = getQuestions(skin);
  const chars = getCharacters(skin);
  
  // 初始化维度分数
  const scores = { M: 0, D: 0, P: 0, R: 0, J: 0, T: 0, F: 0, L: 0 };
  let answeredCount = 0;

  for (const q of questions) {
    const ans = answers[q.id] || answers[String(q.id)];
    if (!ans) {
      console.log('[quiz-engine] q.id=' + q.id + ' NOT in answers, answers keys=' + Object.keys(answers).join(','));
      continue;
    }
    
    const option = q.options.find(o => o.key === ans);
    console.log('[quiz-engine] q.id=' + q.id + ' ans=' + ans + ' option=' + JSON.stringify(option ? {key:option.key, scores:option.scores} : null));
    
    if (!option) {
      console.log('[quiz-engine] ERROR: option not found for key=' + ans + ' in question id=' + q.id);
      continue;
    }
    if (!option.scores) {
      console.log('[quiz-engine] ERROR: option.scores is missing for q.id=' + q.id + ' ans=' + ans);
      continue;
    }
    
    answeredCount++;
    for (const [dim, value] of Object.entries(option.scores)) {
      if (scores.hasOwnProperty(dim)) {
        scores[dim] += value;
        console.log('[quiz-engine] scores[' + dim + '] +=' + value + ' => ' + scores[dim]);
      }
    }
  }

  console.log('[quiz-engine] skin:', skin, 'answeredCount:', answeredCount, 'totalQuestions:', questions.length, 'scores:', JSON.stringify(scores));

  if (answeredCount === 0) {
    return {
      character: chars[0],
      dimensionScores: [],
      radarData: [],
      rawScores: scores,
      answeredCount: 0,
      totalQuestions: questions.length,
      skin,
      completedAt: new Date().toISOString()
    };
  }

  // 计算维度百分比
  const dimensionScores = [
    {
      key: 'energy', name: '能量',
      left: '社牛(M)', right: '社恐(D)',
      leftValue: scores.M, rightValue: scores.D,
      leftPercent: Math.round(scores.M / Math.max(1, scores.M + scores.D) * 100),
      rightPercent: Math.round(scores.D / Math.max(1, scores.M + scores.D) * 100),
      dominant: scores.M > scores.D ? '社牛' : scores.D > scores.M ? '社恐' : '平衡'
    },
    {
      key: 'style', name: '做事',
      left: '计划(P)', right: '随性(R)',
      leftValue: scores.P, rightValue: scores.R,
      leftPercent: Math.round(scores.P / Math.max(1, scores.P + scores.R) * 100),
      rightPercent: Math.round(scores.R / Math.max(1, scores.P + scores.R) * 100),
      dominant: scores.P > scores.R ? '计划' : scores.R > scores.P ? '随性' : '平衡'
    },
    {
      key: 'attitude', name: '态度',
      left: '卷王(J)', right: '躺平(T)',
      leftValue: scores.J, rightValue: scores.T,
      leftPercent: Math.round(scores.J / Math.max(1, scores.J + scores.T) * 100),
      rightPercent: Math.round(scores.T / Math.max(1, scores.J + scores.T) * 100),
      dominant: scores.J > scores.T ? '卷王' : scores.T > scores.J ? '躺平' : '平衡'
    },
    {
      key: 'express', name: '表达',
      left: '表现(F)', right: '沉默(L)',
      leftValue: scores.F, rightValue: scores.L,
      leftPercent: Math.round(scores.F / Math.max(1, scores.F + scores.L) * 100),
      rightPercent: Math.round(scores.L / Math.max(1, scores.F + scores.L) * 100),
      dominant: scores.F > scores.L ? '表现' : scores.L > scores.F ? '沉默' : '平衡'
    }
  ];

  const matchedCharacter = calculateCharacter(scores, skin);

  // 雷达图数据
  const radarData = [
    { name: '社牛', value: Math.min(100, scores.M * 10), fullMark: 100 },
    { name: '计划', value: Math.min(100, scores.P * 10), fullMark: 100 },
    { name: '卷王', value: Math.min(100, scores.J * 10), fullMark: 100 },
    { name: '表现', value: Math.min(100, scores.F * 10), fullMark: 100 },
    { name: '社恐', value: Math.min(100, scores.D * 10), fullMark: 100 },
    { name: '随性', value: Math.min(100, scores.R * 10), fullMark: 100 },
    { name: '躺平', value: Math.min(100, scores.T * 10), fullMark: 100 },
    { name: '沉默', value: Math.min(100, scores.L * 10), fullMark: 100 }
  ];

  return {
    character: matchedCharacter,
    dimensionScores,
    radarData,
    rawScores: scores,
    answeredCount,
    totalQuestions: questions.length,
    skin,
    completedAt: new Date().toISOString()
  };
}

module.exports = {
  dimensions: DIMENSIONS,
  getQuestions,
  getCharacters,
  getCharacterById,
  calculateCharacter,
  calculateResult
};
