export const addItem = data => {
    return {
        type: 'ADD',
        data: data
    };
}

export const delItem = data => {
    return {
        type: 'DEL',
        data: data
    }
}

export const selectAll = data =>{
    return {
        type: 'SELECT_ALL',
        data: data
    }
}