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



function newCoordinates(numberOfRows, minColumn, maxColumn) {
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

const player_x = {
  symbol: 'x',
  position_row: 4,
  position_column: 0
}

const player_o = {
  symbol: 'o',
  position_row: 4,
  position_column: 22
}

function collision(player, newMonsterCoordinates) {

  if (player.position_column === newMonsterCoordinates.column &&
    player.position_row === newMonsterCoordinates.row) {
    if (player.symbol === 'x') {

      player.position_column = player_x.position_column
      player.position_row = player_x.position_row
    } else if (player.symbol === 'o') {
      player.position_column = player_o.position_column
      player.position_row = player_o.position_row
    }
  }

  return player
}

function monsterThree (m) {
  if(m.row < 9){
    return m.row+1
  } else return m.row = 0
  
}

function MonsterMove(currentBoard, player, m3, m4) {

 

  const newBoard = removePreviousMonster(currentBoard, monsterOne)
  const newCoordinatesMonster1 = newCoordinates(monsterOne.rows, monsterOne.columns[0], monsterOne.columns[1])
  newBoard[newCoordinatesMonster1.row][newCoordinatesMonster1.column] = monsterOne.symbol
  collision(player, newCoordinatesMonster1)

  const newBoard2 = removePreviousMonster(newBoard, monsterTwo)
  const newCoordinatesMonster2 = newCoordinates(monsterTwo.rows, monsterTwo.columns[0], monsterTwo.columns[1])
  newBoard2[newCoordinatesMonster2.row][newCoordinatesMonster2.column] = monsterTwo.symbol
  collision(player, newCoordinatesMonster2)

  const newBoard3 = removePreviousMonster(newBoard2, m3)
  m3.row = monsterThree(m3)
  const monsterThreeCoordinates = {row: m3.row, column: m3.column}
  newBoard3[m3.row][m3.column] = m3.symbol
  collision(player, monsterThreeCoordinates)

  console.log(m4, 'im m4')
  // const newBoard4 = removePreviousMonster(newBoard3, m4)
  m4.row = monsterThree(m4)
  const monsterFourCoordinates = {row: m4.row, column: m4.column}
  newBoard3[m4.row][m4.column] = m4.symbol
  collision(player, monsterFourCoordinates)

  console.log(newBoard3, 'im newboard3 in Monsters')

  return {
    newBoard3,
    player,
    m3,
    m4
  }
}

export { MonsterMove }
