import { configureStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(configureStore)

export default store