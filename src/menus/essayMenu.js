import React, {Component} from 'react';
import Hacking from '../essays/Hacking.js'
import SayNo from '../essays/SayNo.js'
import {Route} from 'react-router-dom'
import {Menu} from 'evergreen-ui'

export default class EssayMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  essays = ['Hacking Education', 'Saying No'];

  render() {
    return (
      <div className="App">
        <p className="App-intro">
            Essays <br/>
        </p>
        <Menu><Menu.Group>
          {this.essays.map(x => (
            <Menu.Item onSelect={() => this.props.history.push('/essays/' + x.replace(/\s/g, "-"))}>
              {x}
            </Menu.Item>
          ))}
        </Menu.Group></Menu>

        <Route component={Hacking} path={'/essays/hacking-education'} />
        <Route component={SayNo} path={'/essays/saying-no'} />
      </div>

    )
  }
}
