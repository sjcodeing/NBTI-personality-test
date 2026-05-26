// NBTI 恋爱人格测试 - 34题（平衡版）
// 四维度：M/D 社牛/社恐、P/R 计划/随性、J/T 认真/佛系、F/L 外放/内敛

const QUESTIONS = [
  // ========== M（社牛/外倾）4题 ==========
  {
    id: 1, dimension: 'energy',
    text: '刚认识一个人，你会？',
    options: [
      { key: 'A', text: '主动搭话，话题源源不断，散场时已加了五个微信', scores: { M: 2 } },
      { key: 'B', text: '等对方先开口，我负责微笑点头', scores: { D: 2 } },
      { key: 'C', text: '加了微信后躺尸三个月，再见已是路人', scores: { D: 2 } }
    ]
  },
  {
    id: 2, dimension: 'energy',
    text: '对象在朋友圈发了合照，你第一反应是？',
    options: [
      { key: 'A', text: '立刻转发，配文"我家的！"，昭告天下', scores: { M: 2 } },
      { key: 'B', text: '悄悄点个赞，心意到了就好', scores: { D: 2 } },
      { key: 'C', text: '假装没看到，怕别人问来问去', scores: { D: 2 } }
    ]
  },
  {
    id: 3, dimension: 'energy',
    text: '你们吵架后，你会？',
    options: [
      { key: 'A', text: '必须当面说清楚，打电话、发消息、堵门口三连', scores: { M: 2 } },
      { key: 'B', text: '发条消息，等TA回复，不回就当没吵过', scores: { D: 2 } },
      { key: 'C', text: '冷战三天起，谁先低头谁是狗', scores: { D: 2 } }
    ]
  },
  {
    id: 4, dimension: 'energy',
    text: '对象心情不好，你会？',
    options: [
      { key: 'A', text: '直接冲过去陪他，什么班都可以不上了', scores: { M: 2 } },
      { key: 'B', text: '发个"抱抱"表情包，远程安慰一下', scores: { D: 2 } },
      { key: 'C', text: '等他冷静了再说，现在去可能会挨骂', scores: { D: 2 } }
    ]
  },

  // ========== D（社恐/内敛）4题 ==========
  {
    id: 5, dimension: 'energy',
    text: '第一次见对方家长，你的状态是？',
    options: [
      { key: 'A', text: '社牛附体，聊得比在家还嗨', scores: { M: 2 } },
      { key: 'B', text: '微笑点头问好，全程话题终结者', scores: { D: 2 } },
      { key: 'C', text: '全程找角落玩手机，假装自己不存在', scores: { D: 2 } }
    ]
  },
  {
    id: 6, dimension: 'energy',
    text: '对象突然说要给你惊喜，你猜是什么？',
    options: [
      { key: 'A', text: '激动得睡不着，期待值拉满', scores: { M: 2 } },
      { key: 'B', text: '表面期待，内心OS：不会是惊吓吧', scores: { D: 2 } },
      { key: 'C', text: '希望TA别搞那些有的没的，正常点就行', scores: { D: 2 } }
    ]
  },
  {
    id: 7, dimension: 'energy',
    text: '你们吵架后你发了长篇小作文，对方只回了个"嗯"。你会？',
    options: [
      { key: 'A', text: '继续发，不信TA不感动', scores: { M: 2 } },
      { key: 'B', text: '把手机摔一边，爱咋咋地', scores: { D: 2 } },
      { key: 'C', text: '后悔发了那篇作文，开始后悔', scores: { D: 2 } }
    ]
  },
  {
    id: 8, dimension: 'energy',
    text: '对象问你"你想我吗？"你怎么回？',
    options: [
      { key: 'A', text: '"当然想！每分每秒都在想！"', scores: { M: 2 } },
      { key: 'B', text: '"还行吧，你想我了吗？"', scores: { D: 2 } },
      { key: 'C', text: '打了一行字又删了，最后发了个表情包', scores: { D: 2 } }
    ]
  },

  // ========== P（计划/规划）5题 ==========
  {
    id: 9, dimension: 'style',
    text: '约会前一晚，你在做什么？',
    options: [
      { key: 'A', text: '查好路线、备好话题、想好穿搭，闹钟定了三个', scores: { P: 2 } },
      { key: 'B', text: '临时决定穿什么，反正TA也看习惯了', scores: { R: 2 } },
      { key: 'C', text: '睡到第二天早上，反正TA会来接我', scores: { R: 2 } }
    ]
  },
  {
    id: 10, dimension: 'style',
    text: '你们在一起一周年的计划是？',
    options: [
      { key: 'A', text: '提前两周订好了餐厅，还准备了礼物和视频', scores: { P: 2 } },
      { key: 'B', text: '当天再说，有空就过没空就算了', scores: { R: 2 } },
      { key: 'C', text: '差点忘了纪念日，第二天才想起来', scores: { R: 2 } }
    ]
  },
  {
    id: 11, dimension: 'style',
    text: 'TA说"我们聊聊未来吧"，你的反应是？',
    options: [
      { key: 'A', text: '打开备忘录，列好要讨论的点，一条一条来', scores: { P: 2 } },
      { key: 'B', text: '走一步看一步，想那么远干嘛', scores: { R: 2 } },
      { key: 'C', text: '突然紧张，是不是要分手', scores: { R: 2 } }
    ]
  },
  {
    id: 12, dimension: 'style',
    text: '你们吵架了，TA说要冷静一下。你会？',
    options: [
      { key: 'A', text: '写个复盘文档，等TA冷静后一起分析问题', scores: { P: 2 } },
      { key: 'B', text: '给TA空间，各自冷静，谁先想通谁先说话', scores: { R: 2 } },
      { key: 'C', text: '冷静五分钟就开始焦虑，TA是不是不要我了', scores: { R: 2 } }
    ]
  },
  {
    id: 13, dimension: 'style',
    text: '你们决定一起旅行，你的第一反应是？',
    options: [
      { key: 'A', text: '打开Excel，景点、餐厅、交通、防坑指南全列好', scores: { P: 2 } },
      { key: 'B', text: '订好机票酒店，剩下的到时候再说', scores: { R: 2 } },
      { key: 'C', text: '让TA安排，我就负责跟着走', scores: { R: 2 } }
    ]
  },

  // ========== R（随性/灵活）4题 ==========
  {
    id: 14, dimension: 'style',
    text: '约会时TA临时改地点，你的反应是？',
    options: [
      { key: 'A', text: '重新规划路线，灵活应对，开心最重要', scores: { R: 2 } },
      { key: 'B', text: '有点小不爽但还是跟着走了', scores: { P: 2 } },
      { key: 'C', text: '内心已经翻白眼，但还是说"好呀"', scores: { P: 2 } }
    ]
  },
  {
    id: 15, dimension: 'style',
    text: '你们约好了周末，结果TA突然有事。你会？',
    options: [
      { key: 'A', text: '没关系呀，下周也可以，人最重要', scores: { R: 2 } },
      { key: 'B', text: '有点失落但理解，心里默默记下这笔账', scores: { P: 2 } },
      { key: 'C', text: '"每次都这样！"但还是说没关系', scores: { P: 2 } }
    ]
  },
  {
    id: 16, dimension: 'style',
    text: '你们吵架后，通常谁先道歉？',
    options: [
      { key: 'A', text: '无所谓先后，想通了就说，不憋着', scores: { R: 2 } },
      { key: 'B', text: '通常我先，但下次TA必须先', scores: { P: 2 } },
      { key: 'C', text: '谁也不道歉，拖到自动和好', scores: { P: 2 } }
    ]
  },
  {
    id: 17, dimension: 'style',
    text: '对方生日快到了，你打算？',
    options: [
      { key: 'A', text: '想送什么送什么，心意最重要', scores: { R: 2 } },
      { key: 'B', text: '提前一个月开始选，刷了三天购物软件', scores: { P: 2 } },
      { key: 'C', text: '到时候再买，反正快递很快', scores: { P: 2 } }
    ]
  },

  // ========== J（认真/计划性）5题 ==========
  {
    id: 18, dimension: 'attitude',
    text: '你们吵架了，你的原则是？',
    options: [
      { key: 'A', text: '必须当天说清楚，不能让问题过夜', scores: { J: 2 } },
      { key: 'B', text: '冷静一下再聊，情绪化的时候说不出好话', scores: { T: 2 } },
      { key: 'C', text: '为什么要吵架，打游戏不香吗', scores: { T: 2 } }
    ]
  },
  {
    id: 19, dimension: 'attitude',
    text: '你希望对象怎样报备行程？',
    options: [
      { key: 'A', text: '去哪、跟谁、几点回，详细汇报', scores: { J: 2 } },
      { key: 'B', text: '有事说一声就行，不用事事汇报', scores: { T: 2 } },
      { key: 'C', text: '我不管TA，TA也别管我', scores: { T: 2 } }
    ]
  },
  {
    id: 20, dimension: 'attitude',
    text: 'TA忘了你们的纪念日，你的反应是？',
    options: [
      { key: 'A', text: '有点伤心，但等他想起来再一起补过', scores: { J: 2 } },
      { key: 'B', text: '没事，我也没记住，说好的谁也不欠谁', scores: { T: 2 } },
      { key: 'C', text: '无所谓，纪念日这种东西有什么用', scores: { T: 2 } }
    ]
  },
  {
    id: 21, dimension: 'attitude',
    text: '你对这段感情的规划是？',
    options: [
      { key: 'A', text: '三年内结婚、五年内买房，路线图清晰', scores: { J: 2 } },
      { key: 'B', text: '想那么远干嘛，在一起开心就好了', scores: { T: 2 } },
      { key: 'C', text: '走一步看一步，想多了头疼', scores: { T: 2 } }
    ]
  },
  {
    id: 22, dimension: 'attitude',
    text: '你们吵架时你最在意的是？',
    options: [
      { key: 'A', text: '对错要分明，不能和稀泥', scores: { J: 2 } },
      { key: 'B', text: '态度最重要，赢了道理输了感情有什么用', scores: { T: 2 } },
      { key: 'C', text: '为什么每次都是我道歉，不公平', scores: { T: 2 } }
    ]
  },

  // ========== T（佛系/回避）4题 ==========
  {
    id: 23, dimension: 'attitude',
    text: '你们吵架冷战中，TA突然发来一个链接说"看这个好搞笑"。你的反应？',
    options: [
      { key: 'A', text: 'TA在给台阶，开心地接住，翻篇了', scores: { T: 2 } },
      { key: 'B', text: '还在生气，先回个"嗯"，等会再说', scores: { J: 2 } },
      { key: 'C', text: '我不想翻篇，我要继续生气', scores: { J: 2 } }
    ]
  },
  {
    id: 24, dimension: 'attitude',
    text: 'TA在朋友面前开了个你的玩笑，你会？',
    options: [
      { key: 'A', text: '跟着笑，自嘲一波，显得大度', scores: { T: 2 } },
      { key: 'B', text: '当场脸色不好，但事后再说', scores: { J: 2 } },
      { key: 'C', text: '发誓要报复，回去不理TA三天', scores: { J: 2 } }
    ]
  },
  {
    id: 25, dimension: 'attitude',
    text: '你们的关系进入平淡期，你会？',
    options: [
      { key: 'A', text: '正常现象，爱情变亲情，正常的', scores: { T: 2 } },
      { key: 'B', text: '制造点仪式感，找点新鲜感', scores: { J: 2 } },
      { key: 'C', text: '是不是不够爱了，开始怀疑这段感情', scores: { J: 2 } }
    ]
  },
  {
    id: 26, dimension: 'attitude',
    text: '对象问"你爱我什么"，你的回答是？',
    options: [
      { key: 'A', text: '爱你的全部啊，说不清楚，反正就是爱', scores: { T: 2 } },
      { key: 'B', text: '列个一二三四，逻辑清晰、有理有据', scores: { J: 2 } },
      { key: 'C', text: '这个问题太难回答了，换个话题吧', scores: { J: 2 } }
    ]
  },

  // ========== F（表达/外放）5题 ==========
  {
    id: 27, dimension: 'express',
    text: 'TA惹你生气了，你会？',
    options: [
      { key: 'A', text: '直接说出来，你这样做让我很不爽', scores: { F: 2 } },
      { key: 'B', text: '憋着不说，假装没事，等TA自己发现', scores: { L: 2 } },
      { key: 'C', text: '阴阳怪气一整天，让TA自己猜', scores: { L: 2 } }
    ]
  },
  {
    id: 28, dimension: 'express',
    text: 'TA问"你爱我吗"，你会？',
    options: [
      { key: 'A', text: '"爱啊！非常爱！超级无敌爱！"', scores: { F: 2 } },
      { key: 'B', text: '沉默三秒，然后说"你觉得呢"', scores: { L: 2 } },
      { key: 'C', text: '红着脸低头，说不出口', scores: { L: 2 } }
    ]
  },
  {
    id: 29, dimension: 'express',
    text: '你们吵架后，你通常会？',
    options: [
      { key: 'A', text: '必须当面说清楚，打电话、发消息、堵门口三连', scores: { F: 2 } },
      { key: 'B', text: '发条消息，等TA回复，不回就当没吵过', scores: { L: 2 } },
      { key: 'C', text: '冷战三天起，谁先低头谁是狗', scores: { L: 2 } }
    ]
  },
  {
    id: 30, dimension: 'express',
    text: '你对这段感情发朋友圈的态度是？',
    options: [
      { key: 'A', text: '重大节日必发，秀恩爱是刚需', scores: { F: 2 } },
      { key: 'B', text: '偶尔发一下，不想太高调', scores: { L: 2 } },
      { key: 'C', text: '从来不发，发了万一分手多尴尬', scores: { L: 2 } }
    ]
  },
  {
    id: 31, dimension: 'express',
    text: '你和TA吵架，TA说"你根本不了解我"。你会？',
    options: [
      { key: 'A', text: '直接问：你觉得我不了解你哪里？我想知道', scores: { F: 2 } },
      { key: 'B', text: '心里很委屈，但嘴上说：你说的对', scores: { L: 2 } },
      { key: 'C', text: '不想说话了，等双方都冷静了再说', scores: { L: 2 } }
    ]
  },

  // ========== L（内敛/沉默）4题 ==========
  {
    id: 32, dimension: 'express',
    text: '你们吵架后，你更倾向于？',
    options: [
      { key: 'A', text: '必须说清楚，哪怕吵一架也要说', scores: { F: 2 } },
      { key: 'B', text: '沉默一会儿，等情绪过去再聊', scores: { L: 2 } },
      { key: 'C', text: '想说什么但又觉得说了也没用，算了', scores: { L: 2 } }
    ]
  },
  {
    id: 33, dimension: 'express',
    text: 'TA和异性聊天时，你的表现是？',
    options: [
      { key: 'A', text: '直接问：这是谁？你俩什么关系？', scores: { F: 2 } },
      { key: 'B', text: '表面不在意，内心已经翻江倒海', scores: { L: 2 } },
      { key: 'C', text: '假装没看到，但已经默默记下这笔账', scores: { L: 2 } }
    ]
  },
  {
    id: 34, dimension: 'express',
    text: '对象问你"你在想什么"，你怎么回答？',
    options: [
      { key: 'A', text: '"我在想我们的未来，刚才在想我们老了以后会怎样"', scores: { F: 2 } },
      { key: 'B', text: '"没什么"，其实想了一百件事但不想说', scores: { L: 2 } },
      { key: 'C', text: '我也不知道在想什么，反正脑子停不下来', scores: { L: 2 } }
    ]
  }
];

module.exports = QUESTIONS;
