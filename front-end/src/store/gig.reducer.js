const initialState = {
  gigs: null,
  category: "all",
  filterBy: {
    txt: "",
    deliveryTime: "",
    budget: "",
    category: "all",
    username: "",
  },
  sortBy: "best selling",
};

export function gigReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case "SET_GIGS":
      newState = { ...state, gigs: [...action.gigs] };
      break;
    case "ADD_GIG":
      newState = { ...state, gigs: [...state.gigs, action.gig] };
      break;
    case "UPDATE_GIG":
      newState = {
        ...state,
        gigs: state.gigs.map((gig) =>
          gig._id === action.gig._id ? action.gig : gig
        ),
      };
      break;
    case "REMOVE_GIG":
      newState = {
        ...state,
        gigs: state.gigs.filter((gig) => gig._id !== action.gigId),
      };
      break;
    case "SET_FILTERBY":
      newState = { ...state, filterBy: { ...action.filterBy } };
      break;
    case "SET_SORT":
      newState = { ...state, sortBy: action.value };
      break;
    case "SET_FILTERBY_FIELD":
      newState = {
        ...state,
        filterBy: { ...state.filterBy, [action.field]: action.value },
      };
      break;
    case "CLEAR_FILTERBY":
      newState = {
        ...state,
        filterBy: {
          txt: "",
          deliveryTime: "",
          budget: "",
          category: "all",
          username: "",
        },
        cacategory: "all",
      };
      break;
    default:
  }
  return newState;
}
