import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delItem, selectAll } from '../../Datastore/Actions/itemsActions';

const List = () => {

    const [selectedItems, setSelectedItems]  = useState([]);
    const [selectAllFlag, setSelectAllFlag] = useState(false);
    const items = useSelector(state => state.items);
    const dispatch = useDispatch();

    const changeHandler = (e, id) => {
        if(e && e.currentTarget){
            const selectFlag = e.currentTarget.checked;
            if(id || id == 0){
                if(selectFlag){
                    setSelectedItems([...selectedItems, id]);
                }
                else{
                    setSelectedItems(selectedItems.filter(item => item !== id));
                    if(selectAllFlag) setSelectAllFlag(false);
                }
                dispatch(selectAll({checked:selectFlag, id: id}));
            }
            else{
                dispatch(selectAll({checked:selectFlag}));
                let dataL = Array.from(items, data => data.key);
                setSelectedItems([...dataL]);
                setSelectAllFlag(selectFlag);
            }
        }
    }

    const deleteItems = () => {
        dispatch(delItem(selectedItems));
        if(selectAllFlag) setSelectAllFlag(false);
    }

    return (
        <div>
            <input type="checkbox" onChange={e => changeHandler(e)}  checked={selectAllFlag}></input>
            <span>Select All</span>
            <button onClick={deleteItems}>Delete</button>
            <ul>
            {items.map(task => 
                <li key={task.key}>
                    <input type="checkbox" id={task.key} onChange={e => changeHandler(e,task.key)} checked={task.selected}/>
                    <span>{task.data}</span>
                </li>
            )}
            </ul>
        </div>
    );
}

export default List;