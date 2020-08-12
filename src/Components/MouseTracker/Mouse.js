import React, { useState } from 'react';
const Mouse = props => {
    
    const [cord, setCord] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (event) => {
        setCord({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>

        {/*
        Instead of providing a static representation of what <Mouse> renders,
        use the `render` prop to dynamically determine what to render.
        */}
        {props.render(cord)}
    </div>
    );
}

export default Mouse;
  
  