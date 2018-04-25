import React from 'react';

export default function NumberButton({val, numberClick, btnText}) {
  return (
    <div className='btn number'>
      <button onClick={(e) => numberClick(e.currentTarget.value)} value={val}>{btnText}</button>
    </div>
  )
}