import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import routeService from "../services/routeService";
// import userAdminService from "../services/userAdminService";

const routeReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ROUTE":
      return [...state, action.data];
    default:
      return state;
  }
};

// const userAdminReducer = (state = [], action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return
//   }
// }

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    routes: routeReducer,
  });

export const createRoute = (newObject) => {
  return async (dispatch) => {
    const newRoute = await routeService.create(newObject);
    dispatch({
      type: "ADD_ROUTE",
      data: newRoute,
    });
  };
};

export default createRootReducer;
