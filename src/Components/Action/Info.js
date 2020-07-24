import React from 'react';
import {RiInformationLine} from 'react-icons/ri';

const Info = props =>{

    const {data, onClick} = props;
    
    return (<div  data-toggle="tooltip" title="Info"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => onClick({e, data})}>
        <RiInformationLine/>
    </div>);
};

export default Info;