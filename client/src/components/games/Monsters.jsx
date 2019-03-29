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

function monsterThree (m3) {
  if(m3.row < 9){
    return m3.row+1
  } else return m3.row = 0
  
}

function MonsterMove(currentBoard, player, m3) {

 

  const newBoard = removePreviousMonster(currentBoard, monsterOne)
  const newCoordinatesMonster1 = newCoordinates(monsterOne.rows, monsterOne.columns[0], monsterOne.columns[1])
  newBoard[newCoordinatesMonster1.row][newCoordinatesMonster1.column] = monsterOne.symbol
  collision(player, newCoordinatesMonster1)

  const newBoard2 = removePreviousMonster(newBoard, monsterTwo)
  const newCoordinatesMonster2 = newCoordinates(monsterTwo.rows, monsterTwo.columns[0], monsterTwo.columns[1])
  newBoard2[newCoordinatesMonster2.row][newCoordinatesMonster2.column] = monsterTwo.symbol
  collision(player, newCoordinatesMonster2)

  // console.log(m3.symbol , 'im the sumbol of 3')
  console.log(newBoard2, 'im newboard2', m3,'im monster 3')
  const newBoard3 = removePreviousMonster(newBoard2, m3)
  
  m3.row = monsterThree(m3)
  const monsterThreeCoordinates = {row: m3.row, column: m3.colum}
  newBoard3[m3.row][m3.column] = m3.symbol
  collision(player, monsterThreeCoordinates)
  console.log(newBoard3, 'im the newboard3')
  return {
    newBoard3,
    player,
    m3
  }
}

export { MonsterMove }
