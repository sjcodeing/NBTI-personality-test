/**
 * NBTI 牛马组合系统 - 智能动态生成版
 * 根据两个角色的维度属性自动生成幽默描述+多维度分析
 */

// 经典组合定义（手动优化，优先级最高）
const CLASSIC_COMBINATIONS = {
  'MPJF-MPJF': {
    name: '对抗路牛马',
    alias: '双卷王对决',
    emoji: '⚔️',
    description: '当两个卷王之王相遇，办公室瞬间变成战场。你们会为了谁先到公司、谁加班更晚而暗中较劲，最终共同创造了一个无人敢踏入的"卷王结界"。',
    pros: '生产力爆表，项目进度飞快，老板笑得合不拢嘴',
    cons: '容易引发办公室军备竞赛，其他同事压力山大',
    advice: '偶尔停下来喝杯奶茶，世界不会因你们少卷一天而崩溃',
    workplaceDynamic: '你们的关系就像火箭和导弹，互相助推但随时可能引爆',
    bestPartner: 'DTRL-职场透明人（你们需要有人缓和气氛）',
    shareText: '我和我的卷王同事成功组建了"对抗路双人组"！'
  },
  'MPJF-MPJL': {
    name: '卷王师徒',
    alias: '明卷与暗卷的完美结合',
    emoji: '👨‍🏫',
    description: '一个明面上卷，一个暗地里卷。你们的组合让整个办公室捉摸不透：到底谁更卷？答案是：你们轮流卷，24小时不间断。',
    pros: '无缝衔接的卷度，项目永远有人推进',
    cons: '其他同事根本跟不上你们的节奏',
    advice: '考虑带带新人，把卷的精神传承下去',
    workplaceDynamic: '你们就像日月更替，一个下班另一个上班',
    bestPartner: 'DTRF-随性牛马（需要有人拉你们回归现实）',
    shareText: '我和同事的卷王师徒组合出炉了！'
  },
  'MPJF-DPRL': {
    name: '量子纠缠牛马',
    alias: '卷王与幽灵的神秘组合',
    emoji: '👻',
    description: '你拼命卷，同事却像幽灵一样存在又不存在。你们的组合创造了办公室最大的谜题：那个工位上到底有没有人？但神奇的是，项目居然完成了。',
    pros: '卷王负责推进，幽灵负责...存在',
    cons: '沟通成本极高，你永远不知道幽灵同事在不在',
    advice: '尝试给幽灵同事发消息，万一他回了呢',
    workplaceDynamic: '你们就像物质与反物质，同时存在但互不干扰',
    bestPartner: 'MTRL-摸鱼大师（三个人可以玩捉迷藏）',
    shareText: '我的同事是个职场幽灵，但我们居然配合默契！'
  },
  'MTRL-MTRL': {
    name: '摸鱼联盟',
    alias: '双鱼坐镇，天下太平',
    emoji: '🐟',
    description: '当两个摸鱼大师相遇，你们瞬间组建了"摸鱼联盟"。上班 = 找个舒服的位置，打开电脑 = 打开游戏，开会 = 集体装傻。老板以为你们在深度思考，其实你们在深度摸鱼。',
    pros: '工作环境极度轻松，摸鱼技术互相精进',
    cons: '项目进度...什么进度？',
    advice: '偶尔假装工作一下，不然老板可能会发现',
    workplaceDynamic: '你们就像两条鱼，在办公室的海洋里自由自在地游来游去',
    bestPartner: 'MPJF-卷王之王（需要一个被你们折磨的卷王）',
    shareText: '我和同事组建了摸鱼联盟！欢迎加入我们的摸鱼培训班！'
  },
  'MTRL-DTRL': {
    name: '隐形摸鱼组',
    alias: '摸鱼于无形',
    emoji: '🎭',
    description: '一个明目张胆地摸鱼，一个隐形地摸鱼。你们的组合达到了摸鱼的至高境界：摸鱼于无形。老板巡查时，你们一个在"思考"，一个在"厕所"，实际上都在摸鱼。',
    pros: '摸鱼技术互补，隐蔽性极强',
    cons: '容易被忘记存在，发工资时可能漏掉你们',
    advice: '偶尔在群里冒个泡，证明自己还活着',
    workplaceDynamic: '你们就像忍者，摸鱼于无形但效果显著',
    bestPartner: 'MPRF-救火队长（需要有人真的干活）',
    shareText: '我和同事的隐形摸鱼组获奖了！（什么奖？摸鱼奥斯卡）'
  },
  'MPRF-MPRF': {
    name: '救火大队',
    alias: '双救火队长，办公室永远安全',
    emoji: '🚒',
    description: '当两个救火队长相遇，你们瞬间组建了"救火大队"。项目出问题？上！客户投诉？上！老板发飙？还是上！你们的存在让办公室变成了消防局，24小时待命。',
    pros: '办公室最安全的地方，什么问题都能解决',
    cons: '容易burnout，你们需要休息',
    advice: '学会说"不"，不是所有火都需要你们救',
    workplaceDynamic: '你们就像消防员，随时准备冲向火场',
    bestPartner: 'MTRL-摸鱼大师（需要有人让你们放松）',
    shareText: '我和同事都是救火队长！我们的办公室永远安全！'
  }
};

