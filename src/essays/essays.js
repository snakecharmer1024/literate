import React, { Component } from 'react';

export default class Essay extends Component {
  constructor(props) {
    super(props);
    this.image = props.image;
    this.author = props.author;
  }

  render() {
    return (
      <div>
        <h2>{this.title}</h2>
        <div>by {this.author}</div>
      </div>
    )
  }
}
