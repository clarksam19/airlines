import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import routeService from "../services/routeService";
import userAdminService from "../services/userAdminService";

const loggedInUser = window.localStorage.getItem("loggedInUser");
const defaultState = loggedInUser ? JSON.parse(loggedInUser) : {};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return {};
    case "SET_USER":
      return action.data;
    case "ADD_ROUTE":
      return {
        ...state,
        routes: state.routes.concat(action.data),
      };
    case "REMOVE_ROUTE":
      return {
        ...state,
        routes: state.routes.filter((route) => route.id !== action.data),
      };
    default:
      return state;
  }
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await userAdminService.login(credentials);
    const userWithRoutes = await userAdminService.load(user.username);
    window.localStorage.setItem("loggedInUser", JSON.stringify(userWithRoutes));
    dispatch({
      type: "LOGIN",
      data: userWithRoutes,
    });
  };
};

export const logout = () => {
  userAdminService.logout();
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const setUser = (loadedUser) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      data: loadedUser,
    });
  };
};

export const addRoute = (selectedRoute) => {
  return async (dispatch) => {
    const addedRoute = await routeService.create(selectedRoute);
    dispatch({
      type: "ADD_ROUTE",
      data: addedRoute,
    });
  };
};

export const removeRoute = (selectedId) => {
  return async (dispatch) => {
    await routeService.remove(selectedId);
    dispatch({
      type: "REMOVE_ROUTE",
      data: selectedId,
    });
  };
};

export default createRootReducer;
