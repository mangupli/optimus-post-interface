import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from '../header/Header';

import { DistrictsPage, PostamatsPage, LoginPage } from '../pages';

import { loginSuccess, logout } from "../../actions";

import Footer from '../footer/Footer';
import ErrorMessage from "../errorMessage/ErrorMessage";


import '../../style/style.scss'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(()=>{
    if(localStorage.getItem('auth_token')){
      dispatch(loginSuccess());
    }
  },[]);

  return (
    <Router>
      <Header/>
        <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <DistrictsPage/>
                </ProtectedRoute>           
            }/>
            <Route
              path="/postamats"
              element={
                <ProtectedRoute user={user}>
                  <PostamatsPage/>
                </ProtectedRoute>           
            }/>
            <Route path="*" element={<ErrorMessage />}/> 
            <Route path="/login" element={<LoginPage user={user}/>}/> 
        </Routes>        
      <Footer/>  
    </Router>
  );
}

const ProtectedRoute = ({
        user,
        redirectPath = '/login',
        children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default App;
