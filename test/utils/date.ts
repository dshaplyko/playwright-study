import moment, { Moment } from "moment-timezone";

export const calculateDateDifference = (dateFrom: Date | Moment, dateTo: Date | Moment): number => {
  dateFrom = moment(dateFrom);
  dateTo = moment(dateTo);
  return dateTo.diff(dateFrom, "days");
};

export const getCurrentHKTime = () => moment().tz("Asia/Hong_Kong");

export const generateMaintenancePeriod = (): { timeFrom: string; timeTo: string } => {
  const currentHKTime = getCurrentHKTime();
  return {
    timeFrom: currentHKTime.format("HH:mm:ss"),
    timeTo: currentHKTime.add(30, "minutes").format("HH:mm:ss"),
  };
};
