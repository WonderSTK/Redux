import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
const store = createStore(reducer, applyMiddleware(logger.default));
const history = [];
function reducer(state={amount:1}, action){
    if(action.type=== 'increment'){
        return {amount: state.amount+1};
    }
    if(action.type=== 'decrement'){
        return {amount: state.amount-1};
    }
    if(action.type=== 'incrementByNum'){
        return {amount: state.amount+action.payload};
    }
    return state;
}

// store.subscribe(()=>{
//     history.push(store.getState());
//     console.log(history);
// })
function constant(){
    console.log('file changed')
}
function increment(){
    return {type:'increment'}
}
function decrement(){
    return {type:'decrement'}
}
function incrementByNum(value){
    return {type:'incrementByNum', payload:value}
}

setInterval(()=>{
    store.dispatch(incrementByNum(5));

},2000);


