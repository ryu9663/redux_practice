//'redux'에 내장되어 있는 combineReducers 함수는 리듀서를 합치는 역할을 한다.
import {  combineReducers } from 'redux';
import counter from './counter';
import todos from './todo';

//reducer가 두개이기 때문에 하나로 합친다.

const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;