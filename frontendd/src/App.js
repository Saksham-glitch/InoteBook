import './App.css';
import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import LogIn from './components/login';
import SignUp from './components/signup';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (msg, type) => {
    setalert({ msg, type });
    setTimeout(() => setalert(null), 3000);
  };
   
  return (
   <>
      
      <NoteState>
   <Router>
< Navbar/>
<Alert alert={alert} />
<div className="container">
<Routes>
<Route path="/" element={<Home showAlert={showAlert}/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/login" element={<LogIn showAlert={showAlert}/>}/>
<Route path="/signup" element={<SignUp showAlert={showAlert}/>}/>


</Routes>

</div>
 </Router>
 </NoteState>
    </>
  );
}

export default App;
