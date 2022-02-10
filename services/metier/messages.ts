export default {
  getMessages: (res, data, getState) => {
    if (res && Array.isArray(res)) {
      const messages = getState && getState() ? getState().messages : {};
      const list = messages.list || {};
      list[data.id] = res.reverse();
      return {...messages, list};
    }
    return {error: true};
  },
  getAdminMessages: (res, data, getState) => {
    if (res && Array.isArray(res)) {
      const messages = getState && getState() ? getState().messages : {};
      const list = messages.list || {};
      list[data.id] = res.reverse();
      return {...messages, list};
    }
    return {error: true};
  },
  adminMessages: (res, data, getState) => {
    if (res) {
      const messages = getState && getState() ? getState().messages : {};
      return {...messages};
    }
    return {error: true};
  },
  sendMessages: (res, data, getState) => {
    if (res) {
      const messages = getState && getState() ? getState().messages : {};
      return {...messages};
    }
    return {error: true};
  },
};
