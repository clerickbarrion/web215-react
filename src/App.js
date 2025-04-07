import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Template from './pages/Template';
import Contract from './pages/Contract';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Users from './pages/Users';
function App() {
  return (
    <Router basename="/web215-react">
      <div className="App">


          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/introduction' element={<Introduction/>} />
            <Route path='/contract' element={<Contract/>} />
            <Route path='/template' element={<Template/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>

      </div>
    </Router>
  );
}

export default App;
