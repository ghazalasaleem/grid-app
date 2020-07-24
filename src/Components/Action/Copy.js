import React from 'react';
import {RiFileCopyLine} from 'react-icons/ri';

const Copy = props =>{

    const {data, onClick} = props;

    return (<div  data-toggle="tooltip" title="Copy"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => onClick({e,data})}>
        <RiFileCopyLine/>
    </div>);
};

export default Copy;