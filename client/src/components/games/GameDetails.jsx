import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'
import moves from './Logic'
import { MonsterMove} from './Monsters'

class GameDetails extends PureComponent {
constructor(props){
  super(props)
  this.keyPress = this.handleKeyPress.bind(this)
  this.state = {
    m3: {
      row: -1,
      column: 9,
      symbol: 'p'
    },
    m4: {
      row: 0,
      column: 9,
      symbol: 'p'
    },
    m5: {
      row: 1,
      column: 9,
      symbol: 'p'
    },
    m6: {
      row: 2,
      column: 9,
      symbol: 'p'
    },
    m7: {
      row: 9,
      column: 11,
      symbol: 'p'
    },
    m8: {
      row: 8,
      column: 11,
      symbol: 'p'
    },
    m9: {
      row: 7,
      column: 11,
      symbol: 'p'
    },
    m10: {
      row: 6,
      column: 11,
      symbol: 'p'
    },
  }
}

  handleKeyPress = (event) => {

    if (event.keyCode === 38) {
      this.makeMove(moves.UP)
    }
    if (event.keyCode === 37) {
      this.makeMove(moves.LEFT)
    }
    if (event.keyCode === 40) {
      this.makeMove(moves.DOWN)
    }
    if (event.keyCode === 39) {
      this.makeMove(moves.RIGHT)
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false)
    this.interval = setInterval(() => this.monsterBoard(), 1000);
    
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    clearInterval(this.interval);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  // const boardPlusPlayer = 
  // //interval
  // MonsterMove(newBoard, player, this.state.m3, this.state.m4, this.state.m5, this.state.m6,
  //   this.state.m7, this.state.m8, this.state.m9, this.state.m10)
  // this.setState({ 
  //   m3: { ...this.state.m3, row: boardPlusPlayer.m3.row},
  //   m4: { ...this.state.m4, row: boardPlusPlayer.m4.row},
  //   m5: { ...this.state.m5, row: boardPlusPlayer.m5.row},
  //   m6: { ...this.state.m6, row: boardPlusPlayer.m6.row},
  //   m7: { ...this.state.m7, row: boardPlusPlayer.m7.row},
  //   m8: { ...this.state.m8, row: boardPlusPlayer.m8.row},
  //   m9: { ...this.state.m9, row: boardPlusPlayer.m9.row},
  //   m10: { ...this.state.m10, row: boardPlusPlayer.m10.row},
  // })

  monsterBoard = () => {
    const { game, userId, updateGame } = this.props
    const player = game.players.find(p => p.userId === userId)

      const boardPlusPlayer = 
  //interval
  MonsterMove(game.board, player, this.state.m3, this.state.m4, this.state.m5, this.state.m6,
    this.state.m7, this.state.m8, this.state.m9, this.state.m10)
  this.setState({ 
    m3: { ...this.state.m3, row: boardPlusPlayer.m3.row},
    m4: { ...this.state.m4, row: boardPlusPlayer.m4.row},
    m5: { ...this.state.m5, row: boardPlusPlayer.m5.row},
    m6: { ...this.state.m6, row: boardPlusPlayer.m6.row},
    m7: { ...this.state.m7, row: boardPlusPlayer.m7.row},
    m8: { ...this.state.m8, row: boardPlusPlayer.m8.row},
    m9: { ...this.state.m9, row: boardPlusPlayer.m9.row},
    m10: { ...this.state.m10, row: boardPlusPlayer.m10.row},
  })


  updateGame(game.id, boardPlusPlayer.newBoard3, boardPlusPlayer.player)

  }


  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (move) => {
  
    const { game, userId, updateGame } = this.props
    const player = game.players.find(p => p.userId === userId)

    if (player.position_row + move.y >= 0 &&
      player.position_row + move.y <= 9 &&
      player.position_column + move.x >= 0 &&
      player.position_column + move.x <= 22) {
      player.position_row = player.position_row + move.y
      player.position_column = player.position_column + move.x
    }
    else {
      player.position_row = player.position_row
      player.position_column = player.position_column
    }

    const newBoard = game.board.map(row => row.map(cell => {
      if (cell === player.symbol) {
        return cell = null
      }
      if (cell === null) {
        return cell = null
      } if (cell !== player.symbol) {
        return cell
      }
    }))
    
    newBoard[player.position_row][player.position_column] = player.symbol
    
    // const boardPlusPlayer = 
    // //interval
    // MonsterMove(newBoard, player, this.state.m3, this.state.m4, this.state.m5, this.state.m6,
    //   this.state.m7, this.state.m8, this.state.m9, this.state.m10)
    // this.setState({ 
    //   m3: { ...this.state.m3, row: boardPlusPlayer.m3.row},
    //   m4: { ...this.state.m4, row: boardPlusPlayer.m4.row},
    //   m5: { ...this.state.m5, row: boardPlusPlayer.m5.row},
    //   m6: { ...this.state.m6, row: boardPlusPlayer.m6.row},
    //   m7: { ...this.state.m7, row: boardPlusPlayer.m7.row},
    //   m8: { ...this.state.m8, row: boardPlusPlayer.m8.row},
    //   m9: { ...this.state.m9, row: boardPlusPlayer.m9.row},
    //   m10: { ...this.state.m10, row: boardPlusPlayer.m10.row},
    // })
    // tot hier
    

    //boardPlusPlayer.newBoard3[boardPlusPlayer.player.position_row][boardPlusPlayer.player.position_column] = player.symbol
    
    updateGame(game.id, newBoard, player)
  }


  render() {
    const { game, users, authenticated, userId } = this.props

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<div>
      <Paper className="outer-paper">
        <input />
        <h1>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {/* {
          game.status === 'started' &&
          player && player.symbol === game.turn &&
          <div>It's your turn!</div>
        } */}

        {
          game.status === 'pending' &&
          game.players.map(p => p.userId).indexOf(userId) === -1 &&
          <button onClick={this.joinGame}>Join Game</button>
        }

        {
          winner &&
          <p>Winner: {users[winner].firstName}</p>
        }

        <hr />

        {
          game.status !== 'pending' &&
          <Board board={game.board} makeMove={this.makeMove} />
        }
      </Paper></div>)
      
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
