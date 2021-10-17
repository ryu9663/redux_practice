import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

export default function CounterContainer() {
    //useSelector는 리덕스 스토어의 상태를 조회하는 Hook이다.
    //state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일하다.
    const {number,diff} = useSelector(state => ({
        number : state.counter.number,
        diff : state.counter.diff
    }),
    //react-redux에 내장되어 있는 함수로서, 객체 안의 가장 겉에 있는 값들을 비교해준다.
    //true가 나오면 이전값과 다음값이 같다는 뜻인데, true가 나오면 리렌더링으르 하지 않는다.
    //useSelector의 두번째 파라미터에는 콜백이 들어가는데 콜백에서 true가 나오면 리렌더링을 하지 않는다.
    shallowEqual
    );

    // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
    const dispatch = useDispatch();
    //각 액션들을 dispatch하는 함수들
    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onSetDiff = (diff) => dispatch(setDiff(diff));

    return (
        <Counter number = {number} diff = {diff} onIncrease = {onIncrease} 
        onDecrease = {onDecrease} onSetDiff = {onSetDiff} />
    );
}