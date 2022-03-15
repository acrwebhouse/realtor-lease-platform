import * as ACTION_TYPES from '../actions/action_type'

export const initialState = {
    isBackToLogin : false
};

export const AuthReducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.BackToLogin:
            return {
                isBackToLogin: true
            };
        default:
            return state;
    }
}