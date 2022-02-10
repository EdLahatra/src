export default {
  getByIdServices: (data, _parms, getState) => {
    const services = getState && getState() ? getState().services : {};
    if (data?._id) {
      const oldList = services?.list || {};
      return {
        ...oldList,
        [data?._id]: data,
      };
    }

    return {error: true};
  },
};
