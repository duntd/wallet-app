export const NumeralUtil = {
  formatNumber: (num: string | number, format?: number) => {
    try {
      if (typeof num === 'string') {
        let _num = num.replace(/,/g, '');
        return _num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&,');
      } else
        return num
          ?.toFixed(format ? format : 0)
          .replace(/\d(?=(\d{3})+(?!\d))/g, '$&,')
          ?.toString();
    } catch {
      return '';
    }
  },

  clearZero: (num: string | number) => {
    return (Number(num) / 1)?.toString();
  },

  modifyNum: (num: string | number) => {
    return Number(num?.toString().replace(/,/g, ''));
  },

  formatInteger: (num: string | number) => {
    return NumeralUtil.formatNumber(NumeralUtil.modifyNum(num), 0);
  },

  stringNumberFormat: (value: string | number) => {
    try {
      if (!value) return '';

      const format = value
        .toString()
        .replace(/,/g, '.')
        .replace(/[^\d.-]/g, '');

      if (isNaN(Number(format))) return '';

      return format;
    } catch (error) {
      return '';
    }
  },
};
