import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "./user.reducer.js";
import { gigReducer } from "./gig.reducer.js";
import { orderReducer } from "./order.reducer.js";
import { scssReducer } from "./scss.reducer.js";

const rootReducer = combineReducers({
  userModule: userReducer,
  gigModule: gigReducer,
  orderModule: orderReducer,
  scssModule: scssReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
