import {createStackNavigator, createAppContainer} from 'react-navigation';

import Start from './screens/start';
import Login from './screens/login';
import Home from './screens/home';

const MainStack = createStackNavigator(
  {
    Start,
    Login,
    Home,
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(MainStack);
export default App;
