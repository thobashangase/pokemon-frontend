import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="fs-4">Pokemon App</span>
          </a>
        </header>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/:id' element={ <Details /> } />
          </Routes>
        </BrowserRouter>
        <footer>
          Made by <a href="https://github.com/thobashangase">@thobashangase</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
