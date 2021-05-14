import React, { useState } from 'react';
import './Card.css'

export default function Card(props) {
  // need a id to show what card it is
  // const [isflipped, flip] = useState(false)
  const isflippedClass = props.flipped ? 'is-flipped' : 'not-flipped'
  // if (!props.matched && isflipped) {
  //   console.log('auto flip back')
  //   setTimeout(()=>flip(!isflipped), 1000)
    
  // } 

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

