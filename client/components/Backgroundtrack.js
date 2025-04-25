import React, { Component } from 'react'
import Sound from 'react-sound'
import cookie from 'react-cookie'
import songs from '../sound'

export default class Backgroundtrack extends Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: 0,
      currentSong: songs[0],
      position: 0,
      volume: 25,
      playStatus: Sound.status.STOPPED
    }
  }

  getStatusText () {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return 'playing'
      case Sound.status.PAUSED:
        return 'paused'
      case Sound.status.STOPPED:
        return 'stopped'
      default:
        return '(unknown)'
    }
  }

  componentDidMount () {
    const cookies = cookie.load('sound')
    if (cookies === undefined) {
      cookie.save('sound', 'ON')
      this.setState({ playStatus: Sound.status.PLAYING })
    } else if (cookies === 'ON') {
      this.setState({ playStatus: Sound.status.PLAYING })
    } else {
      this.setState({ playStatus: Sound.status.STOPPED })
    }
  }

  componentDidUpdate () {
    let newTheme = 0
    if (this.props.currentLevel >= 1 && this.props.currentLevel < 6) {
      newTheme = 0
    } else if (this.props.currentLevel >= 6 && this.props.currentLevel < 11) {
      newTheme = 1
    } else if (this.props.currentLevel >= 11 && this.props.currentLevel < 16) {
      newTheme = 2
    } else if (this.props.currentLevel >= 16 && this.props.currentLevel < 21) {
      newTheme = 3
    } else {
      newTheme = 4
    }

    if (this.state.theme !== newTheme) {
      this.setState({ theme: newTheme, currentSong: songs[newTheme] })
    }

    const cookies = cookie.load('sound')
    const isAlreadySet = this.state.playStatus === Sound.status.PLAYING
    if (cookies === 'ON') {
      if (isAlreadySet) return
      this.setState({ playStatus: Sound.status.PLAYING })
    } else {
      if (!isAlreadySet) return
      this.setState({ playStatus: Sound.status.STOPPED })
    }
  }

  render () {
    return (
      <div>
        <Sound
          url={this.state.currentSong.url}
          playStatus={this.state.playStatus}
          playFromPosition={this.state.position}
          volume={this.state.volume}
          onFinishedPlaying={() => this.setState({ playStatus: Sound.status.PLAYING })}
        />
      </div>
    )
  }
}
