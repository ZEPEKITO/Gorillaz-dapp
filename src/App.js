import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./componants/Home"
import Assets from "./componants/Assets"
import  Navbar  from "./componants/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/assets" element={<Assets/>}/>
      </Routes>
    </div>
  );

}

export default App;
