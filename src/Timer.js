import React, { Component } from 'react';

const Unit = ({ handleOnChange, value, isDisabled, title }) => {
  const leadingZero = (value > -10 && value < 10) ? '0' : '';
  const negative = Math.sign(value) === -1 ? '-' : '';
  
  return <div className="flex flex-col-reverse">
    <strong className="text-center">{title}</strong>
    <input
      className="bg-white rounded-lg m-2 text-5xl text-right"
      disabled={isDisabled}
      max="59"
      min="0"
      onChange={handleOnChange}
      type="number"
      value={negative + leadingZero + Math.abs(value)}
    />
  </div>;
}

const Option = ({ active, title, onClick }) => <div
    className="cursor-pointer"
    onClick={onClick}
  >
    {active && <span>✓</span>}
    {title}
  </div>;

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

  handleReset = () => {
    this.setState({
      isCounting: false,
      goal: undefined,
      minutes: this.props.minutes,
      seconds: this.props.seconds,
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
      <div className="bg-grey-light w-screen h-screen">
        <div className="flex justify-center text-center">
          <Unit value={minutes} handleOnChange={this.changeMinutes} isDisabled={isCounting} title="minutes"/>
          <Unit value={seconds} handleOnChange={this.changeSeconds} isDisabled={isCounting} title="seconds" />
        </div>

        <div>
          {isCounting
            ? <button onClick={this.handlePause}>pause</button>
            : <button onClick={this.handleStart}>start</button>
          }
          <button onClick={this.handleReset}>reset</button>
        </div>

        <div>
          <h3>When time is expired:</h3>
          <Option onClick={this.toggleContinueCounting} active={continueCounting} title="Continue" />
          <Option onClick={this.toggleBlink} active={blink} title="Blink" />
        </div>
      </div>
    );
  }
}

