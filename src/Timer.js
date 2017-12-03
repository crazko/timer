import React, { Component } from 'react';

class Input extends React.Component {
  componentWillReceiveProps(nextProps) {

  }

  render() {
    const {handleOnChange, isDisabled, value} = this.props;

    return <input
      disabled={isDisabled}
      max="59"
      min="0"
      onChange={handleOnChange}
      type="number"
      value={value}
    />;
  }
}

export class Timer extends Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);

    this.state = {
      isCounting: false,
      minutes: props.minutes,
      seconds: props.seconds,
      goal: undefined
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
      
      this.timer = setInterval(this.counting.bind(this), 200);
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
  }

  changeSeconds(event) {
    this.setState({
      seconds: this.checkValue(event.target.value)
    })
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
    this.setState(function(prevState, props) {
      const diffInSeconds = (prevState.goal.getTime() - Date.now()) / 1000;

      const minutes = Math.floor(diffInSeconds / 60);
      const seconds = Math.floor(diffInSeconds % 60);

      return { 
        minutes,
        seconds
      }
    });
  }

  render() {
    const { seconds, minutes, isCounting, goal } = this.state;
    return (
      <div className="timer">
        Minutes: <Input value={minutes} handleOnChange={this.changeMinutes} isDisabled={isCounting} />
        Seconds: <Input value={seconds} handleOnChange={this.changeSeconds} isDisabled={isCounting} />

        {isCounting
          ? <button onClick={this.handlePause}>pause</button>
          : <button onClick={this.handleStart}>start</button>
        }

        <br/>

        When times is expired:<br />
        <input type="checkbox" /> Countinue<br />
        <input type="checkbox" /> Blink<br />

        {goal && <p>{goal.toLocaleString()}</p>}
      </div>
    );
  }
}

