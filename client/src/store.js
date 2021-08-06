import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import createRootReducer from "./reducers/rootReducer";

export const history = createBrowserHistory();

export default function configureStore(state) {
  const store = createStore(
    createRootReducer(history),
    state,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
}
