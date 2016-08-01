import React from 'react'
import NavContainer from '../containers/NavContainer'
import CommandPaneContainer from '../containers/CommandPaneContainer'
import BoardContainer from '../containers/BoardContainer'

const App = () => (
  <div className='app'>
    <NavContainer />
    <BoardContainer />
    <CommandPaneContainer />
  </div>
)

export default App
