import React from 'react';
import Poem from './poems.js';
import Magician from '../assets/magician.jpg'


export default class MetaHaiku extends Poem {
    render() {
      return (
          <div>
          <Poem title='Meta-Haiku' author='illuzen' image={Magician} />
          <div className="haiku-3">
          Enter, grating our<br/>
          Subliminal Fears and Joys<br/>
          Chaperones be Damned<br/>
          <br/>
          Echoing Thru-out<br/>
          The Endless Caves and asms<br/>
          Still and yet not Still<br/>
          <br/>
          Awake and yet Not<br/>
          Thirst Slaked, and yet we feel Drought<br/>
          Oceans of Dark Ice<br/>
          <br/>
          </div>
          <div className="haiku-5">
          Knowing and yet No!<br/>
          Clustered among the Blind Spots<br/>
          Obstacles and Turf<br/>
          <br/>
          What else can we know<br/>
          Too late to say I told you<br/>
          So I'll say it now<br/>
          <br/>
          I told you I would<br/>
          Send you a birthday present<br/>
          I have not yet, no<br/>
          <br/>
          Several drawings<br/>
          I made, unworthy yet for <br/>
          Your presence-tation<br/>
          <br/>
          Interesting Yes<br/>
          Communicating Love No<br/>
          Tongue knows not Images<br/>
          <br/>
          </div>
          <div className="haiku-3">
          Therefore I write to<br/>
          You these Eleven Haiku<br/>
          Offering My Head<br/>
          <br/>
          My Hands without Thread<br/>
          Tributes and Tribulations<br/>
          Life Neverending<br/>
          <br/>
          Purseless and Bodyless<br/>
          My Words Must Finally Stop<br/>
          End Meta-Haiku<br/>
          </div>
          </div>
        )
      }
    }
