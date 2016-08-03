import tileInFront from './tileInFront'

export default function (state){
  if (state.sound) {
    console.log(state.currentLevel)
    if(state.commandQueue[state.executeCommandIndex] === 'JUMP_UP' && tileInFront(state.robot, state.board)===2){
      return 'jump'
    }
    else if (state.commandQueue[state.executeCommandIndex] === 'JUMP_UP' || state.commandQueue[state.executeCommandIndex] === 'MOVE_FORWARD' && tileInFront(state.robot, state.board)===3){
      return 'die'
    }
    else if(state.currentLevel == '26' && state.commandQueue[state.executeCommandIndex] === 'MOVE_FORWARD' && tileInFront(state.robot, state.board)===1){
      return 'win'
    }
    else {
      return null
    }
  }
  else
  {
    return null
  }
}