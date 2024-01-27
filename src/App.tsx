import { Routes, Route } from 'react-router-dom';
import HomePage from './app/homePage';
import LoginPage from './app/loginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
