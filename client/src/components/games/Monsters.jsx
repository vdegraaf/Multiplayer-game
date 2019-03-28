const monsterOne = {
  rows: 9,
  columns: [5, 7],
  symbol: 'm'
}

const monsterTwo = {
  rows: 9,
  columns: [16, 18],
  symbol: 'w'
}

function newCoordinates (numberOfRows, minColumn, maxColumn) {
  const row = Math.floor(Math.random() * numberOfRows)
  const column = Math.floor(Math.random() * (maxColumn - minColumn) + minColumn)
  return {
    row,
    column
  }
}

function removePreviousMonster(board, monster) {
  return board.map(row => row.map(cell => {
  if (cell === monster.symbol) {
    cell = null
  }
  if (cell !== monster.symbol) {
    return cell
  }
}))
}

function MonsterMove (currentBoard){
  const newBoard = removePreviousMonster(currentBoard, monsterOne)
  const newCoordinatesMonster1 = newCoordinates(monsterOne.rows, monsterOne.columns[0], monsterOne.columns[1])
  newBoard[newCoordinatesMonster1.row][newCoordinatesMonster1.column] = monsterOne.symbol

  const newBoard2 = removePreviousMonster(newBoard, monsterTwo)
  const newCoordinatesMonster2 = newCoordinates(monsterTwo.rows, monsterTwo.columns[0], monsterTwo.columns[1])
  newBoard2[newCoordinatesMonster2.row][newCoordinatesMonster2.column] = monsterTwo.symbol

  return newBoard2
  
}

// function MonsterTwoMove (currentBoard){
//   const newBoard2 = removePreviousMonster(currentBoard, monsterTwo)
//   const newCoordinatesMonster2 = newCoordinates(monsterTwo.rows, monsterTwo.columns[0], monsterTwp.columns[1])
//   newBoard2[newCoordinatesMonster2.row][newCoordinatesMonster2.column] = monsterTwo.symbol
//   return newBoard2
// }

export { MonsterMove }