// ============ 维度标签映射 ============
const DIM_LABELS = {
  energy: { M: '外向型', D: '内向型' },
  style: { P: '计划型', R: '随性型' },
  attitude: { J: '严谨型', T: '佛系型' },
  express: { F: '表达型', L: '沉默型' }
};

// ============ 组合名称生成 ============
const SAME_TYPE_NAMES = {
  'MPJF': '对抗路牛马', 'MPJL': '双面暗卷组', 'MPRF': '救火大队', 'MPRL': '沉默推进器',
  'MTJF': '焦虑双煞', 'MTJL': '佛系纠结联盟', 'MTRF': '热血二人组', 'MTRL': '摸鱼联盟',
  'DPJF': '社恐卷王团', 'DPJL': '无声存在组', 'DPRF': '独狼双煞', 'DPRL': '幽灵二人组',
  'DTJF': '内耗双胞胎', 'DTJL': '躺平联盟', 'DTRF': '佛系搭档', 'DTRL': '透明人组合'
};

// 维度差异→组合名模板
function generateCombinationName(char1, char2) {
  // 同类型
  if (char1.id === char2.id) {
    return SAME_TYPE_NAMES[char1.id] || `双${char1.name}`;
  }

  // 基于维度差异生成
  const diffs = getDimensionDiffs(char1, char2);
  const templates = [];

  // 能量维度不同（M vs D）
  if (diffs.energy) {
    templates.push('日月组合', '阴阳牛马', '冰火搭档', '明暗双煞');
  }
  // 做事维度不同（P vs R）
  if (diffs.style) {
    templates.push('计划与随性', '方针组合', '节奏搭档', '快慢双煞');
  }
  // 态度维度不同（J vs T）
  if (diffs.attitude) {
    templates.push('严佛组合', '松紧搭档', '佛卷双修', '弹性组合');
  }
  // 表达维度不同（F vs L）
  if (diffs.express) {
    templates.push('说唱组合', '声默搭档', '话静双煞', '表达两面派');
  }

  // 多维度差异
  const diffCount = Object.keys(diffs).length;
  if (diffCount >= 3) {
    templates.push('跨次元牛马', '多元组合', '混沌搭档', '量子组合');
  }
  if (diffCount >= 2) {
    templates.push('反差萌组合', '互补牛马', '混搭搭档', '跨界组合');
  }

  // 没有维度差异（不可能到这里，但保险起见）
  if (templates.length === 0) {
    templates.push(`${char1.name}×${char2.name}`);
  }

  return templates[Math.floor(Math.random() * templates.length)];
}

// ============ 别名生成 ============
function generateAlias(char1, char2) {
  const diffs = getDimensionDiffs(char1, char2);
  const diffCount = Object.keys(diffs).length;

  if (diffCount === 0) {
    return `${char1.name}的自我复制`;
  }
  if (diffCount === 1) {
    return `${char1.name}与${char2.name}的微妙碰撞`;
  }
  if (diffCount === 2) {
    return `${char1.name}和${char2.name}的反差组合`;
  }
  if (diffCount === 3) {
    return `${char1.name}遇上${char2.name}，火花四溅`;
  }
  return `${char1.name}×${char2.name}的跨次元对话`;
}

// ============ Emoji 生成 ============
function generateEmoji(char1, char2) {
  const diffs = getDimensionDiffs(char1, char2);
  const diffCount = Object.keys(diffs).length;

  const emojiMap = {
    0: ['👯', '🪞', '🎯'],
    1: ['🤝', '⚡', '🔄'],
    2: ['💥', '🔥', '✨'],
    3: ['🎪', '🌪️', '🌋'],
    4: ['🌌', '🧬', '♾️']
  };

  const options = emojiMap[diffCount] || emojiMap[4];
  return options[Math.floor(Math.random() * options.length)];
}

