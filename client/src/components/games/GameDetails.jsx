import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'
import moves from './Logic'


class GameDetails extends PureComponent {
constructor(props){
  super(props)
  this.keyPress = this.handleKeyPress.bind(this)
}

handleKeyPress = (event) => {
  const {game, userId} = this.props
  const player = game.players.find(p => p.userId === userId)
  if(event.keyCode === 38){
    this.makeMove(player, moves.UP)
  }
  if(event.keyCode === 37){
    this.makeMove(player, moves.LEFT)
  }
  if(event.keyCode === 40){
    this.makeMove(player, moves.DOWN)
  }
  if(event.keyCode === 39){
    this.makeMove(player, moves.RIGHT)
  }
}
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (player, move) => {
    
    const {game, updateGame} = this.props


    console.log(player, 'im the player that makes a move')
    player.position_row = player.position_row +move.y
    player.position_column = player.position_column +move.x

    

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

    updateGame(game.id, newBoard, player)
  }



  // const plainBoard = game.board.map(row => row.map(cell => {
  //   if (cell === game.turn) {
  //     return cell = null
  //   }
  //   if (cell === null) {
  //     return cell = null
  //   } if (cell !== game.turn) {
  //     return cell
  //   }
  // }))

  render() {
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (
    <Paper className="outer-paper">
      <input/>
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

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
    </Paper>)
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
