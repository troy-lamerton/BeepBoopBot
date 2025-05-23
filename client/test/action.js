const test = require('tape')

const actions = require('../reducers/action')
const reducer = require('../reducers/reducer').default
const cloneState = require('../reducers/reducer').cloneState

const initialState = cloneState(reducer(undefined, {}))
initialState.running = true
initialState.commandQueue.push('TURN_LEFT')

test('command dispatches queued action when running and has a command queued', function (t) {
  const thunk = actions.runCommands()
  thunk(
    function (action) {
      // 'HAS_FINISHED' is dispatched from action.js'
      if (action.type !== actions.HAS_FINISHED) {
        t.deepEqual(action, { type: 'TURN_LEFT' })
        initialState.running = false
        t.end()
      }
    },
    function () {
      return initialState
    }
  )
})
