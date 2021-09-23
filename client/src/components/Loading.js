import React from 'react';

const Loading = () => {
  return (
    <div className='container'>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
