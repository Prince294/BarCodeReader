import { LOGIN, LOGOUT } from "../action/type";

const initalState = {
    isLoggedIn: false,
    token: '',
}

const LoginReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action?.payload,
                isLoggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                token: '',
                isLoggedIn: false
            }
        default: return state
    }
}

export default LoginReducer;