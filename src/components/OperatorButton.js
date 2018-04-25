import React from 'react';

export default function OperatorButton({val, operatorClick, btnText, id}) {
  return (
    <div id={id ? id : ''} className='btn operator'>
      <button onClick={(e) => operatorClick(e.currentTarget.value)} value={val}>{btnText}</button>
    </div>
  )
}