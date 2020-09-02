// pages/home/index.js

let touchDotX = 0; //X按下时坐标
let touchDotY = 0; //y按下时坐标
let interval; //计时器
let time = 0; //从按下到松开共多少时间*100
let oneDay = 1000 * 60 * 60 * 24;
let nowDay = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDown: "",
    setInter: "",
    year: "",
    month: "",
    date: "",
    week: "",
    lunarCalendar: "",
    englishMonth: "",
    obj: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.notification();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getToday();
    this.getLunarCalendar(this.data.year, this.data.month + 1, this.data.date);
    this.getRandomData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // clearInterval(this.data.setInter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  getToday(dateString) {
    let dateArray = dateString && dateString.split("-");
    let date = dateArray && new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]) || new Date();
    // return "周" + "日一二三四五六".charAt(date.getDay());
    // const weekList = ["星期日",
    //   "星期一",
    //   "星期二",
    //   "星期三",
    //   "星期四",
    //   "星期五",
    //   "星期六"
    // ]
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let today = date;
    this.setData({
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate() < 10 ? `0${today.getDate()}` : today.getDate(),
      week: "星期" + "日一二三四五六".charAt(date.getDay()),
      englishMonth: monthList[today.getMonth()]
    })
  },

  getLunarCalendar(Year, rMonth, Day) {
    let CalendarData = new Array(100);
    let madd = new Array(12);
    let tgString = "甲乙丙丁戊己庚辛壬癸";
    let dzString = "子丑寅卯辰巳午未申酉戌亥";
    let numString = "一二三四五六七八九十";
    let monString = "正二三四五六七八九十冬腊";
    let weekString = "日一二三四五六";
    let sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    let cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
      return (m >> n) & 1;
    }

    function e2c() {
      TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      let total, m, n, k;
      let isEnd = false;
      let tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0;; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true;
            break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }

    function GetcDateString() {
      let tmp = "";
      tmp += tgString.charAt((cYear - 4) % 10);
      tmp += dzString.charAt((cYear - 4) % 12);
      tmp += "(";
      tmp += sx.charAt((cYear - 4) % 12);
      tmp += ")年 ";
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
      //solarYear = solarYear<1900?(1900+solarYear):solarYear;
      if (solarYear < 1921 || solarYear > 2020) {
        return "";
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }

    let lunarCalendar = GetLunarDay(Year, rMonth, Day) || "未来的日子算不出来";
    this.setData({
      lunarCalendar
    })
  },

  counter() {
    let date = new Date();
    let year = date.getFullYear();
    let date2 = new Date(year, 11, 30, 23, 59, 59, 999); //
    /*转换成秒*/
    let time = (date2 - date) / 1000;
    let day = Math.floor(time / (24 * 60 * 60))
    let hour = Math.floor(time % (24 * 60 * 60) / (60 * 60))
    let minute = Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60);
    let second = Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60);
    let str = year + "年还剩" + day + "天" + hour + "时" + minute + "分" + second + "秒 " + "有什么遗憾的吗";
    this.setData({
      countDown: str
    })
  },

  notification() {
    this.data.setInter = setInterval(this.counter, 1000); // 一秒打印一次
  },

  randomNumber(m, n) {
    let num = Math.floor(Math.random() * (m - n) + n);
    return num

  },

  bindDateChange(value) {

    this.changeTime(value.detail.value)
  },
  changeTime(data) {
    let year = data.slice(0, 4);
    let month = data.slice(5, 7);
    let day = data.slice(8, 10);
    this.getToday(data);
    this.getLunarCalendar(year, month, day)
    this.getRandomData();
  },
  touchStart(e) {
    touchDotX = e.touches[0].pageX; // 获取触摸时的原点
    touchDotY = e.touches[0].pageY;
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);

  },
  touchEnd(e) {
    let touchMoveX = e.changedTouches[0].pageX;
    let touchMoveY = e.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    if (time < 20) {
      let absX = Math.abs(tmX);
      let absY = Math.abs(tmY);
      if (absX > 2 * absY) {
        if (tmX < 0) {
          console.log("左滑=====")
          this.getDayBeforeAndAfter(0);
        } else {
          console.log("右滑=====")
          this.getDayBeforeAndAfter(1);

        }
      }
      // if (absY > absX * 2 && tmY<0) {
      //   console.log("上滑动=====")
      // }
    }
    clearInterval(interval); // 清除setInterval
    time = 0;

  },

  getDayBeforeAndAfter(type) {

    let toDay = new Date(this.data.year, this.data.month, this.data.date).getTime()
    let prevDay = type ? toDay + oneDay : toDay - oneDay
    nowDay.setTime(prevDay);
    this.changeTime(this.getDay());

  },
  getLocalTime(ns) {
      let date = new Date(ns);
    return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1 }-${date.getDate()}`;
  },
 
  getDay() {
    return `${nowDay.getFullYear()}-${nowDay.getMonth()> 10? nowDay.getMonth() + 1: `0${nowDay.getMonth() +1 }`}-${nowDay.getDate()}`
  },
  getRandomData() {
    const randomDataList = [{
        suitable: "宜臆想",
        content: "他明白,我们在自己的脑海里讲述的故事才是最重要的故事,因为我们都是内心的扩张主义者,是滑稽的幻想家。",
        author: "文学批评家, 詹姆斯.伍德 JAMES WOOD <<最接近生活的事物>>"
      },
      {
        suitable: "忌急功近利",
        content: "努力想得到什么东西,其实只要沉着镇静、实事求是,就可以轻易地、神不知鬼不觉地达到目的。",
        author: "作家, 弗朗茨.卡夫卡 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "忌绑架",
        content: "唯一真实的乐园是已失去的乐园，唯一有吸引力的世界是尚未踏入的世界。",
        author: "作家, 马赛尔·普鲁斯特 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "宜自洽",
        content: "今天是你余生的第一天。",
        author: "作家, 阿利斯泰尔·麦克劳德 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "宜解压",
        content: "万物皆有裂痕，那是光进来的地方。",
        author: "作家, 弗朗茨.卡夫卡 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "宜休整添新",
        content: "你要像球一样，可以在很多方向上生活。",
        author: "电影《托斯卡纳艳阳下》"
      },
      {
        suitable: "宜良知",
        content: "生命像一个极端分子，运行起来时狂热而不加节制。",
        author: "作家, 凯文·凯利 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "宜依靠",
        content: "生活在树上，始终热爱大地，升入天空。",
        author: "作家, 卡尔维诺 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "宜坚韧",
        content: "眼泪是挡不住子弹的，否则那该是个多么温柔的世界啊。",
        author: "《神探夏洛克》"
      },
      {
        suitable: "忌舒适区",
        content: "这些年的经验教会我一个道理，那就是，只要你努力，世界上没什么事是你搞不砸的。",
        author: "尼克·霍恩比《自杀俱乐部》"
      },
      {
        suitable: "宜精神充盈",
        content: "我喜欢你，想与你的世界相连。",
        author: "《木暮庄》三浦紫苑>"
      },
      {
        suitable: "忌自满",
        content: "在一定的距离之外，每个人都可能是我们要找的那一个。",
        author: "《假证件》"
      },
      {
        suitable: "忌泥沙俱下",
        content: "对未来的真正慷慨，是把一切都献给现在。",
        author: "加缪"
      },
      {
        suitable: "忌干戈",
        content: "我从不回忆过去，对我来说，唯一重要的事情就是永恒的现在。",
        author: "《月亮与六便士》毛姆 "
      },
      {
        suitable: "宜仰望",
        content: "时间永远分岔，通向无数的未来。。",
        author: "《小径分岔的花园》  博尔赫斯"
      },
      {
        suitable: "忌逢迎",
        content: "一个个强壮的日子仍然等在前面，像刚烤出来的面包一样诱惑。",
        author: "诗人，夏宇《强壮的日子》"
      },
      {
        suitable: "宜爱抚",
        content: "这个世界有多少种性格、野心和必然产生的幻觉，不可穷尽的疯癫就有多少种面孔。",
        author: "《疯癫与文明》"
      },
      {
        suitable: "忌泥沼",
        content: "我们都处在洞穴的深处，被自身的无知与偏见束缚，有限的感官呈现给我们的只有影子。",
        author: "《现实不似你所见》  ---卡洛罗威利"
      },
      {
        suitable: "宜失恋",
        content: "一切小说最终的含义都包括这两个方面：生命在继续，死亡不可避免。",
        author: "《如果在冬夜，一个旅人》卡尔维诺"
      },
      {
        suitable: "宜试炼",
        content: "哀痛和忧伤不是为了倾诉和哭泣，而是为了对抗遗忘。",
        author: "梁鸿《出梁庄记》"
      },
      {
        suitable: "宜燃烧",
        content: "一个阅读诗歌的人比不阅读诗歌的人更难战胜。",
        author: "《从彼得堡奥斯德哥尔摩》    约瑟夫卡罗茨基"
      },
      {
        suitable: "忌透支",
        content: "人生如逆旅，我亦是行人。",
        author: "苏东坡《临江仙-送钱穆父》"
      },
      {
        suitable: "宜洞悉",
        content: "生活本就是一餐一饭，一生专心做好一件事。",
        author: "是枝裕和《海街日记》"
      },
      {
        suitable: "宜恋恋风尘",
        content: "去生活，去犯错，去跌倒，去胜利，去用生命再创生命。",
        author: "詹姆斯.乔伊斯"
      },
      {
        suitable: "宜长久",
        content: "无论多么坚守的古旧秩序都正在被打开缺口。虽然从那个缺口进进出出的仍是传统的事物，但每一次出入都有些许的流失和轻微的替换。",
        author: "李娟 《最大的宁静》"
      },
      {
        suitable: "忌按部就班",
        content: "约着见一面，就能使见面的前后几天都沾着光，变成好日子。",
        author: "钱钟书 《围城》"
      },
      {
        suitable: "忌强颜欢笑",
        content: "人总得相信点什么，才好离开自己的爹娘，离开自己的家，而不觉得冷清又无助。。",
        author: "张大春《公寓导游》"
      },
      {
        suitable: "忌伪装",
        content: "翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来。",
        author: "作家, 弗朗茨.卡夫卡 FRANZ KAFKA <<城堡>>"
      },
      {
        suitable: "忌渐行渐远",
        content: "我知道你不在意，因为许多不切实际的鼓励大都是来自酒肉朋友或是远房亲戚。",
        author: "李宗盛《和自己赛跑的人》 "
      },
      {
        suitable: "宜松弛",
        content: "往昔即此刻，别处即此处。",
        author: "霍尔德.雅各布森  《夏洛特是我的名字》"
      },
      {
        suitable: "宜想我",
        content: "醉酒让我们失控，醉酒让我们最无望的执念寻一个无望的回答",
        author: "乔治.巴塔耶   《天空之蓝》"
      },
      {
        suitable: "忌惹我生气",
        content: "我们和你在一起，但是你必须独自迈出第一步。",
        author: "尼克.凯夫  《呕吐袋之歌》"
      },
      {
        suitable: "宜烤五串",
        content: "揭开秘密是人类根深蒂固的冲动。就是最不好奇的心，也会为即将得知他人的秘密而悸动。",
        author: "《线形文字B的破译》"
      },
      {
        suitable: "宜性暗示",
        content: "“自己”这个东西是看不见的。需要撞上什么东西，然后反弹回来，你才能看见自己，认识自己",
        author: "山本耀司"
      },
      {
        suitable: "宜主动",
        content: "理想的生活需要一点热爱和心动",
        author: "--李沧海"
      },
      {
        suitable: "宜吃薯片",
        content: "解决失望的办法就是停止期待",
        author: "--李沧海"
      },
      {
        suitable: "宜求婚",
        content: "任何人都可以很爱任何人,爱很廉价的,周围都是,有情饮水饱,你试试只是喝水看看饱不饱",
        author: "--网抑云"
      },
      {
        suitable: "宜任性",
        content: "你只会年轻一次,你不会想那么快长大的,那会错过成长的乐趣,快去享受青春活力吧",
        author: "--网抑云"
      },
      {
        suitable: "宜胡思乱想",
        content: "说实话 还在一起的时候 你有认真想过 以后的路该怎么走吗",
        author: "--bb猪"
      },
      {
        suitable: "宜跟bb猪结婚",
        content: "唔 不如跟我回家吧",
        author: "--某资深著名前端开发工程师李兰"
      },
      {
        suitable: "宜重逢",
        content: "也许我们将来会再相逢,请你勿忘我,海绵宝宝先生",
        author: "--派大星"
      },
      {
        suitable: "忌拒绝",
        content: "你好,我是派大星,天上派来保护你的大星星",
        author: "--派大星"
      },
      {
        suitable: "宜期待",
        content: "明明已经没有可能的事情,到底还在期待什么",
        author: "--网抑云"
      },
      {
        suitable: "宜撸码",
        content: "你是程序里的catch,除了抛错不知道怎么解决",
        author: "--从入门到精通"
      },
      {
        suitable: "忌逃避",
        content: "再听多几次分开的话,越致命越不正面回答",
        author: "--怪咖"
      },
      {
        suitable: "宜分离",
        content: "本次列车开往嘉禾望岗",
        author: "--网抑云"
      },
      {
        suitable: "宜晚安",
        content: "晚安,玛卡巴卡",
        author: "晚安,乌西迪西"
      }

    ]
    let number = this.randomNumber(0, randomDataList.length);
    this.setData({
      obj: randomDataList[number]
    })
  }
})