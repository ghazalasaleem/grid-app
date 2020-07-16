import React, { useEffect, useState } from 'react';
import './Grid.css'
import GridRow from './GridRow';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';
import AppModal from './../AppModal';
import { render } from '@testing-library/react';

const Grid = props => {

    const {configData, dataList} = props;
    const [renderList, setRenderList] = useState([]);
    const [headerList, setHeaderList] = useState([]);
    const [content, setContent] = useState([]);
    const [sortCol, setSortCol] = useState("");
    const [sortOrderAsc, setSortOrderAsc] = useState(true);
    const [modalData, setModalData] = useState(null)
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

    useEffect(()=>{
        let headerL = [], renderL = [];
        configData.map((row)=>{
            headerL.push({
                name: row.name,
                key: row.key,
                sort: row.sort,
                show: true
            });
            renderL.push({
                key: row.key,
                cell: row.cell
            });
        });
        setHeaderList([...headerL]);
        setRenderList(renderL); 
        setContent([...dataList]);   
    },[configData, dataList]);

    const sortContentList = (list, key) =>{
        return key?(list.sort((a,b) => {
            let aVal = a[key].toLowerCase();
            let bVal = b[key].toLowerCase();
            if(aVal < bVal) return -1;
            else if(aVal > bVal) return 1;
            else return 0;

        })):list;
    };

    const handleSort = (event, key) =>{
        const sortKey = key? key.toLowerCase():'';
        let  sortOrder = sortOrderAsc;
        let tableContent =[...content];
        if(sortKey){
            if(sortKey !== sortCol) {
                setSortCol(sortKey);
                sortOrder = true;
                setSortOrderAsc(sortOrder);                
            } 
            else{
                sortOrder = !sortOrderAsc;
                setSortOrderAsc(sortOrder);
            } 
            tableContent = sortContentList(tableContent, sortKey);
            if(!sortOrder){
                tableContent.reverse();
            }
            setContent([...tableContent]);      
        }
    };

    return(
        <React.Fragment>
            <div className="large-table table-container">
                {headerList && headerList.length && (
                <React.Fragment>
                <div className="table-header table-row">
                    {headerList.map(header =>{
                        const rowClass = "table-cell"+ (header.sort && header.sort.active?" cursor-pointer":" events-none");
                        const cellDom = header.show?
                        (<div className={rowClass} key={header.key} data-title={header.name.toLowerCase()} onClick={e=>handleSort(e, header.key)}>{header.name}
                        {(header.sort && header.sort.active)?<div className="pad-l5 vertical-middle">{(sortCol === header.key && !sortOrderAsc)?<FiArrowUp/>:<FiArrowDown/>}</div>:''}</div>
                    ):"";
                        return cellDom;
                        })}
                </div>
                </React.Fragment>
                )}
                {content && content.length && (
                    <div className="table-body">
                        {content.map((data) =>{
                            return (<GridRow data={data} key={data.id} renderList={renderList}></GridRow>);
                        })}
                    </div>            
                )}
            </div>
        </React.Fragment>
    );
}

export default Grid;