import { DaysWeekEnum } from '../enums/weekdays.enum';

interface DayBreak {
  start: string;
  end: string;
}

interface WeekdaySchedule {
  day: DaysWeekEnum;
  enabled: boolean;
  start: string | null;
  end: string | null;
  breaks?: DayBreak[];
}

interface SpecificDateSchedule {
  date: string;
  enabled: boolean;
  start?: string;
  end?: string;
  breaks?: DayBreak[];
}

export interface ISchedule {
  weekdays?: WeekdaySchedule[];
  specificDates?: SpecificDateSchedule[];
}
