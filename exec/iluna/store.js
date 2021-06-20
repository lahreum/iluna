import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

const appInitialState = {
  immortal: false,
};

const SET_IMMORTAL = 'SET_IMMORTAL';
export const setImmortal = createAction(SET_IMMORTAL);

const App = handleActions(
  {
    [SET_IMMORTAL]: (state, { payload }) => ({
      ...state,
      immortal: payload,
    }),
  },
  appInitialState,
);

const rootReducer = combineReducers({
  App,
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();
