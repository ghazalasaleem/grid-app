import React, { useState, useEffect, useContext } from 'react';
import GridCell from './GridCell';
import TabDataContext from './Context/TableDataContext';
import TabConfContext from './Context/TableConfContext';

 const GridRow = props =>{

    const {rowId, rowSelection, handleRowSelection} = props;
    const dataL = useContext(TabDataContext);
    const data =dataL.find(row => row.id === rowId);
    const renderList = useContext(TabConfContext);

    return (
        <div className={data.selected?"table-row selected":"table-row"} key={data.id} data-id={data.id}>
            {rowSelection && 
                (<div data-id={data.id} className="table-cell chkCol">
                    <input type="checkbox" checked={data.selected} onChange={e=>handleRowSelection(e,data.id)}/>
                </div> )
            }                      
            {renderList && renderList.length && 
                renderList.map(renderer =>{
                    return <GridCell key={data.id+renderer.key} cellData={renderer} data={data}></GridCell>;
                })
            }
        </div>
    );
 }
 export default GridRow;