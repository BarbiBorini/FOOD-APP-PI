import './App.css';
import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from './Components/Home';
import CreateRecipe from "./Components/CreateRecipe";
import DetailRecipe from "./Components/DetailRecipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/recipe/:id" element={<DetailRecipe/>}/>
        <Route exact path="/create" element={<CreateRecipe/>}/>
        <Route path='*' element={<Navigate replace to='/home' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
