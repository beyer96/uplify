import './App.css';

import { Login } from './components/Login/Login'
import { Content } from './components/Content/Content'

import { accessToken } from './util/Spotify/Spotify';

function App() {
  

  
  return (
    <div>  
      {/* {accessToken ? <Content /> : <Login />} */}
      <Content />
    </div>
  );
}

export default App;
