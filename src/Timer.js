import React, { Component } from 'react';

class Input extends React.Component {
  componentWillReceiveProps(nextProps) {

  }

  render() {
    let value = this.props.value;
    if (value < 10 && value > -1) {
      value = `0${value}`;
    }

    return <input
      disabled={this.props.isDisabled}
      max="59"
      min="0"
      onChange={this.props.handleOnChange}
      type="number"
      value={value}
    />;
  }
}

const Checkbox = ({ handleOnChange, checked, isDisabled,}) => <input 
    disabled={isDisabled}
    checked={checked}
    onChange={handleOnChange}
    type="checkbox" 
  />

export class Timer extends Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);

    this.state = {
      blink: true,
      continueCounting: true,
      goal: undefined,
      isCounting: false,
      minutes: props.minutes,
      seconds: props.seconds,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isCounting && this.state.isCounting) {
      const goal = new Date();
      goal.setMinutes(goal.getMinutes() + prevState.minutes);
      goal.setSeconds(goal.getSeconds() + prevState.seconds);
      
      this.setState({
        goal
      })
      
      this.timer = setInterval(this.counting.bind(this), 250);
    }

    if (prevState.isCounting && !this.state.isCounting) {
      this.setState({
        goal: undefined
      })

      clearInterval(this.timer);
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleStart() {
    this.setState({
      isCounting: true,
    })
  }

  handlePause() {
    this.setState({
      isCounting: false,
    })
  }

  changeMinutes(event) {
    this.setState({
      minutes: this.checkValue(event.target.value)
    })
    event.preventDefault();
  }
  
  changeSeconds(event) {
    this.setState({
      seconds: this.checkValue(event.target.value)
    })
    event.preventDefault();
  }

  checkValue(value) {
    if (value < 0) {
      value = 0;
    }

    if (value > 59) {
      value = 59;
    }

    return Number(value);
  }

  counting(){
    this.setState((prevState, props) => {
      const diffInSeconds = (prevState.goal.getTime() - Date.now()) / 1000;

      const minutes = Math.trunc(diffInSeconds / 60);
      const seconds = Math.trunc(diffInSeconds % 60);

      return { 
        minutes,
        seconds
      }
    });
  }

  render() {
    const { blink,
      continueCounting,
      goal,
      isCounting,
      minutes,
      seconds } = this.state;

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
        <Checkbox isDisabled={isCounting} checked={continueCounting} handleOnChange={() => {}} /> Countinue<br />
        <Checkbox isDisabled={isCounting} checked={blink} handleOnChange={() => {}} /> Blink<br />

        {goal && <p>{goal.toLocaleString()}</p>}
      </div>
    );
  }
}

