import React, { Component } from 'react';
import { Option } from './Option';
import { Unit } from './Unit';

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

  checkValue = value => {
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
      <div className="flex flex-col justify-center bg-grey-light w-screen h-screen">
        <div className="units flex justify-center">
          <Unit value={minutes} handleOnChange={this.changeMinutes} isDisabled={isCounting} title="minutes"/>
          <Unit value={seconds} handleOnChange={this.changeSeconds} isDisabled={isCounting} title="seconds" />
        </div>

        <div className="flex justify-center items-center mt-3">
          <div onClick={isCounting ? this.handlePause : this.handleStart} className="w-10 h-10 bg-green text-white rounded-full m-1">{isCounting ? <span></span> : <span></span>}</div>
          <div onClick={this.handleReset} className="w-6 h-6 bg-red rounded-full m-1"></div>
        </div>

        <div className="flex justify-center mt-3">
          <span className="border-t border-grey pt-3 uppercase text-xs text-grey-darkest">when time is expired</span>
        </div>

        <div className="flex justify-center mt-3">
          <Option onClick={this.toggleContinueCounting} active={continueCounting} title="continue counting" />
          <Option onClick={this.toggleBlink} active={blink} title="blink" />
        </div>
      </div>
    );
  }
}

