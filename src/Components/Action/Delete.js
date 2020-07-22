import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';

const Delete = props =>{

    const {id, onClick} = props;
    return (<div data-toggle="tooltip" title="Delete"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={id} onClick={e => onClick(e,id)}> 
        <RiDeleteBin6Line/>
    </div>);
};

export default Delete;