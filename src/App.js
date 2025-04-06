import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Template from './pages/Template';
import Contract from './pages/Contract';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/introduction" element={<Introduction/>} />
            <Route path="/contract" element={<Contract/>} />
            <Route path="/template" element={<Template/>} />
          </Routes>
        

        <Footer />
      </div>
    </Router>
  );
}

export default App;
