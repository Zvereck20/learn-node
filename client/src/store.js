import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';
import {answersReducer, questionsReducer} from './reducers';

const reducers = combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));