import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todo';

function TodosContainer() {
    const todos = useSelector(state=>state.todos)
    const dispatch = useDispatch();


    const onCreate = text => dispatch(addTodo(text));
    // 최적화를 위해 useCallback 사용
    //두번째 인자는 배열인데, useEffect처럼 배열안의 요소가 수정될때마다 첫번째 인자 콜백이 실행된다.
    //배열값이 바뀌지 않으면 리렌더링하지 않고 이전값을 그대로 렌더링한다.
    //렌더링 낭비를 줄인다.
    const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch])
    // const onToggle = id => dispatch(toggleTodo(id));

    return <Todos todos = {todos} onCreate = {onCreate} onToggle={onToggle} />

}
export default TodosContainer;