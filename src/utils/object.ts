export const ObjectUtil = {
  removeTrash: <T extends {}>(obj: T) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null),
    );
  },

  setFormData: (obj: {[key: string]: any} = {}, formData = new FormData()) => {
    for (const key in obj) {
      formData.append(`${key}`, obj[key]);
    }

    // const formData = setFormData({
    //   key1: data1,
    //   key2: data2,
    //   key3: data3,
    // })

    return formData;
  },
};
