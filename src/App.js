import React, { Component } from 'react'
import { Play, Pause } from './icons'
import './App.css'

/*
  Credits where it's due, some code was inspired by VTEX's timer app,
  at github.com/vtex/show-time
*/

const twoDigits = (time) => ('0' + time).slice(-2)

// const isMobile = (() => { // IIFE
//   const userAgent = navigator.userAgent || navigator.vendor || window.opera
//   // eslint-disable-next-line
//   return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4))
// })()

class App extends Component {
  constructor() {
    super()
    this.state = {
      minutes: 5,
      seconds: 0,
      minutesAtStart: 5,
      running: null,
      showingHelp: null,
      timeEnded: false,
      loading: true,
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
    this.setState(previousState => {
      const { showingHelp } = previousState
      let helpTimeout
      if (showingHelp) {
        clearTimeout(showingHelp)
        helpTimeout = null
      } 
      else {
        helpTimeout = setTimeout(() => {
          this.setState({ showingHelp: null })
        }, 10000)
      }
      return {
        ...previousState,
        showingHelp: helpTimeout,
      }
    })
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

  startTimer = () => {
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

  pauseTimer = () => {
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
      document && 
      document.addEventListener('keyup', this.handleKeyPress) &&
      document.addEventListener('touchstart', this.handleTouch)
    })
  }

  showHelp() {
    return (
      <div className="help white">
        <p>
          space / ↲: start or pause the timer
        </p>
        <p>
          r: resets timer
        </p>
        <p>
          ↑: increments a minute in the timer
        </p>
        <p>
          ↓: decrements a minute in the timer
        </p>
      </div>
    )
  }

  render() {
    const { running, showingHelp, timeEnded, minutes, seconds } = this.state
    return (
      <div className="timer">
        <p className="timer--counter white">
          { timeEnded && '-' }{ twoDigits(minutes) }:{ twoDigits(seconds) }
        </p>
        <div className="icons">
          <Play highlighted={!running} onPress={this.startTimer} />
          <Pause highlighted={!!running} onPress={this.pauseTimer} />
        </div>
        { showingHelp && this.showHelp() }
      </div>
    )
  }
}

export default App
