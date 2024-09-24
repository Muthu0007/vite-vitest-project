const iniatialState : any= {
  name:'',
  num:0
}
const reducer = (state = iniatialState,action: { type: any; }) => {
    switch (action.type) {
        case 'ADD_INPUT':
            return{
                ...state,
                name:'muthu',
                num:27
            }
            break;
    
        default:
            break;
    }
}

const rootreducer = combineReducer({
    counter:reducer
});
export default rootreducer;

function combineReducer(_arg0: { counter: (state: any, action: { type: any; }) => any; }) {
    throw new Error("Function not implemented.");
}
