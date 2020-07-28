import React from 'react';
import {RiFileCopyLine} from 'react-icons/ri';

const Copy = props =>{

    const {dataList, onClick} = props;
    const data = dataList.data;

    return (<div  data-toggle="tooltip" title="Copy"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => onClick({e,dataList})}>
        <RiFileCopyLine/>
    </div>);
};

export default Copy;