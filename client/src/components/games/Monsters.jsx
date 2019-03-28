const monsterOne = {
  rows: 9,
  columns: [5, 7],
  symbol: 'm'
}

function newCoordinates (numberOfRows, minColumn, maxColumn) {
  const row = Math.floor(Math.random() * numberOfRows)
  const column = Math.floor(Math.random() * (maxColumn - minColumn) + minColumn)
  return {
    row,
    column
  }
}

function removePreviousMonster(game, monster) {
  game.board.map(row => row.map(cell => {
  if (cell === monster.symbol) {
    return cell = null
  }
  if (cell === null) {
    return cell = null
  } if (cell !== monster.symbol) {
    return cell
  }
}))
}

function MonsterOneMove (currentBoard){
  console.log(currentBoard, 'this monsterMove is called')
  // let newBoard = removePreviousMonster(currentGame, monsterOne)
  const newCoordinatesMonster = newCoordinates(monsterOne.rows, monsterOne.columns[0], monsterOne.columns[1])
  
  currentBoard[newCoordinatesMonster.row][newCoordinatesMonster.column] = monsterOne.symbol
  return currentBoard
}

export { MonsterOneMove }
