import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todo';

function TodosContainer() {
    const todos = useSelector(state=>state.todos)
    const dispatch = useDispatch();


    const onCreate = text => dispatch(addTodo(text));
    // 최적화를 위해 useCallback 사용
    const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch])

    return <Todos todos = {todos} onCreate = {onCreate} onToggle={onToggle} />

}
export default TodosContainer;