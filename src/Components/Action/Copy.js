import React from 'react';
import {RiFileCopyLine} from 'react-icons/ri';

const Copy = props =>{

    const {id, onClick} = props;

    return (<div  data-toggle="tooltip" title="Copy"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={id} onClick={e => onClick(e, id)}>
        <RiFileCopyLine/>
    </div>);
};

export default Copy;