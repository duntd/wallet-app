import dayjs from 'dayjs';

const DATE_FORMAT_VIEW = 'DD/MM/YYYY';
const DATE_FORMAT_DATA = 'YYYY-MM-DD';
const DATE_TIME_FORMAT_VIEW = 'DD/MM/YYYY HH:mm';

export const DateUtil = {
  dateFormatView: (date: string | Date) => {
    return dayjs(date).format(DATE_FORMAT_VIEW);
  },

  dateTimeFormatView: (date: string | Date) => {
    return dayjs(date).format(DATE_TIME_FORMAT_VIEW);
  },

  dateFormatData: (date: string | Date) => {
    return dayjs(date).format(DATE_FORMAT_DATA);
  },

  now: () => {
    return dayjs().format(DATE_FORMAT_VIEW);
  },
};
