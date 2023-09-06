import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

// const init = 'accounts/init';
const inc = 'accounts/increment';
const dec = 'accounts/decrement';
const incByAmt = 'accounts/incrementByAmount';
const getAccUserPending = 'account/getUser/pending';
const getAccUserFulfilled = 'account/getUser/fulfilled';
const getAccUserRejected = 'account/getUser/rejected';
const incBonus = 'bonus/increment';

const store = createStore(
    combineReducers({
        account:accountReducer,
        bonus:bonusReducer
    }), 
    applyMiddleware(logger.default, thunk.default));
const history = [];


function accountReducer(state={amount:1}, action){
    switch(action.type) {
        case getAccUserFulfilled:
            return {amount: action.payload};
        case getAccUserPending:
            return {amount: action.payload};
        case getAccUserRejected:
            return {...state, error: action.error};    
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
        case incBonus:
            return {points: state.points+1};
        case incByAmt:
            if(action.payload>=100)
               return {points: state.points+action.payload}; 
        default:
            return state;    
           
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


function getUserAccount(id){
    return async(dispatch, getState)=>{
        try{
            const {data} = await axios.get(`http://localhost:3000/account/${id}`)
            dispatch(getAccountUserFulfilled(data.amount));
        } catch(error){
            dispatch(getAccountUserRejected(error.message));
        }
    }
}
function getAccountUserFulfilled(value){
    return {type: getAccUserFulfilled, payload:value}
}
function getAccountUserPending(value){
    return {type: getAccUserPending, payload:value}
}
function getAccountUserRejected(error){
    return {type: getAccUserRejected, error: error}
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
function incrementBonus(value){
    return {type: incBonus, payload:value}
}

setTimeout(()=>{
    store.dispatch(getUserAccount(2));
    // store.dispatch(incrementByAmount(200));
    // store.dispatch(incrementBonus(20));

},2000);


