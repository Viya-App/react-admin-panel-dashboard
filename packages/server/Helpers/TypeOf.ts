import isObject from "lodash/isObject";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ssZ";
const timeStampFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
export default (
  item: any
):
  | "boolean"
  | "bigInteger"
  | "double"
  | "timestamp"
  | "date"
  | "time"
  | "numeric"
  | "text"
  | "jsonb" => {
  switch (typeof item) {
    case "boolean":
      return "boolean";
    case "number":
      return isInt(item) ? "bigInteger" : "double"; //item > 999 ? "bigInteger" : "integer";
    case "string":
      if (validateDate(item, timeStampFormat)) {
        return "timestamp";
      } else if (validateDate(item, dateFormat)) {
        return "date";
      } else if (validateDate(item, timeFormat)) {
        return "time";
      } else if (!isNaN(Number(item)) && item.length < 10 && item[0] !== "0") {
        item = Number(item);
        return "numeric"; //isInt(item) ? "bigInteger" : "double"; //item > 999 ? "bigInteger" : "integer";
      } else {
        return "text";
      }
    case "object":
      if (Array.isArray(item) || isObject(item)) {
        return "jsonb";
      } else if (item === null) {
        return undefined;
      }
    default:
      break;
  }
};
function isInt(n) {
  return n % 1 === 0;
}

function validateDate(date, format) {
  return dayjs(date.replace("Z", ""), format).format(format) === date;
}
