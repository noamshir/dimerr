export function setHome(isHome) {
  return (dispatch) => {
    const action = { type: "SET_HOME", isHome };
    dispatch(action);
    window.scrollTo(0, 0);
  };
}

export function setDetails(isDetails) {
  return (dispatch) => {
    const action = { type: "SET_DETAILS", isDetails };
    dispatch(action);
  };
}

export function setExplore(isExplore) {
  return (dispatch) => {
    const action = { type: "SET_EXPLORE", isExplore };
    dispatch(action);
  };
}
export function setProfile(isProfile) {
  return (dispatch) => {
    const action = { type: "SET_PROFILE", isProfile };
    dispatch(action);
  };
}

export function setScroll(isScroll) {
  return (dispatch) => {
    const action = { type: "SET_SCROLL", isScroll };
    dispatch(action);
  };
}

export function setSearchDisplay(isSearchBar) {
  return (dispatch) => {
    const action = { type: "SET_HOME_SEARCH_BAR", isSearchBar };
    dispatch(action);
  };
}

export function setBecomeSeller(isBecomeSeller) {
  return (dispatch) => {
    const action = { type: "setBecomeSeller", isBecomeSeller };
    dispatch(action);
  };
}

export function toggleSignInModal(isModalSign) {
  return (dispatch) => {
    const action = { type: "setSigninModal", isModalSign };
    dispatch(action);
  };
}

export function toggleJoinModal(isJoinModal) {
  return (dispatch) => {
    const action = { type: "setJoinModal", isJoinModal };
    dispatch(action);
  };
}
