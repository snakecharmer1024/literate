import React, { Component } from 'react';
import logo from './assets/yinyang.png';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500, cyanA200 } from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Tetrahedron from './geometry/tetrahedron.js'
import IcosahedronDodecahedron from './geometry/icosahedron-dodecahedron.js'
import OctahedronCube from './geometry/octahedron-cube.js'
import Myth from './poems/Mythologizing.js'
import TwoBodies from './poems/TwoBodies.js'
import Victory from './poems/Victory.js'
import Muse from './poems/Muse.js'
import Memory from './poems/Memory.js'
import MetaHaiku from './poems/MetaHaiku.js'
import Liberation from './poems/Liberation.js'
import Things from './poems/Things.js'
import Desert from './poems/Desert.js'
import Secret from './poems/Secret.js'
import Liquid from './poems/Liquid.js'
import School from './poems/School.js'
import Hacking from './essays/Hacking.js'
import SayNo from './essays/SayNo.js'

const primary = cyan500
const accent = cyanA200


const styles = {
  customWidth: {
    width: 200,
  },
}

class EssayMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  components = [[], <Hacking />, <SayNo />]

  handleChange = (event, index, value) => {
    var state = {
      value: value,
      children: this.components[index]
    }
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          What would you like to read?
        </p>
        <MuiThemeProvider>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="Please Select" />
          <MenuItem value={1} primaryText="Hacking Education" />
          <MenuItem value={2} primaryText="Saying No" />
        </DropDownMenu>
        </MuiThemeProvider>
        <br/>
        <div className="essays">
        { this.state.children }
        </div>
      </div>

    )
  }
}

class PoemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  components = [[], <Myth />, <TwoBodies />, <Victory />, <Muse />, <Memory />, <MetaHaiku />, <Liberation />, <Things />, <Desert />, <Secret />, <Liquid />, <School />]

  handleChange = (event, index, value) => {
    var state = {
      value: value,
      children: this.components[index]
    }
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          What would you like to read?
        </p>
        <MuiThemeProvider>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="Please Select" />
          <MenuItem value={1} primaryText="Mythologizing the Unconscious" />
          <MenuItem value={2} primaryText="Two Bodies" />
          <MenuItem value={3} primaryText="Victory" />
          <MenuItem value={4} primaryText="Muse" />
          <MenuItem value={5} primaryText="Memory in Bondage" />
          <MenuItem value={6} primaryText="Meta-Haiku" />
          <MenuItem value={7} primaryText="Unavoidable Liberation" />
          <MenuItem value={8} primaryText="Things are Different" />
          <MenuItem value={9} primaryText="Desert" />
          <MenuItem value={10} primaryText="Secretly the Same Person" />
          <MenuItem value={11} primaryText="Liquid Mirror" />
          <MenuItem value={12} primaryText="School" />
        </DropDownMenu>
        </MuiThemeProvider>
        { this.state.children }

      </div>

    )
  }
}



class GeometryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: []
    };
  }

  components = [[], <Tetrahedron />, <OctahedronCube />, <IcosahedronDodecahedron />]

  handleChange = (event, index, value) => {
    var state = {
      value: value,
      children: this.components[index]
    }
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          What would you like to see?
        </p>
        <MuiThemeProvider>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="Please Select" />
          <MenuItem value={1} primaryText="Tetrahedron Fractal" />
          <MenuItem value={2} primaryText="Octahedron-Cube Fractal" />
          <MenuItem value={3} primaryText="Icosahedron-Dodecahedron Fractal" />
        </DropDownMenu>
        </MuiThemeProvider>
        <div id='geometry'>
          { this.state.children }
        </div>
      </div>

    )
  }
}

class MusicMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          What would you like to listen to?
        </p>
        <iframe title="Tremble" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/344393899&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Birth - I" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/335612465&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Birth - II" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/335614094&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Odd" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/332324487&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Turtle" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/332323874&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Transparent" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/332319678&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Air" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320147649&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Purple - I" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320143323&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Purple - II" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320144071&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Brain Charmers Theme" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/316002995&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Given" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/274355955&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Wondering" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/273845999&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Flutter" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/271851169&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Will-o-Wisp" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/269963557&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Melting Heart" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/268687332&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="The Forever Laugh" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/267773128&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Liquid Crystal" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/264678994&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="River Thread" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/260937735&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Mother Chaos" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/178990445&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Letter to Her Majesty - Jester" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/89812969&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Letter to Her Majesty - Visions of War" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/89825428&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Mom's Canon" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/81605394&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Waves of Isis - I" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/81045048&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Wheels Within Wheels" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/72064530&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Mirror" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/64114576&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Axe of Discrimination" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/60272597&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Goodbye Pharaoh" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/50688242&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Taurus" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/50205647&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Ajda's Theme" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/45889897&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Endless Earth" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/36668949&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="For every thing that lives is Holy" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29752667&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Paranoia" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/26251361&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Nature Worship" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21621135&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Summer Darkness" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/20104551&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Margaret's Theme" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/18910646&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        <iframe title="Improv with Prokofiev" width="60%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/18908581&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>

      </div>

    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      children: []
    };
  }
  components = [[], <EssayMenu />, <PoemMenu />, <GeometryMenu />, <MusicMenu />]

  handleChange = (event, index, value) => {
    var state = { value: value, children: this.components[index] }
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          Please select a category
        </p>
        <MuiThemeProvider>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="Please Select" />
          <MenuItem value={1} primaryText="Essays" />
          <MenuItem value={2} primaryText="Poems" />
          <MenuItem value={3} primaryText="Geometry" />
          <MenuItem value={4} primaryText="Music" />
        </DropDownMenu>
        </MuiThemeProvider>
        { this.state.children }
        <br/><br/>
      </div>

    )
  }
}

export default App;
