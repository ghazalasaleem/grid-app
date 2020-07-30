import React, { useState, useEffect } from 'react';
import {IoMdArrowDropright, IoMdArrowDropdown} from 'react-icons/io';

const TreeIcon = props =>{

    const [iconClose, setIconClose] = useState(true);
    const {dataList, isChildVisible, onClick} = props;
    const data = dataList.data;

    
    // setIconClose(!isChildVisible);
    return (<div data-toggle="tooltip" title="Children"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => { onClick({e, dataList})}}> 
        {data.isChildVisible?<IoMdArrowDropdown/>:<IoMdArrowDropright/>}
    </div>);
};

export default TreeIcon;