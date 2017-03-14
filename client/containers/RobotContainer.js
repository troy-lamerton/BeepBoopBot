import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { ReactMotionLoop } from 'react-motion-loop'
import WinContainer from '../containers/WinContainer'
import cx from 'classnames'

class Robot extends Component {
  componentDidMount () {
    window.onresize = () => { this.forceUpdate(() => {}) }
  }

  componentWillUnmount () {
    window.onresize = null
  }

  calcCenter () {
    const y = this.props.robot.positionY.toString()
    const x = this.props.robot.positionX.toString()
    const bounds = this.props.tileInfo[y + x].getBoundingClientRect()
    const centerX = (bounds.right + bounds.left) / 2
    const centerY = (bounds.top + bounds.bottom) / 2
    return [centerX, centerY]
  }

  render () {
    let centerPoints = this.calcCenter()
    let size = 80
    let dampingStrength = 1
    let stiffnessStrength = 100
    let precisionStrength = 1
    let scale = 100
    let opacity = 1.0
    let commandExecuted = this.props.commandQueue[this.props.executeCommandIndex - 1]
    if (commandExecuted === 'JUMP_UP') {
      if (!this.props.robot.isAlive) {
        precisionStrength = 0.1
        stiffnessStrength = 300
        scale = 0
        opacity = 0.1
      }
      dampingStrength = 2
      size = size + 20
    } else if (commandExecuted === 'TURN_RIGHT' || commandExecuted === 'TURN_LEFT') {
      size = size + 5
    } else if (this.props.levelWon === true) {
      opacity = 0
    } else if (!this.props.robot.isAlive) {
      precisionStrength = 0.1
      stiffnessStrength = 300
      scale = 0
      opacity = 0.1
    }
    return (
      <div>
        <Motion defaultStyle={{
          scale: scale,
          x: centerPoints[0],
          y: centerPoints[1],
          rot: 0
        }} style={{
          scale: spring(scale, {precision: precisionStrength}),
          x: spring(centerPoints[0]),
          y: spring(centerPoints[1]),
          rot: spring(this.props.robot.direction)
        }}>
          {value => <div className={cx({ 'b3-container-animation': this.props.levelWon })} style={{
            height: value.scale,
            width: value.scale,
            position: 'absolute',
            top: value.y - 70,
            left: value.x - 55,
            transform: `rotate(${value.rot}deg)`
          }}>
            <ReactMotionLoop styleFrom={{
              opacity: spring(opacity),
              width: spring(size, {
                stiffness: stiffnessStrength,
                damping: dampingStrength,
                precision: precisionStrength
              })
            }} styleTo={{
              opacity: spring(opacity),
              width: spring(size + 2, {
                stiffness: stiffnessStrength,
                damping: dampingStrength,
                precision: precisionStrength
              })
            }}>
              {style => <img src='/resources/images/b3-robot.svg' className={cx('b3-robot')} style={style} />}
            </ReactMotionLoop>
            <ReactMotionLoop styleFrom={{
              opacity: spring(opacity),
              width: spring(size, {
                stiffness: stiffnessStrength,
                damping: dampingStrength,
                precision: precisionStrength
              })
            }} styleTo={{
              opacity: spring(opacity),
              width: spring(size - 2, {
                stiffness: stiffnessStrength,
                damping: dampingStrength,
                precision: precisionStrength
              })
            }}>
              {style => (<img
                src='/resources/images/shadow.svg'
                className={this.props.levelWon ? cx('shadow-animation') : cx('shadow')}
                style={style}
              />)}
            </ReactMotionLoop>
          </div>}
        </Motion>
        <WinContainer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    commandQueue: state.commandQueue,
    executeCommandIndex: state.executeCommandIndex,
    robot: state.robot,
    levelWon: state.levelWon,
    tileInfo: state.tileInfo
  }
}

export default connect(mapStateToProps)(Robot)
