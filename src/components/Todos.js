import React, { useState } from 'react'
///컴퍼넌트가 React.memo()로 래핑될때 React는 컴퍼넌트를 렌더링하고 결과를 메모이징한다.
//그다음 렌더링의 결과가 이전과 같다면 React는 메모이징된 이전 내용을 제시한다.
//같은 props로 렌더링이 자주 일어나는 컴퍼넌트에서는 React.memo를 사용하는 것이 더 성능이 좋다.
const TodoItem = React.memo(function TodoItem({todo,onToggle}){
    return (
        <li 
        style = {{ textDecoration : todo.done ? 'line-through' : 'none'}}
        onClick = {()=> onToggle(todo.id)}
        >
            {todo.text}
        </li>
    );
});

const TodoList = React.memo(function TodoList({todos,onToggle}) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key = {todo.id} todo = {todo} onToggle = {onToggle} />
            ))}
        </ul>    
    )
})

function Todos ({todos,onCreate,onToggle}) {
    const [text,setText] = useState('');
    const onChange = e => setText(e.target.value);
    const onSubmit = e => {
        e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
        onCreate(text);
        setText(''); // 인풋 초기화
    };
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                value={text}
                placeholder="할 일을 입력하세요.."
                onChange={onChange}
                />
                <button type="submit">등록</button>
            </form>
            <TodoList todos={todos} onToggle={onToggle} />
        </div>
    )
}

export default Todos;