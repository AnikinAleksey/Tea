import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllTeas from './components/AllTeas';
import SearchTeas from './components/SearchTeas';
import './App.css'; // Убедитесь, что вы импортировали файл стилей

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav className='linknav'> 
                    <Link className="nav-link" to="/">Все чаи</Link>
                    <Link className="nav-link" to="/search">Поиск чая</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<AllTeas />} />
                    <Route path="/search" element={<SearchTeas />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;