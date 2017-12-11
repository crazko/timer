import React, { Component } from 'react';
import { Option } from './Option';
import { Unit } from './Unit';

export class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCounting: false,
      minutes: props.minutes,
      seconds: props.seconds,
      shouldBlink: true,
      shouldContinue: true
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Start counting
    if (!prevState.isCounting && this.state.isCounting) {
      const goal = new Date();
      goal.setMinutes(goal.getMinutes() + prevState.minutes);
      goal.setSeconds(goal.getSeconds() + prevState.seconds);

      this.setState({
        goal
      });

      this.timer = setInterval(this.counting.bind(this), 250);
    }

    // Stop counting when limit is reached
    if (this.state.isCounting && !this.state.shouldContinue && this.state.goal <= new Date()) {
      this.setState({
        isCounting: false
      });
    }

    // Clear goal when counting is over
    if (prevState.isCounting && !this.state.isCounting) {
      this.setState({
        goal: undefined
      });

      clearInterval(this.timer);
    }

    // Reset time when changing expired values
    if (
      !this.state.isCounting &&
      (prevState.minutes !== this.state.minutes || prevState.seconds !== this.state.seconds)
    ) {
      this.setState({
        minutes: Math.abs(this.state.minutes),
        seconds: Math.abs(this.state.seconds)
      });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  handleStart = () => {
    this.setState({
      isCounting: true
    });
  };

  handlePause = () => {
    this.setState({
      isCounting: false
    });
  };

  handleReset = () => {
    this.setState({
      isCounting: false,
      goal: undefined,
      minutes: this.props.minutes,
      seconds: this.props.seconds
    });
  };

  changeMinutes = event => {
    this.setState({
      minutes: this.checkValue(event.target.value)
    });
    event.preventDefault();
  };

  changeSeconds = event => {
    this.setState({
      seconds: this.checkValue(event.target.value)
    });
    event.preventDefault();
  };

  toggleContinueCounting = () => {
    this.setState(prevState => ({
      shouldContinue: !prevState.shouldContinue
    }));
  };

  toggleBlink = () => {
    this.setState(prevState => ({
      shouldBlink: !prevState.shouldBlink
    }));
  };

  checkValue = value => {
    value = Math.max(value, 0);
    value = Math.min(value, 59);

    return value;
  };

  counting = () => {
    this.setState(prevState => {
      const diffInSeconds = (prevState.goal.getTime() - Date.now()) / 1000;
      const minutes = Math.trunc(diffInSeconds / 60);
      const seconds = Math.trunc(diffInSeconds % 60);

      return {
        minutes,
        seconds
      };
    });
  };

  render() {
    const { shouldBlink, shouldContinue, isCounting, minutes, seconds } = this.state;

    const isExpired = minutes < 0 || seconds < 0;
    const blinkClass = isCounting && shouldBlink && minutes === 0 && seconds === 0 ? ' blink' : '';

    return (
      <div className={'timer flex flex-col justify-center w-screen h-screen bg-grey-light' + blinkClass}>
        <div className="units flex justify-center">
          <Unit
            value={minutes}
            handleOnChange={this.changeMinutes}
            isDisabled={isCounting}
            title="minutes"
            isExpired={isExpired}
          />
          <Unit
            value={seconds}
            handleOnChange={this.changeSeconds}
            isDisabled={isCounting}
            title="seconds"
            isExpired={isExpired}
          />
        </div>

        <div className="flex justify-center items-center mt-3">
          <div
            onClick={isCounting ? this.handlePause : this.handleStart}
            className="w-16 h-16 bg-green hover:bg-green-dark text-white rounded-full m-1 cursor-pointer"
          />
          <div
            onClick={this.handleReset}
            className="w-10 h-10 bg-red hover:bg-red-dark rounded-full m-1 cursor-pointer"
          />
        </div>

        <div className={isCounting ? 'settings settings--inactive' : 'settings'}>
          <div className="flex justify-center mt-3">
            <span className="border-t border-grey pt-3 uppercase text-xs text-grey-darkest">when time is expired</span>
          </div>

          <div className="flex justify-center mt-3">
            <Option onClick={this.toggleContinueCounting} active={shouldContinue} title="continue counting" />
            <Option onClick={this.toggleBlink} active={shouldBlink} title="blink" />
          </div>
        </div>
      </div>
    );
  }
}
