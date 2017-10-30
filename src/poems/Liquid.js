import React from 'react';
import Poem from './poems.js';
import Sun from '../assets/sun.jpg'


export default class Liquid extends Poem {
    render() {
      return (
          <div>
          <Poem title='Liquid Mirror' author='illuzen' image={Sun} />
          <br/>
          In the Liquid Mirror <br/>
          Of the Mind <br/>
          Life is Reflected <br/>
          Earth-Filtered Sunshine <br/>
          </div>
        )
      }
    }
