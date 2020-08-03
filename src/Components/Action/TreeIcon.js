import React from 'react';
import {IoMdArrowDropright, IoMdArrowDropdown} from 'react-icons/io';

const TreeIcon = props =>{

    const {dataList, onClick} = props;
    const data = dataList.data;

    return (<div data-toggle="tooltip" title="Children"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => { onClick({e, dataList})}}> 
        {data.isChildVisible?<IoMdArrowDropdown/>:<IoMdArrowDropright/>}
    </div>);
};

export default TreeIcon;