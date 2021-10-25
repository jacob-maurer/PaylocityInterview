import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, Employer!</h1>
            <p>Welcome to your Employee Benefit Cost Previewer</p>
            <p>Use the navigation to add employees and preview their benefit costs</p>
      </div>
    );
  }
}
