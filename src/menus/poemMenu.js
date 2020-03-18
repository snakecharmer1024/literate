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
import {Autocomplete, TextInput} from 'evergreen-ui'

export default class PoemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  poems = [
    'Mythologizing the Unconscious', 'Two Bodies', 'Victory', 'Muse', 'Memory in Bondage', 'Meta-Haiku',
    'Unavoidable Liberation', 'Things are Different', 'Desert', 'Secretly the Same Person', 'Liquid Mirror', 'School'
  ];

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Poetry <br/>
        </p>
        <Autocomplete
          title="Poems"
          onChange={changedItem => this.props.history.push('/poetry/' + changedItem.replace(/\s/g, "-"))}
          items={this.poems}
        >
          {(props) => {
            const { getInputProps, getRef, inputValue, openMenu } = props
            return (
              <TextInput
                placeholder="poems"
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

      </div>

    )
  }
}