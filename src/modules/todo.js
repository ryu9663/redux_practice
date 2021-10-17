const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

let nextId = 1;

export const addTodo = text => ({
    type : ADD_TODO,
    todo : {
        id : ++nextId,
        text
    }
})

export const toggleTodo = id => ({
    type : TOGGLE_TODO,
    id
})

const initialState = [
  
  {
    id: nextId,
    text: '예시',
    done: false
  } 
  
]

export default function todos(state=initialState,action){
    switch (action.type){
        case ADD_TODO :
            return [...state,{...state[0],...action.todo}]
        case TOGGLE_TODO :
            return state.map(el=>{
                if(el.id===action.id){
                    return {...el,done:!el.done}
                }else{
                    return el
                }
            })
        default : return state   
    }
        
}