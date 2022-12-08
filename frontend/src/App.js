import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseUpdatePage from './pages/CourseUpdatePage';
import CoursePage from './pages/CoursePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div classname = "pages">
          <Routes>
            <Route
              path="/"
              element={
                 <Home />
              }
            />
            <Route
              path="/login"
              element={
                 <Login />
              }
            />
            <Route
              path="/signup"
              element={
                 <Signup />
              }
            />
              <Route
              path="/updatePage/:id"
              element={
                 <CourseUpdatePage />
              }
            />
            <Route
              path="/coursePage/:id"
              element={
                 <CoursePage />
              }
            />

            
            
          
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
