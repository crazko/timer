import React, { Component } from 'react';

const Input = ({ handleOnChange, value, isDisabled }) => {
  const leadingZero = (value > -10 && value < 10) ? '0' : '';
  const negative = Math.sign(value) === -1 ? '-' : '';
  
  return <input
    disabled={isDisabled}
    max="59"
    min="0"
    onChange={handleOnChange}
    type="number"
    value={negative + leadingZero + Math.abs(value)}
  />;
}

const Checkbox = ({ handleOnChange, checked, isDisabled }) => <input 
    disabled={isDisabled}
    checked={checked}
    onChange={handleOnChange}
    type="checkbox" 
  />;
  
export class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blink: true,
      continueCounting: true,
      isCounting: false,
      minutes: props.minutes,
      seconds: props.seconds,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Start counting
    if (!prevState.isCounting && this.state.isCounting) {
      const goal = new Date();
      goal.setMinutes(goal.getMinutes() + prevState.minutes);
      goal.setSeconds(goal.getSeconds() + prevState.seconds);
      
      this.setState({
        goal
      })
      
      this.timer = setInterval(this.counting.bind(this), 250);
    }

    // Stop counting
    if (prevState.isCounting && !this.state.isCounting) {
      this.setState({
        goal: undefined
      })

      clearInterval(this.timer);
    }
    
    // Stop counting when limit is reached
    if (prevState.isCounting && !this.state.continueCounting && this.state.minutes <= 0 && this.state.seconds <= 0) {
      this.setState({
        goal: undefined,
        isCounting: false
      });
      
      clearInterval(this.timer);
    }
  }
  
  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  handleStart = () => {
    this.setState({
      isCounting: true,
    })
  }

  handlePause = () => {
    this.setState({
      isCounting: false,
    })
  }

  changeMinutes = event => {
    this.setState({
      minutes: this.checkValue(event.target.value)
    });
    event.preventDefault();
  }
  
  changeSeconds = event => {
    this.setState({
      seconds: this.checkValue(event.target.value)
    });
    event.preventDefault();
  }
  
  toggleContinueCounting = () => {
    this.setState(prevState => ({
      continueCounting: !prevState.continueCounting
    }));
  }
  
  toggleBlink = () => {
    this.setState(prevState => ({
      blink: !prevState.blink
    }));
  }

  checkValue = (value) => {
    value = Math.max(value, 0);
    value = Math.min(value, 59);

    return value;
  }

  counting = () => {
    this.setState(prevState => {
      const diffInSeconds = (prevState.goal.getTime() - Date.now()) / 1000;
      const minutes = Math.trunc(diffInSeconds / 60);
      const seconds = Math.trunc(diffInSeconds % 60);

      return { 
        minutes,
        seconds,
      }
    });
  }

  render() {
    const {
      blink,
      continueCounting,
      isCounting,
      minutes,
      seconds
    } = this.state;

    return (
      <div className="timer">
        Minutes: <Input value={minutes} handleOnChange={this.changeMinutes} isDisabled={isCounting} />
        Seconds: <Input value={seconds} handleOnChange={this.changeSeconds} isDisabled={isCounting} />

        {isCounting
          ? <button onClick={this.handlePause}>pause</button>
          : <button onClick={this.handleStart}>start</button>
        }

        <br/>

        When time is expired:<br />
        <Checkbox isDisabled={isCounting} checked={continueCounting} handleOnChange={this.toggleContinueCounting} /> Countinue<br />
        <Checkbox isDisabled={isCounting} checked={blink} handleOnChange={this.toggleBlink} /> Blink<br />
      </div>
    );
  }
}

