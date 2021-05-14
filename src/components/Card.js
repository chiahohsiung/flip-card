import React, { useState } from 'react';
import './Card.css'

export default function Card(props) {
  // const [isflipped, flip] = useState(false)
  const isflippedClass = props.flipped ? 'is-flipped' : 'not-flipped'

  return (
    <div className="scene">
      <div className={`card ${isflippedClass}`} onClick={() => {
        if (!props.matched) {
          // flip(!isflipped)
          /* should optimize here later: async */
          if (!props.flipped) {
            props.handleCardClick(props.numSuit, props.id)
          }
        }
      }}>
        <div className="card__face card__face--front">
          <img src="assets/red_back.png" />
        </div>
        <div className="card__face card__face--back">
          <img src={`assets/${props.numSuit}.png`} />
        </div>
      </div>
    </div>
  )
}

