import { Routes, Route } from 'react-router-dom';
import HomePage from './app/homePage';
import LoginPage from './app/loginPage';
import ProjectPage from './app/projectPage';
import SignupPage from './app/signupPage';
import SignupSuccessPage from './app/signupSuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup-success" element={<SignupSuccessPage />} />
      <Route path="/projects/:projectId" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
