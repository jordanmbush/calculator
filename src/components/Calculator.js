import React, { Component } from 'react';
import './../App.css';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';

class Calculator extends Component {
  
  render() {
    const {display, add, subtract, divide, multiply, numberClick, percentage, clear, off, calculate, setAction, addToMemory, subtractFromMemory, recallMemory, squareRootSymbol, memory} = this.props;
    const ADD = '+';
    const SUBTRACT = '-';
    const MULTIPLY = 'X';
    const DIVIDE = '÷';
    const PERCENTAGE = '%';
    const SQRT = '√';

    return (
      <div className='calculator'>
        <div className='numbers-container'>
          {/* ======================================================================== */}
          <div className='numbers-row row-1'>
            <NumberButton numberClick={numberClick} val={0} btnText={0} />
            <NumberButton numberClick={numberClick} val={'.'} btnText={'.'} />
            <div className='btn number'>
              <button onClick={() => calculate()} value='='>=</button>
            </div>
          </div>
          {/* ======================================================================== */}
          <div className='numbers-row row-2'>
            <NumberButton numberClick={numberClick} val={1} btnText={1} />
            <NumberButton numberClick={numberClick} val={2} btnText={2} />
            <NumberButton numberClick={numberClick} val={3} btnText={3} />
          </div>
          {/* ======================================================================== */}
          <div className='numbers-row row-3'>
            <NumberButton numberClick={numberClick} val={4} btnText={4} />
            <NumberButton numberClick={numberClick} val={5} btnText={5} />
            <NumberButton numberClick={numberClick} val={6} btnText={6} />
          </div>
          {/* ======================================================================== */}
          <div className='numbers-row row-4'>
            <NumberButton numberClick={numberClick} val={7} btnText={7} />
            <NumberButton numberClick={numberClick} val={8} btnText={8} />
            <NumberButton numberClick={numberClick} val={9} btnText={9} />
          </div>
          {/* ======================================================================== */}
          <div className='numbers-row row-5'>
            <OperatorButton id={memory ? 'memory' : ''} operatorClick={recallMemory} val={'MRC'} btnText='MRC' />
            <OperatorButton operatorClick={subtractFromMemory} val={'M-'} btnText='M-' />
            <OperatorButton operatorClick={addToMemory} val={'M+'} btnText='M+' />
          </div>
          {/* ======================================================================== */}
          <div className='numbers-row row-6'>
            <div id='on-btn' className='btn number'>
              <button onClick={clear} value='C/CE'>C/CE</button>
            </div>
            <div id='off-btn' className='btn number'>
              <button onClick={off} value='OFF'>OFF</button>
            </div>
            <OperatorButton id='sqrt-btn' operatorClick={squareRootSymbol} val={SQRT} btnText={SQRT} />
          </div>
        </div>
          {/* ======================================================================== */}
        <div className='operators-container'>
          <div className='operators-column column-1'>
            <OperatorButton operatorClick={percentage} val={PERCENTAGE} btnText={PERCENTAGE} />
            <OperatorButton operatorClick={setAction} val={DIVIDE} btnText={DIVIDE} />
            <OperatorButton operatorClick={setAction} val={MULTIPLY} btnText={MULTIPLY} />
            <OperatorButton operatorClick={setAction} val={SUBTRACT} btnText={SUBTRACT} />
            <OperatorButton id='plus-btn' operatorClick={setAction} val={ADD} btnText={ADD} />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
