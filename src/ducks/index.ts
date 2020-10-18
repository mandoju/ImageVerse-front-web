import { AnyAction, combineReducers } from 'redux';
import image from './image';

const appReducer = combineReducers({
    image,
});

export type ReduxState = ReturnType<typeof appReducer>;

const rootReducer = (state: any, action: AnyAction): ReduxState => {
    // if (action.type === LOGOUT_USER) {
    // 	state = undefined;
    // }
    return appReducer(state, action);
};

export default rootReducer;
