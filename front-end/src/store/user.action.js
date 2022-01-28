import { userService } from "../services/user.service.js";

export function signUp(user) {
  return async (dispatch) => {
    try {
      var signedUpUser = await userService.signUp(user);
      const action = { type: "SET_USER", user: signedUpUser };
      dispatch(action);
      return signedUpUser;
    } catch (err) {
      console.log('err', err)
    }
  };
}

export function googleLogin(googleId) {
  return async (dispatch) => {
    try {
      var loggedGoogleUser = await userService.getGoogleUser(googleId);
      const action = { type: "SET_USER", user: loggedGoogleUser };
      dispatch(action);
      return loggedGoogleUser;
    } catch (err) {
      return false;
    }
  };
}

export function signIn(user) {
  return async (dispatch) => {
    try {
      var loggedUser = await userService.login(user);
      const action = { type: "SET_USER", user: loggedUser };
      dispatch(action);
      return loggedUser;
    } catch (err) {
      console.log('err', err)
    }
  };
}

export function logout(user) {
  return async (dispatch) => {
    try {
      await userService.logout(user);
      const action = { type: "SET_USER", user: null };
      dispatch(action);
    } catch (err) {
      console.log('err', err)
    }
  };
}

export function saveSellerInfo(sellerInfo) {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.saveSellerInfo(sellerInfo);
      const action = { type: "SET_USER", user: updatedUser };
      dispatch(action);
    } catch (err) {
      console.log('err', err)
    }
  };
}
