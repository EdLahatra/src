import store from '../redux/store';

export default {
  initialScreenUsers: (notIntroScreen, _, getState) => {
    console.log({notIntroScreen});
    const users = getState && getState() ? getState().users : {};
    return {...users, notIntroScreen};
  },
  listUsers: (res, _, getState) => {
    if (res) {
      const etablishment =
        getState && getState() ? getState().etablishment : {};
      return {...etablishment, allUsers: res, ...res};
    }
    return {error: true};
  },
  renvoyerCodeUsers: res => {
    if (res && res.active) {
      return {users: null, signup: null, validation: true};
    }
    return {error: true, users: null, signup: null, message: res?.message};
  },
  validateUsers: res => {
    if (res && res.active) {
      return {users: null, signup: null, validation: true};
    }
    return {error: true, users: null, signup: null, message: res?.message};
  },
  addAddress: (addressId, _data, getState) => {
    if (addressId && addressId.hasOwnProperty('full')) {
      const users = getState && getState() ? getState().users : {};
      store.dispatch({
        type: 'users_update',
        payload: {
          ...users,
          user: {...users.user, addressId},
          signup: null,
          validation: null,
        },
      });
      return addressId;
    }
    return {error: true};
  },
  loginFbUsers: (res: any) => {
    if (res && res.data && !res.data.token) {
      return {
        ...res.data,
        user: res.data,
        token: null,
        signup: null,
        validation: null,
      };
    } else if (res && res.data && res.data.token) {
      return {
        ...res.data,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {validation: res.error};
    }
    return {user: null, signup: null, validation: null};
  },
  logoutUsers: () => {
    return {user: null, signup: null, validation: null, token: null};
  },
  signinUsers: (res, _data, getState) => {
    if (res && res.data && res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {validation: res.error, ...res};
    }
    return {user: null, signup: null, validation: null, token: null};
  },
  signupUsers: (res, _data, _getState) => {
    if (res && res._id) {
      return {user: null, validation: null, signup: res};
    }
    return {user: null, signup: null, validation: null, token: null};
  },
  updateUsers: (user, _data, getState) => {
    if (user && user.email) {
      const users = getState && getState() ? getState().users : {};
      return {...users, user, signup: null, validation: null};
    }
    return {error: true};
  },
  getUsers: (res, _data, getState) => {
    if (res && Array.isArray(res)) {
      const users = getState && getState() ? getState().users : {};
      return {...users, list: res, signup: null, validation: null};
    }
    return {error: true};
  },
  authAppleUsers: (res, data, getState) => {
    if (res && res.data && !res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: null,
        signup: null,
        validation: null,
      };
    } else if (res && res.data && res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {
        validation: res.error,
        user: {active: false},
        signup: null,
        email: res.email,
      };
    }
    return {
      user: {active: false},
      signup: null,
      validation: null,
      email: res.email,
    };
  },
  loginGmailUsers: (res, _data, getState) => {
    if (res && res.data && !res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: null,
        signup: null,
        validation: null,
      };
    } else if (res && res.data && res.data.token) {
      const users = getState && getState() ? getState().users : {};
      return {
        ...users,
        user: res.data,
        token: res.data.token,
        signup: null,
        validation: null,
      };
    } else if (res && res.error && typeof res.error === 'string') {
      return {validation: res.error};
    }
    return {
      user: {active: false},
      signup: null,
      validation: null,
      email: res.email,
    };
  },
  addFavorites: favorites => {
    if (favorites && favorites.establishment) {
      return {listFavorites: favorites.establishment, signup: null};
    }
    return {error: true};
  },
  getAllFavorites: favorites => {
    if (favorites && favorites.establishment) {
      return {listFavorites: favorites.establishment, signup: null};
    }
    return {error: true};
  },
  mdpOublierUsers: (mdp, _data, getState) => {
    if (mdp === true) {
      const users = getState && getState() ? getState().users : {};
      return {...users, mdp: true};
    }
    return {error: true};
  },
};