// ============ 描述生成（核心） ============
function generateDescription(char1, char2) {
  if (char1.id === char2.id) {
    return generateSameTypeDescription(char1);
  }

  const diffs = getDimensionDiffs(char1, char2);
  const diffCount = Object.keys(diffs).length;
  const stats1 = char1.stats || {};
  const stats2 = char2.stats || {};

  // 基于维度差异拼装描述
  let parts = [];

  // 能量差异
  if (diffs.energy) {
    const extrovert = char1.id[0] === 'M' ? char1 : char2;
    const introvert = char1.id[0] === 'D' ? char1 : char2;
    parts.push(`${extrovert.name}负责社交和推进，${introvert.name}负责思考和沉淀`);
  }

  // 做事差异
  if (diffs.style) {
    const planner = char1.id[1] === 'P' ? char1 : char2;
    const random = char1.id[1] === 'R' ? char1 : char2;
    parts.push(`${planner.name}制定了完美的计划，${random.name}看了三秒然后按自己的方式来`);
  }

  // 态度差异
  if (diffs.attitude) {
    const strict = char1.id[2] === 'J' ? char1 : char2;
    const chill = char1.id[2] === 'T' ? char1 : char2;
    parts.push(`${strict.name}追求完美细节，${chill.name}觉得"差不多就行"`);
  }

  // 表达差异
  if (diffs.express) {
    const talker = char1.id[3] === 'F' ? char1 : char2;
    const silent = char1.id[3] === 'L' ? char1 : char2;
    parts.push(`${talker.name}的嘴从不停止，${silent.name}的回复永远是"嗯"`);
  }

  // 卷力对比
  const juan1 = stats1.juanLi || 3;
  const juan2 = stats2.juanLi || 3;
  if (Math.abs(juan1 - juan2) >= 3) {
    const juanKing = juan1 > juan2 ? char1 : char2;
    const chillOne = juan1 < juan2 ? char1 : char2;
    parts.push(`${juanKing.name}疯狂输出，${chillOne.name}在旁边默默喝着奶茶看戏`);
  }

  // 拼装描述
  if (parts.length === 0) {
    return `${char1.name}和${char2.name}的组合，就像办公室里的一场化学反应——没人知道结果是什么，但所有人都想看。`;
  }

  const openings = [
    `当${char1.name}遇上${char2.name}，办公室画风突变。`,
    `${char1.name}和${char2.name}组队了！HR看了直摇头。`,
    `这个组合让老板又爱又恨：`,
    `${char1.name}×${char2.name}，一个充满戏剧性的组合：`,
  ];

  const endings = [
    '你们的组合，是办公室最令人好奇的存在。',
    '总之，你们在一起，什么都有可能发生。',
    '这种搭配，大概只有命运才想得出来。',
    '恭喜你们，解锁了一种全新的职场相处模式。'
  ];

  const opening = openings[Math.floor(Math.random() * openings.length)];
  const ending = endings[Math.floor(Math.random() * endings.length)];

  return opening + parts.join('；') + '。' + ending;
}

