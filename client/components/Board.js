import React, {Component} from 'react'
import RobotContainer from '../containers/RobotContainer'
import classNames from 'classnames'

class Board extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hasMounted: false
    }
  }

  componentDidMount () {
    this.props.addTileInfo(this.refs)
    this.setState({hasMounted: true})
  }

  get currentLevelTheme () {
    const currentLevel = this.props.currentLevel
    let levelTheme = ''

    if (currentLevel < 6) {
      levelTheme = 'basement'
    } else if (currentLevel < 11) {
      levelTheme = 'engine'
    } else if (currentLevel < 16) {
      levelTheme = 'cargo'
    } else if (currentLevel < 21) {
      levelTheme = 'garden'
    } else {
      levelTheme = 'control'
    }
    return levelTheme
  }

  renderTile (tileType, colIndex, rowIndex) {
    const levelTheme = this.currentLevelTheme
    const oddEvenString = ((rowIndex + colIndex) % 2 === 1) ? 'odd' : 'even'

    let tileImage
    let blackhole = false
    switch (tileType) {
      case 3:
        tileImage = <img src='/resources/images/blackhole.svg' className='hole'></img>
        blackhole = true
        break
      case 2:
        tileImage = <img src='/resources/images/box-tile.svg' className='box-tile' />
        break
      case 1:
        tileImage = <img src='/resources/images/elevator-top.svg' className={this.props.levelWon ? classNames('elevator-animation') : classNames('elevator-no-animation')} />
        break
      default:
    }

    return (
      <div
        key={rowIndex + colIndex}
        ref={rowIndex.toString() + colIndex.toString()}
        className={classNames('tile', {
          clear: blackhole,
          [oddEvenString]: !blackhole,
          [levelTheme]: !blackhole
        })}
      >
        {tileImage}
      </div>
    )
  }

  renderRow (row, indexOfRow) {
    return row.map((tileType, indexOfCol) => this.renderTile(tileType, indexOfCol, indexOfRow))
  }

  render () {
    const levelTheme = this.currentLevelTheme

    return (
      <div id='board' className='board-background'>
        <div className={classNames('board-container', levelTheme)}>
          {this.props.board.map(this.renderRow)}
        }
        </div>
        {this.state.hasMounted
          ? <RobotContainer />
          : null}
      </div>
    )
  }
}

export default Board
