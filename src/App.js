import React from 'react';
import './App.css';
import Card from './components/Card'
import { shuffle } from './utils/utils'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      cardsMatched: [],
      curFlippedCards: [],
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)

  }
  componentDidMount() {
    this.handleReset()
  }

  handleCardClick(cardNumSuit) {
    console.log('cardNumSuit', cardNumSuit)
    const newFlippedCards = [...this.state.curFlippedCards]
    newFlippedCards.push(cardNumSuit)

    this.setState({
      curFlippedCards: newFlippedCards
    })
  }
  // random generate pairs
  handleReset(pairs = 4) {
    console.log(pairs)
    // club diamond heart spade
    const suits = ['C', 'D', 'H', 'S']
    // 1~10 A K Q J
    const nums = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const sampledCards = []
    while (sampledCards.length < pairs) {
      const suitIndex = Math.floor(Math.random() * suits.length);
      const numIndex = Math.floor(Math.random() * nums.length);
      const curCard = nums[numIndex] + suits[suitIndex]
      console.log(curCard)
      if (!sampledCards.includes(curCard)) {
        sampledCards.push(curCard)
      }
    }
    console.log(sampledCards)
    /* should optimize this later */
    // make a simple card paired
    sampledCards.push(...sampledCards)
    shuffle(sampledCards)
    console.log(sampledCards)
    this.setState({
      cards: sampledCards
    })
  }
  // check match
  componentDidUpdate() {
    if (this.state.cardsMatched.length === 4) {
      setTimeout(() => alert('you win'), 1000)
    }
    if (this.state.curFlippedCards.length === 2) {
      if (this.state.curFlippedCards[0] === this.state.curFlippedCards[1]) {
        /* optimize here later */

        const newCardsMatched = [...this.state.cardsMatched]
        newCardsMatched.push(this.state.curFlippedCards[0])
        this.setState({
          cardsMatched: newCardsMatched
        })
        

      }
      else {
        // flip back
      }
      // empty the cur flipped cards
      this.setState({
        curFlippedCards: []
      })
    }
  }
  render() {
    // reorder
    const cardsContent = this.state.cards.map((card, index) => {
      return (
        <Card
          key={index}
          id={index}
          numSuit={card}
          matched={this.state.cardsMatched.includes(card) ? true : false}
          handleCardClick={this.handleCardClick}
        />
      )
    })
    console.log('this.state.curFlippedCards', this.state.curFlippedCards)
    console.log('this.state.cardsMatched', this.state.cardsMatched)
    return (
      <div>
        <div className="header">
          <h1>My Flip Card Game</h1>
          <h2>Goal: 4    Current Matched Pairs: {this.state.cardsMatched.length}</h2>
        </div>
        <button
          className='reset-btn'
          onClick={() => this.handleReset(2)}>
          Reset
        </button>
        <div className='card-container'>
          {cardsContent}
        </div>
      </div>
    );
  }

}

export default App;
