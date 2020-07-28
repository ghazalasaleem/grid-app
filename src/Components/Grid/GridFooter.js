import React, { useContext } from 'react';
import Pagination from 'react-js-pagination';
import GridContext from './Context/GridContext';

const GridFooter = props =>{

    const gridCntxt = useContext(GridContext);
    const {activePage, rowsPerPage, pageRange, totalRows, onPageChange}= gridCntxt;

    return (
    <div className="table-footer table-row">
        <div className="table-cell">
            <Pagination
            activePage={activePage}
            itemsCountPerPage={rowsPerPage}
            totalItemsCount={totalRows}
            pageRangeDisplayed={pageRange}
            onChange={(e)=>{onPageChange(e)}}
            itemClass="page-item"
            linkClass="page-link">
            </Pagination>
        </div>
    </div>);
}

export default GridFooter;