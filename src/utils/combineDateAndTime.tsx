import moment from "moment";
const combineDateAndTime = (date: string, time: string) => {
  const [hours, minutes] = time.split(":");
  const today = moment(date);
  const timeToSet = today.clone().hours(Number(hours)).minutes(Number(minutes));
  return timeToSet;
};

export default combineDateAndTime;
