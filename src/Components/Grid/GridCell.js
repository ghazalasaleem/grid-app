import React from 'react';
const GridCell = props =>{

    const {id, cell, value} = props;
    let cellDOM;
    if(cell && typeof cell.renderer === "function"){
        cellDOM= cell.renderer({key: id, value: value});
    }
    else{
        cellDOM=<label>{value}</label>;
    }
        return (<div className="table-cell" key={id} data-title={id}>{cellDOM}</div>);
};

export default GridCell;