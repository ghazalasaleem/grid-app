import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';

const Delete = props =>{

    const {data, onClick} = props;
    
    return (<div data-toggle="tooltip" title="Delete"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => onClick({e, data})}> 
        <RiDeleteBin6Line/>
    </div>);
};

export default Delete;