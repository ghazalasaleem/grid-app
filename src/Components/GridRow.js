import React, { useState, useEffect } from 'react';
import GridCell from './GridCell';

const GridRow = props =>{

    const {data, index, handleRowDelete, handleRowCopy, handleRowInfo} = props;
    const [propDef, setPropDef] = useState([]);

    useEffect(()=>{
        setPropDef(data);        
    },[data]);

    const handleChange = event => {
        if(event && event.target){
            let propName = event.target.name,
            selectedValue = event.target.value;
            let defList = propDef?[...propDef]:[];
            defList.map(def =>{
                if(def.name === propName) def.value = selectedValue;
            });
            setPropDef(defList);
        }
    }
    
    return (
        <div className="table-row" key={index} data-id={index}>
            {propDef && propDef.map(cell =>{
                const cellDOM = cell.visible !== false?
                (<div className="table-cell" key={cell.key} data-title={cell.name}>
                    <GridCell
                        index={index}
                        cellData={cell}
                        changeHandler= {handleChange}
                        handleRowDelete={handleRowDelete}
                        handleRowCopy={handleRowCopy}
                        handleRowInfo={handleRowInfo}>
                    </GridCell>
                    </div>)
                :"";
                return cellDOM;
            }
            )}
        </div>
    );
}
export default GridRow;