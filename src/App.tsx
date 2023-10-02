import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOMEPAGE} element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;