// 同类型描述
function generateSameTypeDescription(char) {
  const templates = [
    `当两个${char.name}相遇，就是${char.name}的平方！双倍的属性，双倍的效果，办公室已经容不下你们了。`,
    `两个${char.name}在一起，就像照镜子——你们太像了，连吐槽的内容都一模一样。默契满分，但创新为零。`,
    `${char.name}×2=天下无敌？不，是${char.name}×2=互相放大对方的优缺点。好的更好，糟的更糟。`,
    `当你们两个${char.name}坐在一起，周围的空气都开始震颤。因为你们的存在本身就是一种共振。`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// ============ 分析生成 ============
function generateAnalysis(char1, char2) {
  const stats1 = char1.stats || {};
  const stats2 = char2.stats || {};
  const diffs = getDimensionDiffs(char1, char2);
  const diffCount = Object.keys(diffs).length;

  // 优点
  const prosOptions = [];
  if (diffCount >= 2) prosOptions.push('互补性极强，一个的短板恰好是另一个的长板');
  if (diffCount === 1) prosOptions.push('求同存异，默契感拉满');
  if (diffCount === 0) prosOptions.push('心有灵犀，沟通零成本');
  if ((stats1.juanLi || 3) + (stats2.juanLi || 3) >= 8) prosOptions.push('总卷力爆表，项目推进速度惊人');
  if ((stats1.sheJiaoLi || 3) + (stats2.sheJiaoLi || 3) >= 7) prosOptions.push('社交天团，客户关系无死角');
  if ((stats1.zhiXingLi || 3) + (stats2.zhiXingLi || 3) >= 8) prosOptions.push('执行力拉满，说到做到');
  if ((stats1.chuangZaoLi || 3) + (stats2.chuangZaoLi || 3) >= 7) prosOptions.push('创意无限，脑洞大开');
  if ((stats1.kangYa || 3) + (stats2.kangYa || 3) >= 8) prosOptions.push('抗压铁壁，天塌了也不慌');
  if ((stats1.xingFuGan || 3) + (stats2.xingFuGan || 3) >= 7) prosOptions.push('快乐传染，团队氛围满分');
  if (prosOptions.length === 0) prosOptions.push('组合效果独特，有可能创造意想不到的化学反应');

  // 缺点
  const consOptions = [];
  if (diffCount >= 3) consOptions.push('差异太大，磨合期可能很漫长');
  if (diffCount === 0) consOptions.push('太像了，容易陷入思维盲区');
  if ((stats1.juanLi || 3) >= 4 && (stats2.juanLi || 3) <= 2) consOptions.push('卷力差距悬殊，容易产生怨气');
  if ((stats1.sheJiaoLi || 3) >= 4 && (stats2.sheJiaoLi || 3) <= 1) consOptions.push('社交需求不匹配，外向的觉得闷，内向的觉得吵');
  if ((stats1.xingFuGan || 3) + (stats2.xingFuGan || 3) <= 4) consOptions.push('幸福感双低，需要一起去找点乐子');
  if (diffs.express) consOptions.push('沟通方式天差地别，一个想聊天一个只想沉默');
  if (diffs.attitude) consOptions.push('工作态度不同，容易在deadline前翻脸');
  if (consOptions.length === 0) consOptions.push('组合效果不稳定，看缘分');

  // 职场动态
  const dynamicOptions = [];
  if (diffs.energy && diffs.style) dynamicOptions.push('你们就像油门和方向盘——一个负责冲，一个负责拐，缺一不可');
  if (diffs.attitude && diffs.express) dynamicOptions.push('你们像极了一对相声搭档：一个捧哏一个逗哏，配合好了就是全场最佳');
  if (diffCount >= 3) dynamicOptions.push('你们的关系就像过山车——刺激、混乱、但绝不无聊');
  if (diffCount === 0) dynamicOptions.push('你们像两块同极磁铁——相似但偶尔互相排斥');
  if (diffCount === 1) dynamicOptions.push('你们像咖啡和奶——只有一点不同，但这一差异造就了拿铁');
  if (diffCount === 2) dynamicOptions.push('你们像火锅配冰啤——矛盾但莫名和谐');
  if (dynamicOptions.length === 0) dynamicOptions.push('你们的动态关系充满了惊喜和不确定性');

  // 最佳搭档
  const bestPartners = [
    'MPJF-卷王之王（需要推进力时找TA）',
    'MTRL-摸鱼大师（需要放松时找TA）',
    'MPRF-救火队长（需要救场时找TA）',
    'DTRL-职场透明人（需要清净时找TA）',
    'DTJL-真·躺平大师（需要降压时找TA）',
    'MPJL-沉默的卷王（需要稳定输出时找TA）'
  ];

  return {
    pros: prosOptions[Math.floor(Math.random() * prosOptions.length)],
    cons: consOptions[Math.floor(Math.random() * consOptions.length)],
    dynamic: dynamicOptions[Math.floor(Math.random() * dynamicOptions.length)],
    bestPartner: bestPartners[Math.floor(Math.random() * bestPartners.length)]
  };
}

// ============ 建议生成 ============
function generateAdvice(char1, char2) {
  const diffs = getDimensionDiffs(char1, char2);
  const diffCount = Object.keys(diffs).length;
  const stats1 = char1.stats || {};
  const stats2 = char2.stats || {};

  const advices = [];

  if (diffs.energy) advices.push('外向的别逼内向的社交，内向的别嫌外向的吵——尊重彼此的充电方式');
  if (diffs.style) advices.push('计划型可以列大纲，随性型负责灵感，别试图改变对方的节奏');
  if (diffs.attitude) advices.push('严谨型和佛系型需要约定"底线"——佛系不能拖后腿，严谨不能吹毛求疵');
  if (diffs.express) advices.push('话多的学会倾听，话少的学会表达，你们的沟通可以很有质量');

  if ((stats1.xingFuGan || 3) <= 2 && (stats2.xingFuGan || 3) <= 2) {
    advices.push('你们俩幸福感都不高...建议一起点杯奶茶，职场已经够苦了，别苦了自己');
  }
  if ((stats1.juanLi || 3) >= 4 && (stats2.juanLi || 3) <= 2) {
    advices.push('卷王请放过摸鱼选手，不是每个人都要用你的节奏活着');
  }
  if (diffCount === 0) {
    advices.push('你们太像了！试着找点不同的视角，不然你们会一起掉进同一个坑');
  }
  if (advices.length === 0) {
    advices.push('保持沟通，保持尊重，你们的组合有无限可能');
  }

  return advices[Math.floor(Math.random() * advices.length)];
}

// ============ 分享文案生成 ============
function generateShareText(name, char1, char2) {
  const templates = [
    `我和${char2.name}的组合是"${name}"！快来测测你和同事是什么组合！`,
    `当${char1.name}遇上${char2.name}，我们变成了"${name}"！😂`,
    `办公室新物种："${name}"！快来解锁你的牛马组合！`,
    `我的牛马组合结果：${char1.name}×${char2.name}="${name}"！你呢？`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// ============ 工具函数 ============

// 计算两个角色在哪些维度上不同
function getDimensionDiffs(char1, char2) {
  const diffs = {};
  if (char1.id[0] !== char2.id[0]) diffs.energy = true; // M/D
  if (char1.id[1] !== char2.id[1]) diffs.style = true;   // P/R
  if (char1.id[2] !== char2.id[2]) diffs.attitude = true; // J/T
  if (char1.id[3] !== char2.id[3]) diffs.express = true;  // F/L
  return diffs;
}

// ============ 主入口 ============

/**
 * 根据角色对象生成组合结果
 * @param {object} char1 - 第一个角色对象
 * @param {object} char2 - 第二个角色对象
 * @returns {object} 组合结果
 */
function generateCombination(char1, char2) {
  // 检查经典组合
  const key1 = char1.id;
  const key2 = char2.id;
  const key = key1 < key2 ? `${key1}-${key2}` : `${key2}-${key1}`;
  
  if (CLASSIC_COMBINATIONS[key]) {
    return CLASSIC_COMBINATIONS[key];
  }

  // 智能生成
  const name = generateCombinationName(char1, char2);
  const alias = generateAlias(char1, char2);
  const emoji = generateEmoji(char1, char2);
  const description = generateDescription(char1, char2);
  const analysis = generateAnalysis(char1, char2);
  const advice = generateAdvice(char1, char2);
  const shareText = generateShareText(name, char1, char2);

  return {
    name,
    alias,
    emoji,
    description,
    pros: analysis.pros,
    cons: analysis.cons,
    advice,
    workplaceDynamic: analysis.dynamic,
    bestPartner: analysis.bestPartner,
    shareText
  };
}

/**
 * 获取组合结果（只传ID时使用）
 */
function getCombination(type1, type2) {
  const key = type1 < type2 ? `${type1}-${type2}` : `${type2}-${type1}`;
  if (CLASSIC_COMBINATIONS[key]) {
    return CLASSIC_COMBINATIONS[key];
  }
  return {
    name: '奇妙牛马组合',
    alias: '意想不到的搭档',
    emoji: '✨',
    description: '你们的组合充满了惊喜！',
    pros: '可能创造奇迹',
    cons: '也可能创造灾难',
    advice: '保持开放心态，接受彼此的不同',
    workplaceDynamic: '你们就像化学反应，需要时间才能看到效果',
    bestPartner: '取决于具体组合',
    shareText: '我和同事的牛马组合出炉了！'
  };
}

/**
 * 获取所有可用角色ID
 */
function getAvailableTypes() {
  return [
    'MPJF', 'MPJL', 'MPRF', 'MPRL',
    'MTJF', 'MTJL', 'MTRF', 'MTRL',
    'DPJF', 'DPJL', 'DPRF', 'DPRL',
    'DTJF', 'DTJL', 'DTRF', 'DTRL'
  ];
}

module.exports = {
  CLASSIC_COMBINATIONS,
  getCombination,
  getAvailableTypes,
  generateCombination
};
