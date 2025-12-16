import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AddData } from './pages/AddData';
import { Edit } from './pages/Edit';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/add-data" element={<ProtectedRoute><AddData/></ProtectedRoute>} />
      <Route path="/edit" element={<ProtectedRoute><Edit/></ProtectedRoute>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<h1 className='text-center mt-20 text-3xl font-bold'></h1>
      } />
    </Routes>
  );
}

export default App;
