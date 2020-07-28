import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';

const Delete = props =>{

    const {dataList, onClick} = props;
    const data = dataList.data;
    return (<div data-toggle="tooltip" title="Delete"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => onClick({e, dataList})}> 
        <RiDeleteBin6Line/>
    </div>);
};

export default Delete;