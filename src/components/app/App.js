import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from '../header/Header';

import { DistrictsPage, PostamatsPage } from '../pages';

import Footer from '../footer/Footer';
import ErrorMessage from "../errorMessage/ErrorMessage";

import '../../style/style.scss'

function App() {

  return (
    <Router>
      <Header/>
        <Routes>
            <Route path="/" element={<DistrictsPage/>}/>
            <Route path="/postamats" element={<PostamatsPage/>}/>
            <Route path="*" element={<ErrorMessage />}/> 
        </Routes>        
      <Footer/>  
    </Router>
  );
}

export default App;
