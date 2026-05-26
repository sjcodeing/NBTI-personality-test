// NBTI 职场人格测试 - 34题（精简幽默版）
// 四维度：M/D 社牛/社恐、P/R 计划/随性、J/T 认真/佛系、F/L 外放/内敛

const QUESTIONS = [
  // ===== M（社牛）4题 =====
  { id: 1, dimension: 'energy', text: '开会时领导问谁有补充，你会？', options: [
    { key: 'A', text: '立刻举手，洋洋洒洒讲五分钟，展示自己的思考深度', scores: { M: 2 } },
    { key: 'B', text: '低头假装翻本子，心想：千万别cue我', scores: { D: 2 } },
    { key: 'C', text: '会后私聊领导"我有想法"，线上重拳出击', scores: { D: 2 } }
  ]},
  { id: 2, dimension: 'energy', text: '公司团建选地方，你的态度是？', options: [
    { key: 'A', text: '主动请缨做策划，拉群投票订行程，你就是这场活动的COO', scores: { M: 2 } },
    { key: 'B', text: '你们去就行，我那天家里有点事（突然不舒服）', scores: { D: 2 } },
    { key: 'C', text: '去是去了，全程角落戴耳机，聚餐时坐门口方便先撤', scores: { D: 2 } }
  ]},
  { id: 3, dimension: 'energy', text: '茶水间遇到大领导，你会？', options: [
    { key: 'A', text: '主动搭话：领导最近忙啥？顺便汇报一下我的项目进展', scores: { M: 2 } },
    { key: 'B', text: '假装没看见，低头刷卡走人，祈祷他也没看见我', scores: { D: 2 } },
    { key: 'C', text: '硬着头皮打个招呼，然后加速逃离现场', scores: { D: 2 } }
  ]},
  { id: 4, dimension: 'energy', text: '有同事要离职了，你会？', options: [
    { key: 'A', text: '主动请吃饭送行，饭桌上倾听吐槽，顺便拓展人脉', scores: { M: 2 } },
    { key: 'B', text: '默默点个赞，心里告别，工作中正常交接即可', scores: { D: 2 } },
    { key: 'C', text: '等TA走了才在群里发消息：祝好！人走了才敢表态', scores: { D: 2 } }
  ]},

  // ===== D（社恐）4题 =====
  { id: 5, dimension: 'energy', text: '午休时同事喊你一起去吃饭，你会？', options: [
    { key: 'A', text: '好啊！吃什么？走！现在就走！', scores: { M: 2 } },
    { key: 'B', text: '你们先去，我手头还有点活……（其实在刷手机）', scores: { D: 2 } },
    { key: 'C', text: '点外卖吧，出去吃太麻烦，我喜欢一个人吃饭', scores: { D: 2 } }
  ]},
  { id: 6, dimension: 'energy', text: '群里有陌生人加你，你会？', options: [
    { key: 'A', text: '秒通过，顺便翻一下对方朋友圈了解一下', scores: { M: 2 } },
    { key: 'B', text: '先晾半天再通过，想好了再说', scores: { D: 2 } },
    { key: 'C', text: '直接忽略，假装没看到，三天后过期自动拒绝', scores: { D: 2 } }
  ]},
  { id: 7, dimension: 'energy', text: '领导突然说要和你1v1聊聊，你会？', options: [
    { key: 'A', text: '好呀！正好有问题想请教领导（其实没什么事）', scores: { M: 2 } },
    { key: 'B', text: '我有什么问题吗？（开始心里打鼓，是不是要优化我）', scores: { D: 2 } },
    { key: 'C', text: '能不能改天？最近项目比较紧……（拖延大法）', scores: { D: 2 } }
  ]},
  { id: 8, dimension: 'energy', text: '公司年会上台发言，你的状态是？', options: [
    { key: 'A', text: '即兴发挥，和台下频繁互动，气氛拉满，全场MVP', scores: { M: 2 } },
    { key: 'B', text: '照着稿念，语速飞快，只想赶紧结束下台', scores: { D: 2 } },
    { key: 'C', text: '内心默念：别看我别看我别看我……感谢领导和同事', scores: { D: 2 } }
  ]},

  // ===== P（计划）5题 =====
  { id: 9, dimension: 'style', text: '周五收到下周deadline的任务，你会？', options: [
    { key: 'A', text: '立刻拆解任务，列计划，每天推进一点，周三就搞定', scores: { P: 2 } },
    { key: 'B', text: '收藏→关掉→周四晚上开始焦虑→周五凌晨硬肝', scores: { R: 2 } },
    { key: 'C', text: '周一先干点别的，周三看看能不能用AI糊弄过去', scores: { R: 2 } }
  ]},
  { id: 10, dimension: 'style', text: '领导说"这个项目可以随便做做"，你会？', options: [
    { key: 'A', text: '随便？那我认真对待，做个专业的"随便"出来', scores: { P: 2 } },
    { key: 'B', text: '随便那我就随便了，反正领导也不在意对吧？', scores: { R: 2 } },
    { key: 'C', text: '随便做了个初版，发现内容很多，干脆精简成一页交差', scores: { R: 2 } }
  ]},
  { id: 11, dimension: 'style', text: '接到一个复杂任务，你的习惯是？', options: [
    { key: 'A', text: '先搭框架画思维导图，拆解到最小颗粒度再动手', scores: { P: 2 } },
    { key: 'B', text: '边做边想，遇到问题再解决，行动力最重要', scores: { R: 2 } },
    { key: 'C', text: '先发个呆，把任务拆成几个文档放着压压惊', scores: { R: 2 } }
  ]},
  { id: 12, dimension: 'style', text: '方案被打回领导要求重做，你会？', options: [
    { key: 'A', text: '逐条对照意见，问清楚每个疑点，修改后主动再汇报', scores: { P: 2 } },
    { key: 'B', text: '好的马上改（默默打开上一版Ctrl+C Ctrl+V）', scores: { R: 2 } },
    { key: 'C', text: '重做三版交上去，结论和第一版几乎一样', scores: { R: 2 } }
  ]},
  { id: 13, dimension: 'style', text: '年终总结，你一般怎么写？', options: [
    { key: 'A', text: '分类整理KPI，数据可视化，配上未来规划', scores: { P: 2 } },
    { key: 'B', text: '让AI生成框架自己改，三小时搞定', scores: { R: 2 } },
    { key: 'C', text: '把去年的改个日期Ctrl+C Ctrl+V，完美', scores: { R: 2 } }
  ]},

  // ===== R（随性）4题 =====
  { id: 14, dimension: 'style', text: '约好下午两点开会，有人两点十分才到，你的反应是？', options: [
    { key: 'A', text: '准时到达，暗暗记下这个人，下次也踩点', scores: { P: 2 } },
    { key: 'B', text: '无所谓，反正会议也经常拖堂，大家彼此彼此', scores: { R: 2 } },
    { key: 'C', text: '下次我也晚十分钟，不能让自己显得太老实', scores: { R: 2 } }
  ]},
  { id: 15, dimension: 'style', text: '方案改了五版客户还在加需求，你会？', options: [
    { key: 'A', text: '整理所有变更记录，发邮件确认，让客户知道边界在哪', scores: { P: 2 } },
    { key: 'B', text: '算了，这次直接改，反正下次还会改的', scores: { R: 2 } },
    { key: 'C', text: '改完第六版发现，这不就是第一版加了点东西吗', scores: { R: 2 } }
  ]},
  { id: 16, dimension: 'style', text: '领导突然布置任务说"今天下班前给我"，你会？', options: [
    { key: 'A', text: '评估优先级，重要就先放下手头的事马上处理', scores: { P: 2 } },
    { key: 'B', text: '先答应，五点五十九分发过去就行，这么急肯定不急', scores: { R: 2 } },
    { key: 'C', text: '和领导确认：今天下班前是指今晚十二点前吗？', scores: { R: 2 } }
  ]},
  { id: 17, dimension: 'style', text: '写周报时，你的风格是？', options: [
    { key: 'A', text: '量化本周成果，列出下周计划，顺便提一下需要的资源', scores: { P: 2 } },
    { key: 'B', text: '写了三行：第一行"本周工作正常推进"，第二行无', scores: { R: 2 } },
    { key: 'C', text: '把日报改了改日期凑数，反正也没人仔细看', scores: { R: 2 } }
  ]},

  // ===== J（认真）5题 =====
  { id: 18, dimension: 'attitude', text: '公司发通知要优化组织架构，你会？', options: [
    { key: 'A', text: '立刻更新简历，同时主动找领导沟通了解自己的定位', scores: { J: 2 } },
    { key: 'B', text: '看看脉脉上谁被裁了，先吃个瓜定定神', scores: { T: 2 } },
    { key: 'C', text: '无所谓，每次都优化三轮了，我还活得好好的', scores: { T: 2 } }
  ]},
  { id: 19, dimension: 'attitude', text: '发现同事用AI一个人干了三个人的活，你会？', options: [
    { key: 'A', text: '马上研究AI工具，学会了教全组，不能落后', scores: { J: 2 } },
    { key: 'B', text: '那是不是要裁两个人？希望不是我', scores: { T: 2 } },
    { key: 'C', text: '无所谓，AI的事让AI操心，我先刷会儿', scores: { T: 2 } }
  ]},
  { id: 20, dimension: 'attitude', text: '年底绩效谈话，领导说"表现不错，涨薪5%"，你会？', options: [
    { key: 'A', text: '当场拿出市场薪资数据，据理力争谈一个合理的涨幅', scores: { J: 2 } },
    { key: 'B', text: '好的谢谢领导（出门立刻打开招聘软件）', scores: { T: 2 } },
    { key: 'C', text: '内心翻江倒海，表面微笑：理解公司困难（背地写离职信草稿）', scores: { T: 2 } }
  ]},
  { id: 21, dimension: 'attitude', text: '你发现了一个能帮公司省100万的漏洞，你会？', options: [
    { key: 'A', text: '整理成方案发给VP，顺便暗示一下升职加薪的事', scores: { J: 2 } },
    { key: 'B', text: '先告诉直属领导，功劳让他去报，省得枪打出头鸟', scores: { T: 2 } },
    { key: 'C', text: '默默修了没说，等领导发现时看有没有人记得是我', scores: { T: 2 } }
  ]},
  { id: 22, dimension: 'attitude', text: '35岁到了，"35岁危机"你怎么看？', options: [
    { key: 'A', text: '早有准备，副业、技能、投资多元化，35岁的我更值钱', scores: { J: 2 } },
    { key: 'B', text: '焦虑有什么用？把当下过好就行，被裁了就当放假', scores: { T: 2 } },
    { key: 'C', text: '已经焦虑到失眠，每天刷招聘到凌晨，但不敢真的投', scores: { T: 2 } }
  ]},

  // ===== T（佛系）4题 =====
  { id: 23, dimension: 'attitude', text: '周一下班前十分钟领导突然布置新任务，你会？', options: [
    { key: 'A', text: '没问题领导，我今天加班搞定它', scores: { J: 2 } },
    { key: 'B', text: '好的领导（周一开始的周五deadline）', scores: { T: 2 } },
    { key: 'C', text: '收到，我看看能不能挪到下周排期中（委婉拒绝）', scores: { T: 2 } }
  ]},
  { id: 24, dimension: 'attitude', text: '公司推行996，你的态度是？', options: [
    { key: 'A', text: '积极响应，顺便研究怎么提高效率，省出点私人时间', scores: { J: 2 } },
    { key: 'B', text: '嘴上配合，实际到点就走，多一分钟都不行', scores: { T: 2 } },
    { key: 'C', text: '开始投简历了，这破班谁爱上谁上', scores: { T: 2 } }
  ]},
  { id: 25, dimension: 'attitude', text: '同事又双叒叕甩锅给你，你会？', options: [
    { key: 'A', text: '留好证据链，邮件抄送相关人，用事实说话', scores: { J: 2 } },
    { key: 'B', text: '算了，吃一堑长一智，下次留个心眼就是了', scores: { T: 2 } },
    { key: 'C', text: '无所谓，反正锅背着背着就习惯了（麻木了）', scores: { T: 2 } }
  ]},
  { id: 26, dimension: 'attitude', text: '年终奖发下来比预期少了一半，你会？', options: [
    { key: 'A', text: '约HR和领导聊，表达诉求，了解明年的提升空间', scores: { J: 2 } },
    { key: 'B', text: '算了行情不好，有年终奖就不错了，感恩公司', scores: { T: 2 } },
    { key: 'C', text: '一边干活一边刷招聘软件，市场价值才是真正的答案', scores: { T: 2 } }
  ]},

  // ===== F（表达）5题 =====
  { id: 27, dimension: 'express', text: '用AI一小时搞定了原本三天的活，你会？', options: [
    { key: 'A', text: '开个经验分享会，讲讲AI提效方法论，顺便打造个人品牌', scores: { F: 2 } },
    { key: 'B', text: '闭嘴，假装干了一个星期，多出来的时间研究股票', scores: { L: 2 } },
    { key: 'C', text: '发工作群：家人们AI太强了！然后自己不可替代性又降了一点', scores: { F: 2 } }
  ]},
  { id: 28, dimension: 'express', text: '年终述职轮到你，你会？', options: [
    { key: 'A', text: 'PPT做得像路演，数据图表拉满，顺便给自己的方案打个广告', scores: { F: 2 } },
    { key: 'B', text: '今年就是干了些活……就这样吧（坐下）', scores: { L: 2 } },
    { key: 'C', text: '全程低头念稿，只想赶紧结束，害怕和领导对视', scores: { L: 2 } }
  ]},
  { id: 29, dimension: 'express', text: '发现领导方案有漏洞，你会？', options: [
    { key: 'A', text: '当场指出：领导，这里有个问题……然后当场讨论', scores: { F: 2 } },
    { key: 'B', text: '闭嘴，让它炸。到时候再说，反正不是我的锅', scores: { L: 2 } },
    { key: 'C', text: '会后私聊：领导我有个小想法想和您探讨一下（给面子）', scores: { F: 2 } }
  ]},
  { id: 30, dimension: 'express', text: '工作取得重大突破，你会？', options: [
    { key: 'A', text: '复盘文章发出去，顺便@领导，暗示升职加薪', scores: { F: 2 } },
    { key: 'B', text: '默默关掉项目群，开始下一个任务。干完也不能升职', scores: { L: 2 } },
    { key: 'C', text: '发了个朋友圈，只有共同好友可见，配文一个句号', scores: { L: 2 } }
  ]},
  { id: 31, dimension: 'express', text: '开会时领导突然问你的意见，你会？', options: [
    { key: 'A', text: '当场回答，条理清晰，顺便补充几点延展', scores: { F: 2 } },
    { key: 'B', text: '让我想想……（其实什么都没想，就是不想第一个开口）', scores: { L: 2 } },
    { key: 'C', text: '低头假装翻本子，心想：过了过了不要看我', scores: { L: 2 } }
  ]},

  // ===== L（内敛）4题 =====
  { id: 32, dimension: 'express', text: '同事在讨论一个话题，你也有想法，你会？', options: [
    { key: 'A', text: '插话发表观点，观点碰撞出火花，气氛一下活跃起来', scores: { F: 2 } },
    { key: 'B', text: '听听别人怎么说，攒够信心再开口，结果已经讨论完了', scores: { L: 2 } },
    { key: 'C', text: '散会后私聊那个同事：你刚才说的那个观点，其实我也有想到……', scores: { L: 2 } }
  ]},
  { id: 33, dimension: 'express', text: '你做的工作成果被领导表扬了，你会？', options: [
    { key: 'A', text: '感谢团队支持，顺便说一下接下来想做什么，给领导留个靠谱印象', scores: { F: 2 } },
    { key: 'B', text: '谢谢领导（内心毫无波澜，继续干活）', scores: { L: 2 } },
    { key: 'C', text: '尴尬到想找个地缝钻，假装在忙别的事情', scores: { L: 2 } }
  ]},
  { id: 34, dimension: 'express', text: '工作群里有人发了一条消息，你的第一反应是？', options: [
    { key: 'A', text: '秒回！热情回应！让大家感受到我的存在感', scores: { F: 2 } },
    { key: 'B', text: '先想好怎么回再发，不能显得太急切也不能太冷淡', scores: { L: 2 } },
    { key: 'C', text: '看一眼就划过，回了显得我太闲，不回显得我不礼貌，干脆潜水', scores: { L: 2 } }
  ]},
  { id: 35, dimension: 'express', text: '同事说了一句让你不太舒服的话，你会？', options: [
    { key: 'A', text: '当场温和指出：这个角度我有不同看法……给个台阶', scores: { F: 2 } },
    { key: 'B', text: '假装没听见，私下再说，不想当众制造尴尬', scores: { L: 2 } },
    { key: 'C', text: '算了，不是什么大事，忍忍就过去了，不想引发冲突', scores: { L: 2 } }
  ]}
];

module.exports = QUESTIONS;
