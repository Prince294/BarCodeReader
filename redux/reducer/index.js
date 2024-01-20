import { combineReducers } from 'redux'
import VehicleDetailReducer from './vehicleDetailReducer';
import LoginReducer from './loginReducer';

const rootReducer = combineReducers({
    VehicleDetailReducer,
    LoginReducer
});

export default rootReducer;