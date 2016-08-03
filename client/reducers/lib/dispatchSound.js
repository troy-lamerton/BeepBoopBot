import tileInFront from './tileInFront'

export default function (state){
  if (state.sound) {
    if(state.commandQueue[state.executeCommandIndex] === 'JUMP_UP' && tileInFront(state.robot, state.board)===2){
      return 'jump'
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