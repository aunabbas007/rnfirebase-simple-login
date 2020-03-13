import {createStackNavigator, createAppContainer} from 'react-navigation';

import Start from './screens/start';
import Login from './screens/login';
import Home from './screens/home';

const MainStack = createStackNavigator({
  Start: {
    screen: Start,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Home,
});

const App = createAppContainer(MainStack);
export default App;
