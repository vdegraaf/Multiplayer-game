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
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
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

    const boardPlusPlayer = MonsterMove(newBoard, player)
    
    boardPlusPlayer.newBoard2[boardPlusPlayer.player.position_row][boardPlusPlayer.player.position_column] = player.symbol

    updateGame(game.id, boardPlusPlayer.newBoard2, boardPlusPlayer.player)
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
