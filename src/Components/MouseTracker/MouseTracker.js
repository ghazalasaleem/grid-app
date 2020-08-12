import React from 'react';
import Cat from './Cat';
import Mouse from './Mouse';

const MouseTracker = () => {
    // Defined as an instance method, `this.renderTheCat` always
    // refers to *same* function when we use it in render
    const renderTheCat = (mouse) =>{
      return <Cat mouse={mouse} />;
    }

    return (
    <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={renderTheCat} />
    </div>
    );
  }

  export default MouseTracker;