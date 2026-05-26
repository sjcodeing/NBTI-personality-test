// NBTI 牛马人格测试 - 30题
// 四维度：能量(M/D)、做事(P/R)、态度(J/T)、表达(F/L)

const QUESTIONS = [
  {
    id: 1,
    dimension: 'energy',
    text: '周一早上9点，你还没坐稳，领导突然拉了个15人的对齐会。你的反应是？',
    options: [
      { key: 'A', text: '太好了！打开摄像头，调整坐姿，准备发言，这是我的主场。', scores: { M: 2 } },
      { key: 'B', text: '摄像头关闭，麦克风静音，打开外卖App，开始点午餐。', scores: { D: 2 } },
      { key: 'C', text: '假装网络卡顿："喂？喂？听不——"然后挂断重连，拖到会议结束。', scores: { D: 1, T: 1 } }
    ]
  },
  {
    id: 2,
    dimension: 'style',
    text: '接到一个新任务，deadline是下周五。你会？',
    options: [
      { key: 'A', text: '打开Notion，拆解任务，排好甘特图，精确到每天干什么。周五下午3点准时交付。', scores: { P: 2 } },
      { key: 'B', text: '先收藏，然后忘记。周四晚上11点突然想起来，肾上腺素飙升，一夜搞定。', scores: { R: 2 } },
      { key: 'C', text: '让ChatGPT先出个初稿，自己微调一下，周三就交了。剩下两天摸鱼。', scores: { R: 1, T: 1 } }
    ]
  },
  {
    id: 3,
    dimension: 'attitude',
    text: '下午5:55，活还没干完，工位旁边的同事已经在收拾包了。你会？',
    options: [
      { key: 'A', text: '继续干，反正回家也是刷手机，不如在公司卷出一片天。', scores: { J: 2 } },
      { key: 'B', text: '包已经收好了，电脑正在关机，门禁卡已经拔了，你说什么？', scores: { T: 2 } },
      { key: 'C', text: '把手头的活随便保存一下，明天再说。差不多得了，又不会出人命。', scores: { T: 1, R: 1 } }
    ]
  },
  {
    id: 4,
    dimension: 'express',
    text: '你用AI工具10分钟搞定了原来要2天的活。你会？',
    options: [
      { key: 'A', text: '在组会上做个"AI提效方法论"分享，PPT做了20页，顺便暗示自己不可替代。', scores: { F: 2 } },
      { key: 'B', text: '闭嘴。假装干了两天。多出来的时间用来研究股票。', scores: { L: 1, T: 1 } },
      { key: 'C', text: '发到工作群里："家人们，这个工具太猛了！"然后全组效率提高，你的不可替代性下降。', scores: { F: 1, M: 1 } }
    ]
  },
  {
    id: 5,
    dimension: 'attitude',
    text: '公司邮件："关于组织架构优化的通知"。你的第一反应是？',
    options: [
      { key: 'A', text: '连夜更新简历、优化作品集、找猎头，已经在Boss直聘上投了30家。', scores: { J: 2 } },
      { key: 'B', text: '打开脉脉看看谁被裁了，吃瓜第一，焦虑第二。', scores: { T: 1, M: 1 } },
      { key: 'C', text: '无所谓，每年都优化，我都活过三轮了。要不是我太能苟，就是领导忘了我。', scores: { T: 2 } }
    ]
  },
  {
    id: 6,
    dimension: 'energy',
    text: '老板在全员会上说"全面拥抱AI，用AI重塑工作流"。你会？',
    options: [
      { key: 'A', text: '当场举手："我来牵头！"连夜做了AI落地方案发全员邮件。', scores: { M: 2, J: 1 } },
      { key: 'B', text: '默默注册了8个AI工具账号，偷偷把效率提升300%，但谁都不告诉。', scores: { D: 2 } },
      { key: 'C', text: '心里嘀咕："拥抱完AI，下一步是不是就不用拥抱我了？"', scores: { D: 1, T: 1 } }
    ]
  },
  {
    id: 7,
    dimension: 'style',
    text: '重大项目出了严重事故，客户那边已经炸锅了。你的第一反应是？',
    options: [
      { key: 'A', text: '冷静打开应急预案，按流程排查原因，同时拉群同步进展，逐步止血。', scores: { P: 2 } },
      { key: 'B', text: '先把能补救的全补上！方案？事后再写！先别让客户骂了！', scores: { R: 2 } },
      { key: 'C', text: '默默打开脉脉搜"xx公司 事故"，看看有没有人比我更惨。', scores: { R: 1, T: 1 } }
    ]
  },
  {
    id: 8,
    dimension: 'express',
    text: '年终述职，轮到你了。你会？',
    options: [
      { key: 'A', text: '精心准备PPT，数据可视化拉满，业绩说成"赋能业务增长200%"。', scores: { F: 2 } },
      { key: 'B', text: '"今年就是……干了一些活……就这样吧。"然后坐下。', scores: { L: 2 } },
      { key: 'C', text: '让ChatGPT帮我写了个述职稿，配合AI生成的图表，效果比真干活的人还好。', scores: { L: 1, R: 1 } }
    ]
  },
  {
    id: 9,
    dimension: 'energy',
    text: '公司团建，去哪玩你来选。你的反应是？',
    options: [
      { key: 'A', text: '拉群投票，做攻略，订酒店，行程精确到小时。这种事不表现等什么？', scores: { M: 2, P: 1 } },
      { key: 'B', text: '你们去吧我不去了，那天我身体不太舒服（提前两周就开始不舒服了）。', scores: { D: 2 } },
      { key: 'C', text: '去是去，但全程戴着耳机坐角落。拍照时站最后一排，P图时裁掉。', scores: { D: 1, L: 1 } }
    ]
  },
  {
    id: 10,
    dimension: 'attitude',
    text: '隔壁组的同事被裁了，N+1拿了20万走人了。你的第一反应是？',
    options: [
      { key: 'A', text: '开始盘算自己的N+1能拿多少钱，默默打开计算器。', scores: { T: 2 } },
      { key: 'B', text: '更加努力地工作，让领导看到我的价值，绝对不能是我。', scores: { J: 2 } },
      { key: 'C', text: '在工位上默默流泪，不知道是同情他还是羡慕他。', scores: { T: 1, L: 1 } }
    ]
  },
  {
    id: 11,
    dimension: 'style',
    text: '上游第5次改方案了，这次改得面目全非。你会？',
    options: [
      { key: 'A', text: '拿出第1版方案逐条比对，用邮件抄送所有相关人等，留好证据链。', scores: { P: 2, F: 1 } },
      { key: 'B', text: '无所谓，反正之前也是东拼西凑的，改改也不费事。', scores: { R: 2 } },
      { key: 'C', text: '"您确定这是最终版？我录个音，省得下次扯皮。"', scores: { P: 1, F: 1 } }
    ]
  },
  {
    id: 12,
    dimension: 'express',
    text: '开会时你发现领导的方案有个明显的漏洞，你会？',
    options: [
      { key: 'A', text: '当场指出："领导，这个逻辑有问题，应该是这样……"然后画了个图。', scores: { F: 2 } },
      { key: 'B', text: '闭嘴，等执行的时候炸了再说。反正又不是我的锅。', scores: { L: 2 } },
      { key: 'C', text: '会后私聊领导："我有个小想法可以优化一下……"给领导留面子。', scores: { L: 1, M: 1 } }
    ]
  },
  {
    id: 13,
    dimension: 'energy',
    text: '午休时间到了，同事们组队去吃饭。你会？',
    options: [
      { key: 'A', text: '一起去！吃什么不重要，重要的是饭桌上的八卦和吐槽。', scores: { M: 2 } },
      { key: 'B', text: '自己点外卖，戴上耳机，工位就是我的私人餐厅。', scores: { D: 2 } },
      { key: 'C', text: '跟着去了，但全程低头玩手机。吃完第一个走，连谁买的单都没注意。', scores: { D: 1, T: 1 } }
    ]
  },
  {
    id: 14,
    dimension: 'attitude',
    text: '公司通知：AI培训必修课来了，不学完不让转正/晋升。你的反应？',
    options: [
      { key: 'A', text: '太好了，正好想学。不仅学完了，还考了个AI相关的证书，简历又多了一行。', scores: { J: 2 } },
      { key: 'B', text: '打开视频，2倍速播放，窗口最小化，继续该干嘛干嘛。', scores: { T: 2 } },
      { key: 'C', text: '认真学了一半，发现讲的还不如自己玩ChatGPT学到的多，遂关闭。', scores: { T: 1, R: 1 } }
    ]
  },
  {
    id: 15,
    dimension: 'style',
    text: '领导突然说："这个项目提前两周交付。"你的反应？',
    options: [
      { key: 'A', text: '重新排期，列出哪些可以砍掉，哪些必须保留，给领导一份新的里程碑计划。', scores: { P: 2 } },
      { key: 'B', text: '先答应，到时候再说。反正从来没有按时交付过的项目。', scores: { R: 2 } },
      { key: 'C', text: '连夜让AI生成所有方案文档和检查清单，假装一切准备充分。', scores: { R: 1, J: 1 } }
    ]
  },
  {
    id: 16,
    dimension: 'express',
    text: '你在公司干了一年最牛的项目终于上线了。你会？',
    options: [
      { key: 'A', text: '写了篇复盘文章发到行业社区，标题是"我是如何拯救这个千万级项目的"。', scores: { F: 2 } },
      { key: 'B', text: '默默关掉项目群，开始下一个任务。又不是干完就能升职。', scores: { L: 2 } },
      { key: 'C', text: '发了个朋友圈，但只有三天可见，配文是一个"。"', scores: { L: 1, D: 1 } }
    ]
  },
  {
    id: 17,
    dimension: 'energy',
    text: '飞书群里有人@了你，让你参加一个跨部门的头脑风暴。你会？',
    options: [
      { key: 'A', text: '秒回"好的！"准时到场，疯狂输出想法，白板上画满了。', scores: { M: 2 } },
      { key: 'B', text: '"这个会必须要我参加吗？我把我的想法发文档里行不行？"', scores: { D: 2 } },
      { key: 'C', text: '假装没看到，祈祷对方忘记。两天后："啊抱歉刚看到。"', scores: { D: 1, T: 1 } }
    ]
  },
  {
    id: 18,
    dimension: 'attitude',
    text: '你发现隔壁组用AI工具一个人干了原来三个人的活。你的想法是？',
    options: [
      { key: 'A', text: '立刻学起来。不仅要追上，还要超过。我要成为全公司AI效率第一人。', scores: { J: 2 } },
      { key: 'B', text: '那是不是以后只需要一个人了？其他两个是不是要被优化了……不会是我吧？', scores: { T: 1, D: 1 } },
      { key: 'C', text: '无所谓。AI的事让AI操心，我先把这杯咖啡喝完。', scores: { T: 2 } }
    ]
  },
  {
    id: 19,
    dimension: 'style',
    text: '你交上去的方案被领导打回来了，批注写了满满18条意见。你会？',
    options: [
      { key: 'A', text: '逐条回复，该改的改，不同意的摆事实讲道理，附上数据和案例支撑。', scores: { P: 2, F: 1 } },
      { key: 'B', text: '全选→删除→重写一版，反正改来改去不如推倒重来。', scores: { R: 2 } },
      { key: 'C', text: '让AI根据批注意见自动改一版，再交上去。如果还打回就再让AI改。', scores: { R: 1, T: 1 } }
    ]
  },
  {
    id: 20,
    dimension: 'express',
    text: '你发现了一个能给公司省50万的方案。你会？',
    options: [
      { key: 'A', text: '写个提案直接发给VP，标题："关于xx优化降本50万的方案"。顺便暗示要升职。', scores: { F: 2 } },
      { key: 'B', text: '默默实施了，也没告诉任何人。等年底领导发现的时候，他也不知道是谁做的。', scores: { L: 2 } },
      { key: 'C', text: '先告诉直属领导，功劳让领导去报。反正领导开心了我也不亏……吧？', scores: { L: 1, M: 1 } }
    ]
  },
  {
    id: 21,
    dimension: 'energy',
    text: '新来了个实习生，看起来很迷茫。你会？',
    options: [
      { key: 'A', text: '主动带他熟悉环境，介绍同事，拉进各种群，带他吃食堂。', scores: { M: 2 } },
      { key: 'B', text: '假装没看到。等他来问我的时候……也假装在开会。', scores: { D: 2 } },
      { key: 'C', text: '发了份入职文档给他："先看文档，有问题飞书问我就行。"', scores: { D: 1, P: 1 } }
    ]
  },
  {
    id: 22,
    dimension: 'attitude',
    text: '35岁了，身边的朋友开始讨论"35岁危机"。你的态度是？',
    options: [
      { key: 'A', text: '早就在准备了。副业、投资、技能多元化，35岁的我比25岁更值钱。', scores: { J: 2 } },
      { key: 'B', text: '焦虑有什么用？把当下过好就行。如果被裁就当给自己放个长假。', scores: { T: 2 } },
      { key: 'C', text: '已经焦虑到失眠了。每天刷招聘App到凌晨2点，但又不敢真的投简历。', scores: { J: 1, D: 1 } }
    ]
  },
  {
    id: 23,
    dimension: 'style',
    text: '领导让你做个竞品调研报告，还说"随便调研一下就行"。你会？',
    options: [
      { key: 'A', text: '调研了15个竞品，写了40页对比文档，附带数据分析和趋势预判。', scores: { P: 2, J: 1 } },
      { key: 'B', text: '"随便"那就真随便了。看了两篇公众号文章，拼了个结论，交差。', scores: { R: 2 } },
      { key: 'C', text: '让AI生成一份看起来很专业的报告，自己都没读完就提交了。', scores: { R: 1, L: 1 } }
    ]
  },
  {
    id: 24,
    dimension: 'energy',
    text: '周五下午，有人在群里发起了一场"AI会不会取代我们"的激烈辩论。你会？',
    options: [
      { key: 'A', text: '冲进去疯狂输出观点，写了2000字长文，还@了反方让他反驳。', scores: { M: 2, F: 1 } },
      { key: 'B', text: '围观吃瓜，偶尔点个赞，绝不亲自下场。', scores: { D: 1, T: 1 } },
      { key: 'C', text: '没看群聊。因为我已经下班了。你们聊。', scores: { D: 2 } }
    ]
  },
  {
    id: 25,
    dimension: 'attitude',
    text: 'AI工具越来越强，你发现自己的工作越来越像"帮AI检查作业"。你的感受？',
    options: [
      { key: 'A', text: '危机感拉满。开始学习AI做不到的方面：创意思维、人际沟通、战略判断。', scores: { J: 2 } },
      { key: 'B', text: '太好了。以后我只负责按回车键和审核AI的输出。打工人终于要解放了。', scores: { T: 2 } },
      { key: 'C', text: '有点慌，但又不想动。于是打开脉脉看别人慌，获得一点群体焦虑的安慰感。', scores: { T: 1, D: 1 } }
    ]
  },
  {
    id: 26,
    dimension: 'style',
    text: '项目交付前一天，关键环节突然出了问题，整个方案可能要推翻。你会？',
    options: [
      { key: 'A', text: '冷静梳理问题，找出根因，列出所有可能的解决路径，逐个排查。', scores: { P: 2 } },
      { key: 'B', text: '先用最快的方式打个补丁顶上去！能交差就行！完美方案以后再说！', scores: { R: 2 } },
      { key: 'C', text: '把问题描述扔给AI，让它帮我想办法。解决了也不知道为什么。', scores: { R: 1, D: 1 } }
    ]
  },
  {
    id: 27,
    dimension: 'energy',
    text: '公司裁员后，工位空了一半。剩下的人氛围很压抑。你会？',
    options: [
      { key: 'A', text: '主动在群里发段子活跃气氛，组织大家一起出去吃个饭。', scores: { M: 2 } },
      { key: 'B', text: '戴上降噪耳机，打开电脑干活。安静真好，终于没人打扰了。', scores: { D: 2 } },
      { key: 'C', text: '偷偷在座位上打开Boss直聘，一边干活一边刷岗位。你永远叫不醒一个在更新简历的人。', scores: { D: 1, J: 1 } }
    ]
  },
  {
    id: 28,
    dimension: 'express',
    text: '你做了一个特别牛的方案，但领导没看懂，在会上被否了。你会？',
    options: [
      { key: 'A', text: '当场据理力争，用数据和案例说明为什么这个方案牛。', scores: { F: 2 } },
      { key: 'B', text: '算了，领导说啥就是啥。按他的改，反正出问题不是我的锅。', scores: { L: 2 } },
      { key: 'C', text: '会后单独找领导，用他能听懂的方式重新讲一遍。', scores: { F: 1, M: 1 } }
    ]
  },
  {
    id: 29,
    dimension: 'attitude',
    text: '年底绩效面谈，领导说："你今年表现不错，但公司效益不好，涨薪5%。"你会？',
    options: [
      { key: 'A', text: '当场拿出准备好的行业薪资报告，据理力争要求至少15%。', scores: { J: 2, F: 1 } },
      { key: 'B', text: '微笑点头："理解公司的难处。"出门就把简历更新了。', scores: { T: 2 } },
      { key: 'C', text: '内心万马奔腾，但表面平静。回去在脉脉上匿名吐槽。', scores: { T: 1, L: 1 } }
    ]
  },
  {
    id: 30,
    dimension: 'energy',
    text: '如果可以给刚入职场的自己一个建议，你会说？',
    options: [
      { key: 'A', text: '多社交，多表现，让老板看到你的价值。', scores: { M: 2 } },
      { key: 'B', text: '别卷了，早点下班，身体最重要。', scores: { D: 2 } },
      { key: 'C', text: '学会用AI，这是未来10年最重要的技能。', scores: { J: 1, R: 1 } }
    ]
  }
];

module.exports = QUESTIONS;
