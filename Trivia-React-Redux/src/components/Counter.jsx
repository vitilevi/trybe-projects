import React, { Component } from 'react';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
    this.counter = this.counter.bind(this);
    this.counterFunc = this.counterFunc.bind(this);
  }

  counterFunc() {
    const { count } = this.state;
    if (count > 0) {
      this.setState({
        count: count - 1,
      });
    } else if (count === 0) {
      this.setState({
        count: 0,
      });
    }
  }

  counter() {
    const interval = 1000;
    setInterval(this.counterFunc, interval);
  }

  render() {
    const { count } = this.state;
    return (
      <span>
        { count }
      </span>
    );
  }
}
