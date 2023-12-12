import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/loginPage/loginPage';
import Panel from './Components/panel_main_page/panel';
import AccSettings from './Components/pages/accSettings';
import { Route, Routes } from 'react-router-dom';
// import BoatViewDetails from './Components/pages/boatViewDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<LoginPage/>}/>
        <Route path='panel/*' element={<Panel/>}/>
      </Routes>
      {/* <Panel/> */}
      {/* <AccSettings/> */}
    </div>
  );
}

export default App;
