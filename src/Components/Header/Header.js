import React from 'react';
import './Header.scss';

const Header = props =>{

    const {heading="Custom Grid"} = props;
    return (
        <div className="header">
            <div className="pad-5">{heading}</div>
            {props.child}
        </div>
    );
}

export default Header;