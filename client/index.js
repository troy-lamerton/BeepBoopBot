import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import soundsMiddleware from 'redux-sounds'
import App from './components/App'
import reducer from './reducers/reducer'

const soundsData = {
  jump: './resources/sound/jump.wav'
}
const loadedSoundsMiddleware = soundsMiddleware(soundsData)
const logger = createLogger()
const store = createStore(reducer, applyMiddleware(logger, thunk, loadedSoundsMiddleware))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
