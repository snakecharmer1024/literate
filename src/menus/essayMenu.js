import React, {Component} from 'react';
import Hacking from '../essays/Hacking.js'
import SayNo from '../essays/SayNo.js'
import {Route} from 'react-router-dom'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

export default class EssayMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  components = [[], <Hacking />, <SayNo />];

  handleChange = (event, index, value) => {
    var state = {
      value: value,
      children: this.components[index]
    };
    this.setState(state);
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
            Essays <br/>
        </p>
        <DropdownMenu triggerType="text" trigger={"What would you like to read?"}>
          <MenuItem text="Hacking Education" location="/essays/hacking-education" />
          <MenuItem text="Saying No" location="/essays/saying-no" />
        </DropdownMenu>
        <Route component={Hacking} path={'/essays/hacking-education'} />
        <Route component={SayNo} path={'/essays/saying-no'} />
        <br/>
        <div className="essays">
        { this.state.children }
        </div>
      </div>

    )
  }
}
