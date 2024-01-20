import { VEHICLE_DETAIL } from "../action/type";

const initalState = {
    chassis_no: '',
    km_reading: ''
}

const VehicleDetailReducer = (state = initalState, action) => {
    switch (action.type) {
        case VEHICLE_DETAIL:
            return {
                ...state,
                chassis_no: action?.payload?.chassis_no,
                km_reading: action?.payload?.km_reading
            }
        default: return state
    }
}

export default VehicleDetailReducer;