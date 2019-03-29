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

function monsterFour (m) {
  if(m.row > 0){
    return m.row-1
  } else return m.row = 9
  
}

function MonsterMove(currentBoard, player, m3, m4, m5, m6, m7, m8, m9, m10) {

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

  m4.row = monsterThree(m4)
  const monsterFourCoordinates = {row: m4.row, column: m4.column}
  newBoard3[m4.row][m4.column] = m4.symbol
  collision(player, monsterFourCoordinates)

  m5.row = monsterThree(m5)
  const monsterFiveCoordinates = {row: m5.row, column: m5.column}
  newBoard3[m5.row][m5.column] = m5.symbol
  collision(player, monsterFiveCoordinates)

  m6.row = monsterThree(m6)
  const monsterSixCoordinates = {row: m6.row, column: m6.column}
  newBoard3[m6.row][m6.column] = m6.symbol
  collision(player, monsterSixCoordinates)
  
  m7.row = monsterFour(m7)
  const monsterSevenCoordinates = {row: m7.row, column: m7.column}
  newBoard3[m7.row][m7.column] = m7.symbol
  collision(player, monsterSevenCoordinates)

  m8.row = monsterFour(m8)
  const monsterEightCoordinates = {row: m8.row, column: m8.column}
  newBoard3[m8.row][m8.column] = m8.symbol
  collision(player, monsterEightCoordinates)

  m9.row = monsterFour(m9)
  const monsterNineCoordinates = {row: m9.row, column: m9.column}
  newBoard3[m9.row][m9.column] = m9.symbol
  collision(player, monsterNineCoordinates)

  m10.row = monsterFour(m10)
  const monsterTenCoordinates = {row: m10.row, column: m10.column}
  newBoard3[m10.row][m10.column] = m10.symbol
  collision(player, monsterTenCoordinates)


  return {
    newBoard3,
    player,
    m3,
    m4,
    m5,
    m6,
    m7, m8, m9, m10
  }
}

export { MonsterMove }
