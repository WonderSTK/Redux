import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const init = 'init';
const inc = 'increment';
const dec = 'decrement';
const incByAmt = 'incrementByAmount';

const store = createStore(reducer, applyMiddleware(logger.default, thunk.default));
const history = [];


function accountReducer(state={amount:1}, action){
    switch(action.type) {
        case init:
            return {amount: action.payload};
        case inc:
            return {amount: state.amount+1};
        case dec:
            return {amount: state.amount-1};  
        case incByAmt:
            return {amount: state.amount+action.payload};   
        default:
            return state;       
    }
    
}

function bonusReducer(state={points:0}, action){
    switch(action.type) {
        case inc:
            return {points: state.points+1};
           
    }

}
// store.subscribe(()=>{
//     history.push(store.getState());
//     console.log(history);
// })
// Async API call

// async function getUser(){
//     const {data} = await axios.get('http://localhost:3000/accounts/1')
//     console.log(data)
// }
// getUser() 


function getUser(id){
    return async(dispatch, getState)=>{
        const {data} = await axios.get(`http://localhost:3000/accounts/${id}`)
        dispatch({type: init, payload:data.amount})
    }
}
function initUser(value){
    return {type: init, payload:value}
}
function increment(){
    return {type: inc}
}
function decrement(){
    return {type: dec}
}
function incrementByAmount(value){
    return {type: incByAmt, payload:value}
}

setTimeout(()=>{
    store.dispatch(getUser(2));

},2000);


