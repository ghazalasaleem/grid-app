import React, {useContext } from 'react';
import GridCell from './GridCell';
import GridContext from './Context/GridContext';

 const GridRow = props =>{

    const {data, renderList} = props;
    const gridCntxt = useContext(GridContext);
    const {rowSelection, handleRowSelection} = gridCntxt;

    return (
        !data.hidden && (
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
        )
    );
 }
 export default GridRow;