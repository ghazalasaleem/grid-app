import React, { useState, useEffect } from 'react';
import GridCell from './GridCell';

 const GridRow = props =>{

    const {data, renderList, rowSelection, handleRowSelection} = props;

    return (
        <div className={data.selected?"table-row selected":"table-row"} key={data.id} data-id={data.id}>
            {rowSelection && 
            (<div data-id={data.id} className="table-cell chkCol">
                <input type="checkbox" checked={data.selected} onChange={e=>handleRowSelection(e,data.id)}/>
            </div> )}
                      
            {renderList && renderList.length && 
                renderList.map(renderer =>{
                    return <GridCell key={data.id+renderer.key} cellData={renderer} data={data}></GridCell>;
                })
            }
        </div>
    );
 }
 export default GridRow;