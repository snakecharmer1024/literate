import React, { Component } from 'react';

export default class Poem extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.image = props.image;
    this.author = props.author;
  }

  render() {
    return (
      <div>
        <h2>{this.title}</h2>
        <div>by {this.author}</div>
        <br/>
        <img alt="poem" src={this.image} width={400}></img>
      </div>
    )
  }
}
