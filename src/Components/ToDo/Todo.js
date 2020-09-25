import React, { useState, createRef } from 'react';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { addItem } from '../../Datastore/Actions/itemsActions';
import List from './List';

const ToDo = () =>{

    const [item, setItem] = useState("");
    
    const dispatch = useDispatch();
    const inputBoxRef = createRef();

    const changeHandler = e => {
        setItem(e.target.value);
    }
    const addItemHandler = () => {
        dispatch(addItem(item));
        setItem("");
        inputBoxRef.current.focus();
    };

    const enterHandler = e =>{
        if(e && e.keyCode === 13){
            addItemHandler();
        }
    }

    return (
        <div className="todoContainer">
            <div className="card">
            <div className="infoMsg">Note: Using Redux just for learning purpose, otherwise it is not needed here.</div>
                <h3>To Do List</h3>
                <div className="addSection">
                    <input ref={inputBoxRef} onChange={changeHandler} onKeyUp={enterHandler} value={item}></input>
                    <button onClick={addItemHandler}>ADD</button>
                </div>
                <div className="listSection">
                    <h4 className="listHeader">Tasks</h4>
                    <List></List>
                </div>
            </div>
        </div>
    );
}

export default ToDo;