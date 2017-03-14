import { connect } from 'react-redux'
import Board from '../components/Board'
import * as actions from '../reducers/action'

const mapStateToProps = state => state

function mapDispatchToProps (dispatch) {
  return {
    addTileInfo: (tileInfo) => {
      dispatch(actions.addTileInfo(tileInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
