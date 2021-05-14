import React from 'react';
import './App.css';
import Card from './components/Card'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
    this.handleReset = this.handleReset.bind(this)

  }
  componentDidMount() {
    this.handleReset()
  }
  // random generate pairs
  handleReset(pairs=4) {
    console.log(pairs)
    // club diamond heart spade
    const suits = ['C', 'D', 'H', 'S']
    // 1~10 A K Q J
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
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
    this.setState({
      cards: sampledCards
    })
  }
  // check match
  render() {
    const cardsContent = this.state.cards.map((card, index) => <><Card key={index} id={card}/><Card key={index + 4} id={card}/></>)
    return (
      <div>
        <p>My Flip Card Game</p>
        <button
          className='reset-btn'
          onClick={()=>this.handleReset(2)}>
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
