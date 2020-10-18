import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from '../ducks';

export default function configureStore(initialState: any = {}) {
    const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk));

    return store;
}
