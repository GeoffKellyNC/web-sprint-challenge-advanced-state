import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

function Wheel(props) {

  const { wheel, moveClockwise, moveCounterClockwise } = props


  const handleClick = (e) => {
    e.preventDefault()
    const id = e.target.id
    switch(id) {
      case 'clockwiseBtn':
        moveClockwise()
        break;
      case 'counterClockwiseBtn':
        moveCounterClockwise()
        break;
      default:
        break;
  }
}

console.log('Wheel: ', wheel)


  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={wheel === 0 ? 'cog active': 'cog'} style={{ "--i": 0 }}>{wheel === 0 ? 'B' : null}</div>
        <div className={wheel === 1 ? 'cog active': 'cog'} style={{ "--i": 1 }}>{wheel === 1 ? 'B' : null}</div>
        <div className={wheel === 2 ? 'cog active': 'cog'} style={{ "--i": 2 }}>{wheel === 2 ? 'B' : null}</div>
        <div className={wheel === 3 ? 'cog active': 'cog'} style={{ "--i": 3 }}>{wheel === 3 ? 'B' : null}</div>
        <div className={wheel === 4 ? 'cog active': 'cog'} style={{ "--i": 4 }}>{wheel === 4 ? 'B' : null}</div>
        <div className={wheel === 5 ? 'cog active': 'cog'} style={{ "--i": 5 }}>{wheel === 5 ? 'B' : null}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleClick} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClick}>Clockwise</button>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, actions)(Wheel)
