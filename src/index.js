import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/';

import 'bootstrap';

if (process.env.PREACT_APP_ENV !== 'production') {
  // eslint-disable-next-line
  console.info('Starting app in DEBUG mode:', process.env);
}

import App from './app/app';
export default App;
