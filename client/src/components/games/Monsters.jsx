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

function MonsterOneMove (currentBoard){
  const newBoard = removePreviousMonster(currentBoard, monsterOne)
  const newCoordinatesMonster = newCoordinates(monsterOne.rows, monsterOne.columns[0], monsterOne.columns[1])
  newBoard[newCoordinatesMonster.row][newCoordinatesMonster.column] = monsterOne.symbol
  return newBoard
}

export { MonsterOneMove }
