import React from 'react';
import Poem from './poems.js';
import Sorrow from '../assets/sorrow.jpg'


export default class Desert extends Poem {
    render() {
      return (
          <div>
          <Poem title='Desert' author='illuzen' image={Sorrow} />
          <br/>
          Like a statue in a desert storm <br/>
          My wrinkles turned to creases <br/>
          My creases turned to etchings<br/>
           My etchings turned to polish<br/>
           My polish turned to dust<br/>
          <br/>
            Like an illusory oasis<br/>
           My lake of sorrow turned to a pond<br/>
           My pond turned to a puddle<br/>
           My puddle turned to dew <br/>
          My dew turned to sky<br/>
          </div>
        )
      }
    }
