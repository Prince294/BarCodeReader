import {
  VEHICLE_DETAIL,
  LOGIN,
  LOGOUT
} from './type';

export const vehilceDetail = (data) => {
  return {
    type: VEHICLE_DETAIL,
    payload: data,
  };
};

export const userLogin = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const userLogout = () => {
  return {
    type: LOGOUT,
  };
};