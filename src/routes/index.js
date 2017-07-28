// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import HomeRoute from './Home'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/home/index') },
  childRoutes : [
    HomeRoute(store),
  ]
})


export default createRoutes
