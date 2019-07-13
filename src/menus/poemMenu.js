import React, { Component } from 'react'
import Myth from '../poems/Mythologizing.js'
import TwoBodies from '../poems/TwoBodies.js'
import Victory from '../poems/Victory.js'
import Muse from '../poems/Muse.js'
import Memory from '../poems/Memory.js'
import MetaHaiku from '../poems/MetaHaiku.js'
import Liberation from '../poems/Liberation.js'
import Things from '../poems/Things.js'
import Desert from '../poems/Desert.js'
import Secret from '../poems/Secret.js'
import Liquid from '../poems/Liquid.js'
import School from '../poems/School.js'
import {DropdownMenu, MenuItem} from "react-bootstrap-dropdown-menu";
import {Route} from "react-router";

export default class PoemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  components = [
      [], <Myth />, <TwoBodies />, <Victory />, <Muse />, <Memory />,
      <MetaHaiku />, <Liberation />, <Things />, <Desert />, <Secret />,
      <Liquid />, <School />
  ];

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
          Poetry <br/>
        </p>

        <DropdownMenu triggerType="text" trigger={"What would you like to read?"}>
          <MenuItem text="Mythologizing the Unconscious" location="/poetry/mythologizing-the-unconscious" />
          <MenuItem text="Two Bodies" location="/poetry/two-bodies" />
          <MenuItem text="Victory" location="/poetry/victory" />
          <MenuItem text="Muse" location="/poetry/muse" />
          <MenuItem text="Memory in Bondage" location="/poetry/memory-in-bondage" />
          <MenuItem text="Meta-Haiku" location="/poetry/meta-haiku" />
          <MenuItem text="Unavoidable Liberation" location="/poetry/unavoidable-liberation" />
          <MenuItem text="Things are Different" location="/poetry/things-are-different" />
          <MenuItem text="Desert" location="/poetry/desert" />
          <MenuItem text="Secretly the Same Person" location="/poetry/secretly-the-same-person" />
          <MenuItem text="Liquid Mirror" location="/poetry/liquid-mirror" />
          <MenuItem text="School" location="/poetry/school" />
        </DropdownMenu>
        <Route component={Myth} path={"/poetry/mythologizing-the-unconscious"} />
        <Route component={TwoBodies} path={"/poetry/two-bodies"} />
        <Route component={Victory} path={"/poetry/victory"} />
        <Route component={Muse} path={"/poetry/muse"} />
        <Route component={Memory} path={"/poetry/memory-in-bondage"} />
        <Route component={MetaHaiku} path={"/poetry/meta-haiku"} />
        <Route component={Liberation} path={"/poetry/unavoidable-liberation"} />
        <Route component={Things} path={"/poetry/things-are-different"} />
        <Route component={Desert} path={"/poetry/desert"} />
        <Route component={Secret} path={"/poetry/secretly-the-same-person"} />
        <Route component={Liquid} path={"/poetry/liquid-mirror"} />
        <Route component={School} path={"/poetry/school"} />
        { this.state.children }

      </div>

    )
  }
}