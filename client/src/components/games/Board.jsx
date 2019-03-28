import React from 'react'
import './Board.css'
import bird from '../../images/pink-bird.png'; 
import fly from '../../images/grey-fly.png';
import monster from '../../images/blue-monster.png';

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    > {symbol === 'x'? <img id = 'bird' src={bird}/> : symbol === 'o'? <img id = 'fly' src={fly}/> : symbol === 'm'? <img id = 'monster' src={monster}/>: ' '}
        </button>
      
  )
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
  
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
