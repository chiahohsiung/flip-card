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
      /* should optimize later */
      // to flip back cards
      flipped: Array(8).fill(false)
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)

  }
  componentDidMount() {
    this.handleReset()
  }

  handleCardClick(cardNumSuit, id) {
    console.log('cardNumSuit', cardNumSuit)
    const newFlippedCards = [...this.state.curFlippedCards]
    newFlippedCards.push(id)
    const newFlipped = [...this.state.flipped]
    newFlipped[id] = !newFlipped[id]
    this.setState({
      curFlippedCards: newFlippedCards,
      flipped: newFlipped
    })
  }

  generateRandomPairs(pairs = 4) {
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

  handleReset() {
    this.setState({
      cardsMatched: [],
      curFlippedCards: [],
      flipped: Array(8).fill(false)
    }, () => {
      setTimeout(() => this.generateRandomPairs(), 1000) // make sure the card flipped first
    })
  }
  // check match
  componentDidUpdate() {
    if (this.state.cardsMatched.length === 4) {
      setTimeout(() => alert('you win'), 1000)
    }
    if (this.state.curFlippedCards.length === 2) {
      const firstCardId = this.state.curFlippedCards[0]
      const secondCardId = this.state.curFlippedCards[1]
      if (this.state.cards[firstCardId] === this.state.cards[secondCardId]) {
        /* optimize here later */
        const newCardsMatched = [...this.state.cardsMatched]
        newCardsMatched.push(this.state.cards[firstCardId])
        this.setState({
          cardsMatched: newCardsMatched
        })
      }
      else {
        /* should optimize later */
        // flip back
        setTimeout(() => {
          const newFlipped = [...this.state.flipped]
          newFlipped[firstCardId] = false
          newFlipped[secondCardId] = false
          this.setState({
            flipped: newFlipped
          })
        }, 1000)

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
          flipped={this.state.flipped[index]}
          matched={this.state.cardsMatched.includes(card) ? true : false}
          handleCardClick={this.handleCardClick}
        />
      )
    })
    console.log('this.state.curFlippedCards', this.state.curFlippedCards)
    console.log('this.state.cardsMatched', this.state.cardsMatched)
    console.log('this.state.flipped', this.state.flipped)
    return (
      <div>
        <div className="header">
          <h1>My Flip Card Game</h1>
          <h2>Goal:4 Current Matched Pairs: {this.state.cardsMatched.length}</h2>
          <button
            className='reset-btn'
            onClick={() => this.handleReset()}>
            Reset
        </button>
        </div>
        <div className='card-container'>
          {cardsContent}
        </div>
      </div>
    );
  }
}

export default App;
