import { format } from "date-fns";

export function* loopDays(from: Date, to: Date): Generator<Date> {
  const currentDate = new Date(from);
  const endYmd = format(to, "yyyyMMdd");

  while (format(currentDate, "yyyyMMdd") <= endYmd) {
    yield currentDate;
    currentDate.setDate(currentDate.getDate() + 1);
  }
}
