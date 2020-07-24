import React from 'react';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';

const GridHeader = props =>{

    const {rowClass, header, handleSort, sortCol, sortOrderAsc} = props;
    
    const classes = "table-cell" + (rowClass?rowClass:"");
    
    return (
        <div className={classes} key={header.key} data-title={header.key} onClick={e=>handleSort(e, header.key)}>
            {header.name}
            {(header.sort && header.sort.active)?
                <div className="pad-l5 vertical-middle">
                    {(sortCol === header.key && !sortOrderAsc)?<FiArrowUp/>:<FiArrowDown/>}
                </div>:''
            }
        </div>
    );
};

export default GridHeader;