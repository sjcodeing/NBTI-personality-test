// NBTI 校园人格测试 - 34题（精简幽默版）
// 四维度：M/D 社牛/社恐、P/R 计划/随性、J/T 认真/佛系、F/L 外放/内敛

const QUESTIONS = [
  // ===== M（社牛）4题 =====
  { id: 1, dimension: 'energy', text: '班会课上老师问有没有人自愿当班委，你会？', options: [
    { key: 'A', text: '我！我来！给大家服务顺便锻炼一下自己', scores: { M: 2 } },
    { key: 'B', text: '等别人先举手，实在没人上我再勉强举一下', scores: { D: 2 } },
    { key: 'C', text: '低头翻书，假装在做笔记，千万别cue到我', scores: { D: 2 } }
  ]},
  { id: 2, dimension: 'energy', text: '社团招新宣讲，你作为部长会？', options: [
    { key: 'A', text: 'PPT20页，互动游戏，小礼品，誓要成为全场最卷的社团', scores: { M: 2 } },
    { key: 'B', text: '发个宣传海报在群里，剩下的看缘分', scores: { D: 2 } },
    { key: 'C', text: '让副部去讲，我就负责在后面坐着点头微笑', scores: { D: 2 } }
  ]},
  { id: 3, dimension: 'energy', text: '在食堂看到一个不认识的同学独自吃饭，你会？', options: [
    { key: 'A', text: '端着餐盘过去：这儿有人吗？一起吃呗！', scores: { M: 2 } },
    { key: 'B', text: '扫一眼，默默找个离他远点的位置坐下', scores: { D: 2 } },
    { key: 'C', text: '绕到另一层去吃，眼不见为净', scores: { D: 2 } }
  ]},
  { id: 4, dimension: 'energy', text: '选修课老师问有没有人愿意做课堂分享，你会？', options: [
    { key: 'A', text: '我我我！这门课我正好感兴趣，让我来！', scores: { M: 2 } },
    { key: 'B', text: '低头假装看手机，等勇敢的同学先上', scores: { D: 2 } },
    { key: 'C', text: '会后私信老师：老师我可以……（线上重拳出击）', scores: { D: 2 } }
  ]},

  // ===== D（社恐）4题 =====
  { id: 5, dimension: 'energy', text: '室友叫你去参加同乡聚会，你的反应是？', options: [
    { key: 'A', text: '去啊！认识新朋友的机会不能错过！', scores: { M: 2 } },
    { key: 'B', text: '我那天有事，你们玩得开心（其实什么事都没有）', scores: { D: 2 } },
    { key: 'C', text: '去是去了，全程角落坐，有人cue我我就尴尬微笑', scores: { D: 2 } }
  ]},
  { id: 6, dimension: 'energy', text: '班级群里有人发红包，你会？', options: [
    { key: 'A', text: '第一个抢！手速就是我的尊严！', scores: { M: 2 } },
    { key: 'B', text: '等三分钟再抢，显得不那么财迷', scores: { D: 2 } },
    { key: 'C', text: '抢完默默潜水，连个谢都不发', scores: { D: 2 } }
  ]},
  { id: 7, dimension: 'energy', text: '路上遇到老师主动打招呼，你会？', options: [
    { key: 'A', text: '老师好！顺便聊两句最近的学习情况，给老师留个好印象', scores: { M: 2 } },
    { key: 'B', text: '微笑点头快步走过，心里默念：他没认出我吧？', scores: { D: 2 } },
    { key: 'C', text: '假装没看见，绕道走，等老师先发现我再说', scores: { D: 2 } }
  ]},
  { id: 8, dimension: 'energy', text: '被拉进一个新同学的微信群，你的反应是？', options: [
    { key: 'A', text: '主动爆照，自我介绍，顺便@几个人破冰', scores: { M: 2 } },
    { key: 'B', text: '先潜水看看情况，等熟悉了再说', scores: { D: 2 } },
    { key: 'C', text: '直接开免打扰，这个群将永远沉寂在我聊天列表底部', scores: { D: 2 } }
  ]},

  // ===== P（计划）5题 =====
  { id: 9, dimension: 'style', text: '期末考试还有两周，你会？', options: [
    { key: 'A', text: '制定复习计划表，精确到每小时，按计划执行每天复盘', scores: { P: 2 } },
    { key: 'B', text: '前13天该干嘛干嘛，最后一天晚上创造奇迹', scores: { R: 2 } },
    { key: 'C', text: '先刷B站搜"三天复习法"，收藏了等于学完了', scores: { R: 2 } }
  ]},
  { id: 10, dimension: 'style', text: '写论文导师说"你自己先调研一下"，你会？', options: [
    { key: 'A', text: '下载了30篇核心文献，整理成文献综述，还做了对比表格', scores: { P: 2 } },
    { key: 'B', text: '翻了十分钟论文，然后开始刷手机，下周再说', scores: { R: 2 } },
    { key: 'C', text: '让AI给我写了篇文献综述，导师竟然说写得不错', scores: { R: 2 } }
  ]},
  { id: 11, dimension: 'style', text: '小组作业要分工，你的习惯是？', options: [
    { key: 'A', text: '拉群、制定分工表、明确时间节点，给自己安排最多最难的部分', scores: { P: 2 } },
    { key: 'B', text: '等组长分配，没人当组长我就全做了算了', scores: { R: 2 } },
    { key: 'C', text: '祈祷组里有个卷王抱大腿，抱不上就自己硬上', scores: { R: 2 } }
  ]},
  { id: 12, dimension: 'style', text: '导师第8次推翻自己的意见，你的反应是？', options: [
    { key: 'A', text: '整理所有版本记录，标注改了哪些，发给导师：这是历次变更', scores: { P: 2 } },
    { key: 'B', text: '无所谓，反正下次他还会改的，改了也白改', scores: { R: 2 } },
    { key: 'C', text: '下次他再改，我就把录音笔开着放着', scores: { R: 2 } }
  ]},
  { id: 13, dimension: 'style', text: '新学期刚开始，你会？', options: [
    { key: 'A', text: '订好作息表，购买教材，制定本学期目标，摩拳擦掌', scores: { P: 2 } },
    { key: 'B', text: '先躺两周，反正第一节课也不会点名', scores: { R: 2 } },
    { key: 'C', text: '教材买了，书皮都包好了，结果一页没翻过', scores: { R: 2 } }
  ]},

  // ===== R（随性）4题 =====
  { id: 14, dimension: 'style', text: '课表发下来发现有节课撞了，你会？', options: [
    { key: 'A', text: '提前查哪个老师给分高、哪个教室近，选最优方案', scores: { P: 2 } },
    { key: 'B', text: '无所谓，到时候看心情，想去哪节就去哪节', scores: { R: 2 } },
    { key: 'C', text: '两节课都不去，在宿舍躺着最舒服', scores: { R: 2 } }
  ]},
  { id: 15, dimension: 'style', text: '论文开题被老师质疑，你的第一反应是？', options: [
    { key: 'A', text: '问清楚具体哪里不行，调整方向和框架，用数据说服老师', scores: { P: 2 } },
    { key: 'B', text: '先把题目翻译成英文，再加几个专业术语，看起来就不简单了', scores: { R: 2 } },
    { key: 'C', text: '无所谓，换个说法继续用，开题答辩糊弄过去就行', scores: { R: 2 } }
  ]},
  { id: 16, dimension: 'style', text: 'DDL前一天晚上，你的状态是？', options: [
    { key: 'A', text: '已经提交了，还润色了一遍，焦虑型人格不允许自己踩点', scores: { P: 2 } },
    { key: 'B', text: 'DDL就是第一生产力，最后三小时效率达到巅峰', scores: { R: 2 } },
    { key: 'C', text: '算了，反正也不急，让AI先帮我写个初稿吧', scores: { R: 2 } }
  ]},
  { id: 17, dimension: 'style', text: '社团活动需要拉赞助，你的态度是？', options: [
    { key: 'A', text: '列出目标商家，准备方案和报价单，预约负责人面谈', scores: { P: 2 } },
    { key: 'B', text: '发个朋友圈求助，然后等有资源的人主动找上门', scores: { R: 2 } },
    { key: 'C', text: '拉不到就算了，不做活动也没关系，省事', scores: { R: 2 } }
  ]},

  // ===== J（认真）5题 =====
  { id: 18, dimension: 'attitude', text: '室友每天去图书馆学到关门，你会？', options: [
    { key: 'A', text: '有点焦虑，收拾书包去图书馆，不能落后', scores: { J: 2 } },
    { key: 'B', text: '不卷了不卷了，命重要。他们卷他们的，我看我的剧', scores: { T: 2 } },
    { key: 'C', text: '无所谓，每个人有每个人的节奏，我有我的路', scores: { T: 2 } }
  ]},
  { id: 19, dimension: 'attitude', text: '学长说专业课挂科率50%，你的反应是？', options: [
    { key: 'A', text: '立刻找学长学姐要资料、加课程群，提前两周开始复习', scores: { J: 2 } },
    { key: 'B', text: '无所谓，反正我运气一直不错，说不定刚好过', scores: { T: 2 } },
    { key: 'C', text: '反正不会是我，想到这里就又安心刷手机了', scores: { T: 2 } }
  ]},
  { id: 20, dimension: 'attitude', text: '四六级还有一个月，你的状态是？', options: [
    { key: 'A', text: '下了三个背单词App，制定每日计划，真题买了两套', scores: { J: 2 } },
    { key: 'B', text: '买了网课收藏了无数攻略，然后……吃灰了', scores: { T: 2 } },
    { key: 'C', text: '无所谓，反正下次还能考，急什么', scores: { T: 2 } }
  ]},
  { id: 21, dimension: 'attitude', text: '室友每晚外放到凌晨，你睡不着会？', options: [
    { key: 'A', text: '买耳塞眼罩白噪音，把自己和噪音隔离起来，办法总比困难多', scores: { J: 2 } },
    { key: 'B', text: '算了，睡眠好，戴着耳机也能睡，就当背景音乐了', scores: { T: 2 } },
    { key: 'C', text: '发一条仅室友可见的朋友圈内涵，然后默默忍着', scores: { T: 2 } }
  ]},
  { id: 22, dimension: 'attitude', text: '大三了，同学都在考研考公就业，你的状态是？', options: [
    { key: 'A', text: '已经明确方向：跨专业考研，院校已定，复习计划排好，正在执行', scores: { J: 2 } },
    { key: 'B', text: '不知道，想了很久还是没想清楚，先刷会儿手机想想……', scores: { T: 2 } },
    { key: 'C', text: '在考研、考公、就业三条路之间横跳，焦虑到失眠', scores: { T: 2 } }
  ]},

  // ===== T（佛系）4题 =====
  { id: 23, dimension: 'attitude', text: '期末成绩出来了，比预期低，你会？', options: [
    { key: 'A', text: '查卷子，了解哪里扣分了，总结经验教训', scores: { J: 2 } },
    { key: 'B', text: '算了，有分就行，反正我也不是很在乎', scores: { T: 2 } },
    { key: 'C', text: '申诉！找老师要说法！不能就这么算了！', scores: { J: 2 } }
  ]},
  { id: 24, dimension: 'attitude', text: '室友又双叒叕在用你的东西不打招呼，你会？', options: [
    { key: 'A', text: '认真沟通边界，列个清单，明确哪些可以用哪些不可以', scores: { J: 2 } },
    { key: 'B', text: '无所谓，反正也不值几个钱，忍忍就过去了', scores: { T: 2 } },
    { key: 'C', text: '表面没事，心里默默记下，等哪天忍不住了爆发一次', scores: { T: 2 } }
  ]},
  { id: 25, dimension: 'attitude', text: '用AI写作业的同学期末分数比你高，你的感受是？', options: [
    { key: 'A', text: '立刻研究AI工具，卷不过就加入，加入了就得比他们用得更好', scores: { J: 2 } },
    { key: 'B', text: '无所谓，分数不能定义我的能力，我知道得比他们扎实', scores: { T: 2 } },
    { key: 'C', text: 'emo了，发了条仅自己可见的朋友圈：努力的意义是什么', scores: { T: 2 } }
  ]},
  { id: 26, dimension: 'attitude', text: '大创答辩老师说"你们这数据不太够"，你会？', options: [
    { key: 'A', text: '当场和老师确认需要补充哪些数据，回去了立刻补实验', scores: { J: 2 } },
    { key: 'B', text: '先把答辩糊弄过去，回头再想办法补数据', scores: { T: 2 } },
    { key: 'C', text: '让AI帮忙分析一下现有数据，看能不能抢救一下', scores: { T: 2 } }
  ]},

  // ===== F（表达）5题 =====
  { id: 27, dimension: 'express', text: '课程答辩轮到你，底下坐了100多人，你开场是？', options: [
    { key: 'A', text: '准备了PPT和开场段子，台下笑成一片，掌声雷动', scores: { F: 2 } },
    { key: 'B', text: '大家好我是xxx，我的项目是……然后全程低头念PPT', scores: { L: 2 } },
    { key: 'C', text: '紧张到忘词，在台上僵住五秒，空气突然安静……', scores: { L: 2 } }
  ]},
  { id: 28, dimension: 'express', text: '你用AI十分钟写了一篇论文，你会？', options: [
    { key: 'A', text: '发朋友圈：家人们这个工具太猛了！顺便出个教程', scores: { F: 2 } },
    { key: 'B', text: '安静地提交，多出来的时间用来看剧，不香吗', scores: { L: 2 } },
    { key: 'C', text: '让AI改出个人风格再去交，不然显得太AI了', scores: { F: 2 } }
  ]},
  { id: 29, dimension: 'express', text: '你在B站发了个作品集视频，播放量破10万，你会？', options: [
    { key: 'A', text: '把链接发到所有群、所有社交平台，顺便做个合集再发一遍', scores: { F: 2 } },
    { key: 'B', text: '偷偷截图保存数据，然后继续更新下一期，不值得专门说', scores: { L: 2 } },
    { key: 'C', text: '想发朋友圈宣传一下，写好了又删了，怕别人觉得我显摆', scores: { L: 2 } }
  ]},
  { id: 30, dimension: 'express', text: '课堂上教授讲的内容有错误，你会？', options: [
    { key: 'A', text: '举手：老师，这个地方可能有点问题……然后全班看着我', scores: { F: 2 } },
    { key: 'B', text: '默默记下来，下课私聊老师，不当众打脸', scores: { L: 2 } },
    { key: 'C', text: '发朋友圈吐槽：今天的课简直是浪费时间……', scores: { F: 2 } }
  ]},
  { id: 31, dimension: 'express', text: '有人问你论文写得怎么样了，你的回答是？', options: [
    { key: 'A', text: '已经写完了，正在润色，准备冲优秀论文', scores: { F: 2 } },
    { key: 'B', text: '还行吧……（其实才写了个标题）', scores: { L: 2 } },
    { key: 'C', text: '不想说，怕说了以后做不到丢人', scores: { L: 2 } }
  ]},

  // ===== L（内敛）4题 =====
  { id: 32, dimension: 'express', text: '你和同学讨论问题时，你一般？', options: [
    { key: 'A', text: '据理力争，有理有据，嗓门不自觉地提高了几度', scores: { F: 2 } },
    { key: 'B', text: '先听完对方说完，攒够信心再开口，结果已经讨论完了', scores: { L: 2 } },
    { key: 'C', text: '点点头表示同意，其实心里有不同的看法但不想说', scores: { L: 2 } }
  ]},
  { id: 33, dimension: 'express', text: '老师当众表扬了你的作业，你的反应是？', options: [
    { key: 'A', text: '谢谢老师！（内心窃喜，尾巴翘上了天）', scores: { F: 2 } },
    { key: 'B', text: '尴尬到想找个地缝钻，假装在翻书看不见我', scores: { L: 2 } },
    { key: 'C', text: '谢谢老师（其实什么感觉都没有，接着低头看手机）', scores: { L: 2 } }
  ]},
  { id: 34, dimension: 'express', text: '班级群里聊天，你的风格是？', options: [
    { key: 'A', text: '每条必回，群里的气氛担当，有我在就不冷场', scores: { F: 2 } },
    { key: 'B', text: '想好怎么回再发，不能显得太积极也不能太冷淡', scores: { L: 2 } },
    { key: 'C', text: '只抢红包不说话，说多错多，潜水才是王道', scores: { L: 2 } }
  ]},
  { id: 35, dimension: 'express', text: '室友说了一句让你不太舒服的话，你会？', options: [
    { key: 'A', text: '当场就说：我刚听到那句话，感觉有点不舒服，能聊聊吗', scores: { F: 2 } },
    { key: 'B', text: '算了，不是什么大事，忍忍就过去了，不想制造冲突', scores: { L: 2 } },
    { key: 'C', text: '表面没事，心里默默记下，等哪天忍不了了一起爆发', scores: { L: 2 } }
  ]}
];

module.exports = QUESTIONS;
