import { injectReducer } from '../../store/reducers'
import HomeIndexRoute from './routes/home'
import Comp from './components/Home'
export default (store) => ({
  path : 'home',
  component: Comp,
  indexRoute: { onEnter: (nextState, replace) => replace('/home/index') },
  childRoutes : [
    HomeIndexRoute(store),
  ]
})
