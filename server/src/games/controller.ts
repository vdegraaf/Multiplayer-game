import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities'
import { IsBoard, isValidTransition, calculateWinner, finished } from './logic'
import { Validate } from 'class-validator'
import { io } from '../index'

class GameUpdate {

  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
}

// function to add moves to the board, should be somewhere else
function move(currentBoard, row, column, symbol) {
  let newBoard = [...currentBoard]

  newBoard[row][column] = symbol

  return newBoard
}

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create()
      .save()

    const player = await Player.create({
      game: entity,
      user,
      symbol: 'x',
      position_row: 3,
      position_column: 3
    }).save()

    const game: any = await Game.findOneById(entity.id)

    game.board = move(game.board, player.position_row, player.position_column, player.symbol)
    await game.save()

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game: any = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      user,
      symbol: 'o',
      position_row: 6,
      position_column: 6
    })
    player.game = game
    player.save()

    game.board = move(game.board, player.position_row, player.position_column, player.symbol)
    await game.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update
  ) {



    const game: any = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player: any = await Player.findOne({ user, game })
    
    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    // if (!isValidTransition(player.symbol, game.board, update.board)) {
    //   throw new BadRequestError(`Invalid move`)
    // }    


    const winner = calculateWinner(update.board)
    if (winner) {
      game.winner = winner
      game.status = 'finished'
    }
    else if (finished(update.board)) {  
      game.status = 'finished'
    }

  
    if(update.board){
  
      game.board = update.board
      player.position_column = update.player.position_column
      player.position_row = update.player.position_row
      game.turn = player.symbol === 'x' ? 'o' : 'x'
    }

    
    await player.save()
    await game.save()


    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

