

https://user-images.githubusercontent.com/66232436/137617996-6d5f822a-1246-4c55-b05c-535cb9bc1a69.mov



- - -
리덕스 연습

- - -
# Installation 

`npm i redux`


`npm i react-redux`

# 새로 알게 된 것 : 컴포넌트 최적화

## `React.memo`
컴퍼넌트가 React.memo()로 래핑될때 React는 컴퍼넌트를 렌더링하고 결과를 메모이징한다.
그 다음 렌더링의 결과가 이전과 같다면 React는 메모이징 이전 내용을 제시한다.
같은 props로 렌더링이 자주 일어나는 컴퍼넌트 에서는 React.memo를 사용하는 것이 더 좋은 성능을 나타낸다.(불필요한 리렌더링을 줄인다.)

다음을 보자. `TodoItem` 컴퍼넌트를 다음과 같이 정의한다.
```JSX
function TodoItem({ todo, onToggle }){
    return (
        <li 
        style = {{ textDecoration : todo.done ? 'line-through' : 'none'}}
        onClick = {()=> onToggle(todo.id)}
        >
            {todo.text}
        </li>
    );
}
```


https://user-images.githubusercontent.com/66232436/137625676-be2a9829-967c-4c17-a0a0-82c81d56f91f.mov


위 영상에서 보다시피 기존에 렌더링되어 있던 `TodoItem`컴퍼넌트들도 계속 렌더링된다.

이번엔 `TodoItem`을 `React.memo()`로 래핑하여 사용해보자.

```JSX
const TodoItem = React.memo(function TodoItem({todo,onToggle}){
    return (
        <li 
        style = {{ textDecoration : todo.done ? 'line-through' : 'none'}}
        onClick = {()=> onToggle(todo.id)}
        >
            {todo.text}
        </li>
    );
}
);
```

https://user-images.githubusercontent.com/66232436/137625736-3952d141-0574-4403-8d75-8a8c270a3b47.mov

기존에 렌더링된 `TodoItem`중 `props`가 변경되지 않은 것들은 리렌더링되지 않는다.

이런식으로 `React.momo()`를 사용하면 리렌더링 낭비를 줄이면서 성능을 높힐 수 있다.


## `useSelector`와 `equalityFn`

상태가 바뀌지 않았을 때 `useSelector` 를 통해 매번 렌더링하는 것은 낭비렌더링이다.

이를 최적화 하는 방법으로는 두가지 방법이 있다.

- 1. `useSelector` 를 여러번 사용한다.

```JSX
const { number, diff } = useSelector(state => ({
  number: state.counter.number,
  diff: state.counter.diff
}));
```
위의 상황에서는 매번 새로운 객체 `{ number, diff }` 를 만든다. 상태가 바뀌었는지 않았는지 확인을 할 수 없어 매번 렌더링이 이루어진다.

```JSX
const number = useSelector(state => state.counter.number);
const diff = useSelector(state => state.counter.diff);
```
이렇게 `state` 개수만큼 `useSelector`를 사용하면 해당 값이 바뀌었을 때에만 컴포넌트가 리렌더링 된다.

- 2. `react-redux`의 `shallowEqual` 함수를 `useSelector`의 두번째 인자로 전달한다.

```JSX
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
.
.
const { number, diff } = useSelector(
  state => ({
    number : state.counter.number,
    diff : state.counter.diff
    }), shallowEqual );
.
.
```
`useSelector`의 두번째 파라미터는 이전값과 다음값을 비교하여 `boolean`값을 리턴하는 `equalityFn`이다.
`true`가 나오면 리렌더링을 하지 않고, `false`가 나오면 리렌더링을 한다.
`shallowEqual`은 `react-redux`에 내장되어 있는 함수로서, 얕은비교를 한다.

즉, 이전값과 다음값을 얕은 비교하여 같다면 `true`를 리턴하여 리렌더링을 하지 않고, 다르다면 `false`를 리턴하여 리렌더링한다.






