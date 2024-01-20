import { LOGIN } from "../action/type";

const initalState = {
    token: '98cc5b2643c857859c6bc65ae804e73911992368c90adc9a2d9e645e7dc18b72',
}

const LoginReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action?.payload,
            }
        default: return state
    }
}

export default LoginReducer;