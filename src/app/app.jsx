import { Router } from 'preact-router';

// general components
import Menu from './components/menu';

// app settings
import Config from 'json-loader!yaml-loader!../data/config.yml';

// pages
import BattlePage from './pages/battle/battle';
import CharsPage from './pages/chars/chars';
import HomePage from './pages/home/home';
import UsersPage from './pages/users/users';

const App = () => (
  <main>
    <Menu links={ Config.menu.top } title={ Config.menu.title } />
    <Router>
      <HomePage path="/" />
      <BattlePage path="/battle" />
      <CharsPage path="/chars" />
      <UsersPage path="/users" />
    </Router>
  </main>
);

export default App;
