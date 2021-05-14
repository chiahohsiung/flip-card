import React, { useState } from 'react';
import twoC from '../assets/2C.png';
import redBack from '../assets/red_back.png'
import './Card.css'

export default function Card(props) {
  // need a id to show what card it is
  const [isflipped, flip] = useState(false)
  const isflippedClass = isflipped ? 'is-flipped' : 'not-flipped'

  return (
    <div class="scene">
      <div class={`card ${isflippedClass}`} onClick={() => flip(!isflipped)}>
        <div class="card__face card__face--front">
          <img src={redBack} />
        </div>
        <div class="card__face card__face--back">
          <img src={twoC} />
        </div>
      </div>
    </div>
  )
}

