import React from 'react';
import {RiInformationLine} from 'react-icons/ri';

const Info = props =>{

    const {id, onClick} = props;
    return (<div  data-toggle="tooltip" title="Info"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={id} onClick={e => onClick(e, id)}>
        <RiInformationLine/>
    </div>);
};

export default Info;