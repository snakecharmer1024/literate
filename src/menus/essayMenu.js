import React, {Component} from 'react';
import Hacking from '../essays/Hacking.js'
import SayNo from '../essays/SayNo.js'
import {Route} from 'react-router-dom'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { SelectField, TextInput, Autocomplete } from 'evergreen-ui';

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
        <Autocomplete
          title="Essays"
          onChange={changedItem => this.props.history.push('/essays/' + changedItem.replace(/\s/g, "-"))}
          items={['Hacking Education', 'Saying No']}
        >
          {(props) => {
            const { getInputProps, getRef, inputValue, openMenu } = props
            return (
              <TextInput
                placeholder="essays"
                value={inputValue}
                innerRef={getRef}
                {...getInputProps({
                  onFocus: () => {
                    openMenu()
                  }
                })}
              />
            )
          }}
        </Autocomplete>
        <Route component={Hacking} path={'/essays/hacking-education'} />
        <Route component={SayNo} path={'/essays/saying-no'} />
      </div>

    )
  }
}
