import { LOGIN, LOGOUT, REGISTER } from "../actions/login";

const pocetnoStanje = {
    token: null,
};

const loginReducer = (state = pocetnoStanje, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload }
        case REGISTER:
            return { ...state, token: action.payload }
        case LOGOUT:
            return { ...state, token: null }
        default:
            return state;
    }
};
export default loginReducer;