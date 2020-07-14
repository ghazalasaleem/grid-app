import React, { useState, useEffect } from 'react';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const GridToolbar = props =>{

    const { showSort, showHide, headers, handleHideColmns, selectedList, showAddnew, handleAdd} = props;
    // const [showColsList, setShowColsList] = useState(null);

    // useEffect(() =>{
    //     let list =[];
    //     headers.map(head =>{
    //         list.push({label: head.name, value: head.name.toLowerCase()});
    //     })
    //     setShowColsList([...list]);
    // },[]);
    
    return (
        <div className="table-header grid-border pad-5">
        {showSort && (
            <div className="vertical-middle mar-r10">
            <label>Sort</label>
            <select id="sortCols" value="name">
                {headers.map(header =>{
                    return (<option  key={header.key} value={header.name.toLowerCase()}>{header.name}</option>);
                })}
            </select>
            </div>
        )}
        {showHide && (
            <div className="vertical-middle mar-r10">
            <label>Show</label>
            <select value={selectedList} onChange={e=> handleHideColmns(e)} id="showCols" multiple className="selectpicker"> 
            {headers.map(header =>{
                    return (<option  key={header.key} value={header.name.toLowerCase()}>{header.name}</option>);
                })}
            </select>
            </div>
        )}
        {showAddnew && (
            <div className="inline vertical-bottom">
            <button type="button" className="btn-sm btn-secondary" onClick={e=>handleAdd(e)}>Add +</button>
            </div>
        )}
        {/* {showHide && (
            <div className="vertical-middle mar-r10">
            <label>Show</label>
            <ReactMultiSelectCheckboxes options={showColsList}/>
            </div>
        )} */}
        </div>
    );
}
export default GridToolbar;