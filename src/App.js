import React, { Component } from 'react'
import './App.css'

/*
  Credits where it's due, some code was inspired by VTEX's timer app,
  at github.com/vtex/show-time
*/

const twoDigits = (time) => ('0' + time).slice(-2)

class App extends Component {
  constructor() {
    super()
    this.state = {
      minutes: 5,
      seconds: 0,
      minutesAtStart: 5,
      running: null,
      timeEnded: false,
      loading: true,
      showingHelp: false,
    }
  }

  handleKeyPress = (event) => {
    const { running } = this.state
    switch (event.key) {
      case ' ':
      case 'Enter':
        running ? this.pauseTimer() : this.startTimer()
        break
      case 'ArrowUp':
        this.incrementMinute()
        break
      case 'ArrowDown':
        this.decrementMinute()
        break
      case 'r':
      case 'R':
        this.resetState()
        break
      case 'H':
      case 'h':
      case '?':
        this.toggleHelp()
        break
      default:
        break
    }
  }

  toggleHelp() {
    this.setState({ showingHelp: !this.state.showingHelp })
  }

  incrementMinute() {
    const { minutes, running, minutesAtStart, timeEnded } = this.state
    if (timeEnded) return
    if (minutes < 99) {
      const newMinutesAtStart = running ? minutesAtStart : minutes + 1
      this.setState({
        minutes: minutes + 1,
        minutesAtStart: newMinutesAtStart,
      })
    }
  }

  decrementMinute() {
    const { running, minutes, minutesAtStart, seconds, timeEnded } = this.state
    if (timeEnded) return
    if (minutes > 1 || (minutes > 0 && seconds > 0)) {
      const newMinutesAtStart = running ? minutesAtStart : minutes - 1
      this.setState({
        minutes: minutes - 1,
        minutesAtStart: newMinutesAtStart,
      })
    }
  }

  startTimer() {
    const { running } = this.state
    if (running) return
    const runningInterval = setInterval(() => {
      this.setState(previousState => {
        const { timeEnded, minutes, seconds } = previousState
        if (timeEnded) {
          return {
            ...previousState,
            ...this.incrementTime(minutes, seconds),
          }
        }
        if (seconds === 0 && minutes === 0) {
          return {
            ...previousState,
            timeEnded: true,
            seconds: 1,
          }
        }
        return {
          ...previousState,
          ...this.decrementTime(minutes, seconds),
        }
      })
    }, 1000)
    this.setState({
      running: runningInterval,
    })
  }

  pauseTimer() {
    const { running } = this.state
    clearInterval(running)
    this.setState({ running: null })
  }

  incrementTime(minutes, seconds) {
    const newSeconds = seconds === 59 ? 0 : seconds + 1
    const newMinutes = seconds === 59 ? minutes + 1 : minutes
    return {
      minutes: newMinutes,
      seconds: newSeconds,
    }
  }

  decrementTime(minutes, seconds) {
    const newSeconds = seconds === 0 ? 59 : seconds - 1
    const newMinutes = seconds === 0 ? minutes - 1 : minutes
    return {
      minutes: newMinutes,
      seconds: newSeconds,
    }
  }

  resetState() {
    this.pauseTimer()
    this.setState({
      minutes: this.state.minutesAtStart,
      seconds: 0,
      running: false,
      timeEnded: false,
    })
  }

  componentDidMount() {
    this.setState({ loading: false }, () => {
      document && document.addEventListener('keyup', this.handleKeyPress)
    })
  }

  showHelp() {
    return (
      <div className="help white">
        <p>
          HelpText
        </p>
      </div>
    )
  }

  render() {
    const { showingHelp, timeEnded, minutes, seconds } = this.state
    return (
      <div className="timer">
        <p className="timer--counter white">
          { timeEnded && '-' }{ twoDigits(minutes) }:{ twoDigits(seconds) }
        </p>
        { showingHelp && this.showHelp() }
      </div>
    )
  }
}

export default App
