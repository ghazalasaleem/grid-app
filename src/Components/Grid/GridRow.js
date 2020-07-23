import React, { useState, useEffect } from 'react';
import GridCell from './GridCell';

 const GridRow = props =>{
     const {data, renderList, rowSelection, handleRowSelection} = props;
     const [rowData, setRowData] = useState([]);
     const [rowRender, setRowRender] = useState([]);

    useEffect(()=>{
        setRowData({...data});
        setRowRender([...renderList]);//remove
     },[data, renderList]);

     return (
        <div className={rowData.selected?"table-row selected":"table-row"} key={rowData.id} data-id={rowData.id}>
            {rowSelection && 
            (<div data-id={rowData.id} className="table-cell chkCol">
                <input type="checkbox" checked={rowData.selected} onChange={e=>handleRowSelection(e,rowData.id)}/>
            </div> )}
                      
            {rowRender && rowRender.length && 
                rowRender.map(renderer =>{
                    return <GridCell key={renderer.key} cellData={renderer} data={rowData}></GridCell>;
                })
            }
        </div>
     );
 }
 export default GridRow;