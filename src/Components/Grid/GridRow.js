import React, { useState, useEffect } from 'react';
import GridCell from './GridCell';

 const GridRow = props =>{
     const {data, renderList} = props;
     const [rowData, setRowData] = useState([]);
     const [rowRender, setRowRender] = useState([]);

     useEffect(()=>{
        setRowData({...data});
        setRowRender([...renderList]);
     },[]);

     return (
        <div className="table-row" key={rowData.id} data-id={rowData.id}>
            {rowRender && rowRender.length && 
                rowRender.map(renderer =>{
                    return <GridCell key={renderer.key} id={renderer.key} cell={renderer} value={rowData[renderer.key]}></GridCell>;
                })
            }
        </div>
     );
 }
 export default GridRow;