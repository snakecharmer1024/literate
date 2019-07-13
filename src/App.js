import React, { Component } from 'react';
import logo from './assets/yinyang.png';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GeometryMenu from './menus/geometryMenu.js'
import MusicMenu from './menus/musicMenu.js'
import EssayMenu from './menus/essayMenu.js'
import PoemMenu from './menus/poemMenu.js'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: []
    };
  }
  components = [[], <EssayMenu />, <PoemMenu />, <GeometryMenu />, <MusicMenu />];

  handleChange = (event, index, value) => {
    var state = { value: value, children: this.components[index] };
    this.setState(state);
  };

  render() {
    return (
          <div className="App">
            <Router>

                <div>

                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                    <DropdownMenu triggerType="text" trigger={"Browse"}>
                      <MenuItem text="Essays" location="/essays" />
                      <MenuItem text="Poetry" location="/poetry" />
                      <MenuItem text="Geometry" location="/geometry" />
                      <MenuItem text="Music" location="/music" />
                    </DropdownMenu>
                  <Switch>
                    <Route component={EssayMenu} path={'/essays'} />
                    <Route component={PoemMenu} path={'/poetry'} />
                    <Route component={GeometryMenu} path={'/geometry'} />
                    <Route component={MusicMenu} path={'/music'} />
                  </Switch>
                </div>
            </Router>
          </div>
    )
  }
}

export default App;
