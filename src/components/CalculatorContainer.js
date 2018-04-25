import React, { Component } from 'react';
import './../App.css';
import currency from 'currency.js';
import Calculator from './Calculator';
import History from './History';

const Decimal = (value) => currency(value);
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = 'X';
const DIVIDE = '÷';
const PERCENTAGE = '%';
const SQRT = '√';
const HISTORY = 'HISTORY';
const CALCULATOR = 'CALCULATOR';


class CalculatorContainer extends Component {
  constructor() {
    super();
    this.state = {
      powerOn: true,
      fresh: true,
      display: 0,
      lastNum: null,
      memory: 0,
      action: null,
      calcHistory: [],
      currentCalculation: [''],
      view: CALCULATOR,
      entryClear: true,
    }
  }
  // ====================================================================
  numberClick = (val) => {
    if(!this.state.powerOn) return;
    const currentCalculation = this.state.currentCalculation.slice();
    let display = this.state.display;
    const fresh = this.state.fresh;
    // display = fresh ? val : display.concat(val.toString());
    if(fresh) {
      display = val;
      currentCalculation.push(display);
    } else {
      display = display.concat(val.toString());
      currentCalculation[currentCalculation.length -1] = display;
    }
    // ====================================================================
    this.setState({
      display,
      fresh: false,
      entryClear: false,
      currentCalculation: currentCalculation,
    });
  }
  // ====================================================================
  clear = () => {
    let {lastNum, display, action, entryClear, currentCalculation, memory} = this.state;
    lastNum = entryClear ? null : lastNum;
    action = entryClear ? null : action;
    currentCalculation = entryClear ? [''] : currentCalculation;
    memory = entryClear ? 0 : memory;
    if(!entryClear) currentCalculation.pop();
    
    this.setState({
      powerOn: true,
      fresh: true,
      display: '0',
      action,
      entryClear: true,
      currentCalculation,
      lastNum,
    })
  }
  // ====================================================================
  clearHistory = () => {
    this.setState({
      calcHistory: [],
    })
  }
  // ====================================================================
  off = () => {
    this.setState({
      powerOn: false,
      fresh: true,
      display: '',
      action: null,
      calcHistory: [],
      currentCalculation: [''],
    })
  }
  // ====================================================================
  addToMemory = () => {
    this.setState({
      memory: Decimal(this.state.memory).add(this.state.display).value,
      fresh: true,
    })
  }
  // ====================================================================
  subtractFromMemory = () => {
    this.setState({
      memory: Decimal(this.state.memory).subtract(this.state.display).value,
      fresh: true,
    })
  }
  // ====================================================================
  recallMemory = () => {
    this.setState({
      display: this.state.memory,
      fresh: false,
    })
  }
  // ====================================================================
  setAction = (action) => {
    if(!this.state.powerOn) return;
    if(this.state.action) {
      this.calculate(action)
    } else {
      const currentCalculation = this.state.currentCalculation.slice();
      currentCalculation.push(action)
      this.setState({
        fresh: true,
        lastNum: this.state.display,
        action,
        currentCalculation
      });
    }
  }
  // ====================================================================
  calculate = (action = null) => {
    switch(this.state.action) {
      case ADD:
        this.add(action);
        break;
      case SUBTRACT:
        this.subtract(action);
        break;
      case MULTIPLY:
        this.multiply(action);
        break;
      case DIVIDE:
        this.divide(action);
        break;
      case PERCENTAGE:
        this.percentage(action);
        break;
      case SQRT:
        this.getSquareRoot(action);
        break;
      default:
        break;
    }
  }
  // ====================================================================
  // ====================================================================
  add = (action = null) => {
    const calcHistory = this.state.calcHistory.slice();
    const answer = Decimal(this.state.lastNum).add(this.state.display).value;
    calcHistory.push(this.state.lastNum + ' + ' + this.state.display + ' = ' + answer);

    let currentCalculation = this.state.currentCalculation.slice();
    if(action) {
      currentCalculation.push(action);
    } else {
      currentCalculation.push('=');
      currentCalculation.push(answer);
    }
    this.setState({
      display: answer,
      lastNum: Decimal(this.state.lastNum).add(this.state.display).value,
      action,
      fresh: true,
      calcHistory,
      currentCalculation
    })
  }
  // ====================================================================
  // ====================================================================
  subtract = (action = null) => {
    console.log('action: ', action);
    const calcHistory = this.state.calcHistory.slice();
    const answer = Decimal(this.state.lastNum).subtract(this.state.display).value;
    calcHistory.push(this.state.lastNum + ' - ' + this.state.display + ' = ' + answer);

    let currentCalculation = this.state.currentCalculation.slice();
    if(action) {
      currentCalculation.push(action);
    } else {
      currentCalculation.push('=');
      currentCalculation.push(answer);
      calcHistory.push(currentCalculation[currentCalculation.length -1]);
    }
    this.setState({
      display: answer,
      lastNum: Decimal(this.state.lastNum).subtract(this.state.display).value,
      action,
      fresh: true,
      calcHistory,
      currentCalculation,
    })
  }
  // ====================================================================
  // ====================================================================
  multiply = (action = null) => {
    const calcHistory = this.state.calcHistory.slice();
    const answer = Decimal(this.state.lastNum).multiply(this.state.display).value;
    calcHistory.push(this.state.lastNum + ' * ' + this.state.display + ' = ' + answer);

    let currentCalculation = this.state.currentCalculation.slice();
    if(action) {
      currentCalculation.push(action);
    } else {
      currentCalculation.push('=');
      currentCalculation.push(answer);
      calcHistory.push(currentCalculation[currentCalculation.length -1]);
    }
    
    this.setState({
      display: answer,
      lastNum: Decimal(this.state.lastNum).multiply(this.state.display).value,
      action: action,
      fresh: true,
      calcHistory,
      currentCalculation,
    })
  }
  // ====================================================================
  // ====================================================================
  divide = (action = null) => {
    const calcHistory = this.state.calcHistory.slice();
    const answer = Decimal(this.state.lastNum).divide(this.state.display).value;
    calcHistory.push(this.state.lastNum + ' / ' + this.state.display + ' = ' + answer);

    let currentCalculation = this.state.currentCalculation.slice();
    if(action) {
      currentCalculation.push(action);
    } else {
      currentCalculation.push('=');
      currentCalculation.push(answer);
      calcHistory.push(currentCalculation[currentCalculation.length -1]);
    }
    
    this.setState({
      display: answer,
      lastNum: Decimal(this.state.lastNum).divide(this.state.display).value,
      action: action,
      fresh: true,
      calcHistory,
      currentCalculation,
    })
  }
  // ====================================================================
  // ====================================================================
  percentage = (action = null) => {
    const calcHistory = this.state.calcHistory.slice();
    const answer = Decimal(this.state.display).divide(100).value;
    calcHistory.push(this.state.display + ' as percentage = ' + answer);

    let currentCalculation = this.state.currentCalculation.slice();
    if(action) {
      currentCalculation.push(action);
    } else {
      currentCalculation.push('=');
      currentCalculation.push(answer);
      calcHistory.push(currentCalculation[currentCalculation.length -1]);
    }
    
    this.setState({
      display: answer,
      fresh: true,
      calcHistory,
      currentCalculation
    })
  }
  // ====================================================================
  // ====================================================================
  getSquareRoot = (action = null) => {
    const calcHistory = this.state.calcHistory.slice();
    const trueDisplayVal = this.state.display.substring(1); //REMOVES SQRT SYMBOL
    const answer = Math.sqrt(Decimal(trueDisplayVal).value);
    calcHistory.push(this.state.display + ' = ' + answer);

    let currentCalculation = this.state.currentCalculation.slice();
    if(action) {
      currentCalculation.push(action);
    } else {
      currentCalculation.push('=');
      currentCalculation.push(answer);
      calcHistory.push(currentCalculation[currentCalculation.length -1]);
    }
    
    this.setState({
      display: answer,
      lastNum: answer,
      action: action,
      fresh: true,
      calcHistory,
      currentCalculation
    })
  }
  // ====================================================================
  // ====================================================================
  squareRootSymbol = () => {
    this.setState({
      display: '√',
      action: SQRT,
      fresh: false,
    })
  }
  // ======================================================================================================
  // ======================================================================================================
  // ======================================================================================================
  // ======================================================================================================
  render() {
    const lastNum = this.state.lastNum ? this.state.lastNum + ' ' : '';
    const operand = this.state.action ? ' ' + this.state.operand + ' ' : '';
    const currentCalculation = this.state.currentCalculation.toString().replace(/,/g,' ');
    
    return (
      <div className="calculator-container">
        <div>
          <div className='solar-container'>
            <div className='logo'>Calculator</div>
            <div className="solar-cell">
              <div className="line"></div><div className="line"></div><div className="line"></div>
            </div>
          </div>
          <div className='container-between-solar-cell-and-display'>
            <div className='current-calculation-container'>
              <input disabled value={currentCalculation} />
            </div>
            <button onClick={() => {
              let newView = this.state.view === CALCULATOR ? HISTORY : CALCULATOR;
              this.setState({view: newView});
            }}>{this.state.view === CALCULATOR ? 'History' : 'Calculator' }</button>
          </div>
          <div className='display'>
            <input disabled value={this.state.display} />
          </div>
          {this.state.view === CALCULATOR ? 
            <Calculator
              display={this.state.display}
              add={this.add}
              subtract={this.subtract}
              divide={this.divide}
              multiply={this.multiply}
              numberClick={this.numberClick}
              percentage={this.percentage}
              squareRootSymbol={this.squareRootSymbol}
              getSquareRoot={this.getSquareRoot}
              clear={this.clear}
              off={this.off}
              calculate={this.calculate}
              setAction={this.setAction}
              addToMemory={this.addToMemory}
              subtractFromMemory={this.subtractFromMemory}
              recallMemory={this.recallMemory}
              memory={this.state.memory}
            />
          : <History history={this.state.calcHistory} clearHistory={this.clearHistory} />}
        </div>
      </div>
    );
  }
}

export default CalculatorContainer;
