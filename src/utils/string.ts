export const StringUtil = {
  compare: (a: string, b: string) => {
    let aN = a.toLowerCase().normalize();
    let bN = b.toLowerCase().normalize();

    return aN.includes(bN);
  },

  pad: (number: number) => {
    var str = '' + number;
    var pad = '00000';
    return pad.substring(0, pad.length - str.length) + str;
  },
};
