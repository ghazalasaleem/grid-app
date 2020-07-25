import React, { useContext } from 'react';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';
import HeaderContext from './Context/HeaderContext';
import {SortColCntxt, SortOrderAscCntxt} from './Context/GridContext';

const GridHeader = props =>{

    const { handleSort} = props;
    const headerList = useContext(HeaderContext);
    const sortCol = useContext(SortColCntxt);
    const sortOrderAsc = useContext(SortOrderAscCntxt);
    
    return (
        headerList.map(header =>{
            const classes = "table-cell" + (header.sort && header.sort.active?" cursor-pointer":" events-none");
            return header.show?
                <div className={classes} key={header.key} data-title={header.key} onClick={e=>handleSort(e, header.key)}>
                    {header.name}
                    {(header.sort && header.sort.active)?
                        <div className="pad-l5 vertical-middle">
                            {(sortCol === header.key && !sortOrderAsc)?<FiArrowUp/>:<FiArrowDown/>}
                        </div>:''
                    }
                </div>:'';
        })
    );
};

export default GridHeader;