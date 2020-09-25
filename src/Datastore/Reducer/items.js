const itemReducer = (state=[], action) => {
    switch (action.type){
        case 'ADD':
            return [...state, {
                data:action.data,
                key:state.length,
                selected: false
            }];
        case 'DEL':
            state = state.filter(item => action.data.indexOf(item.key) == -1)
            return state;

        case 'SELECT_ALL':
            let {checked, id} = action.data;

            if(id || id ==0){
                state.map(item => {if(item.key === id) item.selected = checked});
            }
            else{
                state.map(item => item.selected = checked);
            }
            
            return state;

        default : return state;
    }
}

export default itemReducer;