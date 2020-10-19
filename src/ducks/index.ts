import { AnyAction, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import image from './image';

const appReducer = combineReducers({
    image,
});

export type ReduxState = ReturnType<typeof appReducer>;
export type AppDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const rootReducer = (state: any, action: AnyAction): ReduxState => {
    // if (action.type === LOGOUT_USER) {
    // 	state = undefined;
    // }
    return appReducer(state, action);
};

export default rootReducer;
