import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { homeReducer } from "./reducers/homeReducer";

import { loadState, saveState, storageAvailable } from "./loadStorage";

let persistedState = {};
if (storageAvailable("localStorage")) {
  persistedState = loadState();
} else {
  persistedState = {};
}

export const store = createStore(
  combineReducers({
    homeReducer
  }),
  persistedState,
  applyMiddleware(thunk, logger)
);

// throttle will be fired after 2 sec, reason being as we are using localStorate which has heavy operation of JSON.strigify so to avoid that we are using throttle from lodash
store.subscribe(
  throttle(() => {
    if (storageAvailable("localStorage")) {
      saveState(store.getState());
      console.log("State changed...store updated!...saving into localStorage");
    } else {
      console.log("State changed...store updated!...no localStorage available");
    }
  }, 2000)
);
