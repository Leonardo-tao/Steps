const weekdaysZh = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
const weekdaysEn = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthsEn = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// 日期格式化
const getDatePart = (
  date,
  style,
  language
) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();

  const weekdayStr =
    language === "zh" ? weekdaysZh[weekday] : weekdaysEn[weekday];
  const monthNameEn = monthsEn[month - 1];

  switch (style) {
    case "full":
      return language === "zh"
        ? `${year}年${month}月${day}日${weekdayStr}`
        : `${weekdayStr}, ${monthNameEn} ${day}, ${year}`;
    case "long":
      return language === "zh"
        ? `${year}年${month}月${day}日`
        : `${monthNameEn} ${day}, ${year}`;
    case "medium": {
      const paddedMonth = month.toString().padStart(2, "0");
      const paddedDay = day.toString().padStart(2, "0");
      return `${year}-${paddedMonth}-${paddedDay}`;
    }
    case "short":
      return language === "zh"
        ? `${year}/${month}/${day}`
        : `${month}/${day}/${year}`;
    default:
      return "";
  }
};

// 时间格式化（默认 24 小时制）
const getTimePart = (
  date,
  style
) => {
  const pad = (num) => num.toString().padStart(2, "0");

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let hourDisplay, minDisplay, secDisplay;

  // 处理 short 风格的前导零
  if (style === "short") {
    hourDisplay = hours.toString();
    minDisplay = pad(minutes);
  } else {
    hourDisplay = pad(hours);
    minDisplay = pad(minutes);
    secDisplay = pad(seconds);
  }

  let timeStr = "";

  switch (style) {
    case "full":
      const tzOffset = -date.getTimezoneOffset() / 60;
      const gmtStr = `GMT${tzOffset >= 0 ? "+" : "-"}${Math.abs(tzOffset)}`;
      timeStr = `${gmtStr} ${hourDisplay}:${minDisplay}:${secDisplay}`;
      break;
    case "long":
      timeStr = `${hourDisplay}:${minDisplay}:${secDisplay}`;
      break;
    case "medium":
      timeStr = `${hourDisplay}:${minDisplay}`;
      break;
    case "short":
      timeStr = `${hourDisplay}:${minDisplay}`;
      break;
  }

  return timeStr;
};

// 合并后的 easyTime 函数
export const easyTime = function (options) {
  // 参数解析
  const {
    type = "datetime",    // 默认为 datetime
    dateStyle = "medium", // 默认日期风格
    timeStyle = "medium", // 默认时间风格
    lang = "zh",          // 默认语言
    date = new Date(),    // 默认当前时间
    separator = " ",      // 默认分隔符
  } = options || {};

  // 检查type是否合法
  if (!["date", "time", "datetime"].includes(type)) {
    throw new Error("Invalid type. Must be 'date', 'time', or 'datetime'.");
  }

  // 检查lang是否合法
  if (!["zh", "en"].includes(lang)) {
    throw new Error("Invalid language. Must be 'zh' or 'en'.");
  }

  let result = "";

  switch (type) {
    case "date":
      result = getDatePart(date, dateStyle, lang);
      break;
    case "time":
      result = getTimePart(date, timeStyle, lang);
      break;
    case "datetime":
      const dateStr = getDatePart(date, dateStyle, lang);
      const timeStr = getTimePart(date, timeStyle, lang);
      result = [dateStr, timeStr].filter(Boolean).join(separator);
      break;
  }

  return result;
};

// 获取过去 num 天的日期（默认为一个月）
export const getRecentDays = function (num = 30) {
  if (num <= 0) return [];

  const today = new Date();
  const result = [];

  for (let i = 0; i < num; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    result.push(`${year}-${month}-${day}`);
  }

  return result;
};
