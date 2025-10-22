import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Journey from './pages/Journey';
import JourneyHeavy from "./pages/JourneyHeavy";
import JourneyLight from "./pages/JourneyLight";
import NewPageJournalLight from "./pages/NewPageJournalLight";
import NewPageJournalHeavy from "./pages/NewPageJournalHeavy";
import Book from "./pages/Book";
import MagicHome from "./pages/MagicHome";
import MagicDay from "./pages/MagicDay";
import ProgressTracker from "./pages/ProgressTracker";
import Register from "./pages/Register";
import About from "./pages/About";
// @ts-ignore
import TaskList from './components/TaskList';
// @ts-ignore
import Login from './components/Login';
import VisionBoard from "./pages/VisionBoard";
import Reset from "./pages/Reset";
import SoundTest from "./components/SoundTest";



function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/taskList" element={<TaskList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/books" element={<Book />} />
        <Route path="/about" element={<About/>} />
        
        <Route path="/JourneyHeavy" element={<JourneyHeavy />} />
        <Route path="/JourneyHeavy/new" element={<NewPageJournalHeavy />} />
        <Route path="/JourneyHeavy/:id" element={<NewPageJournalHeavy  />} />

        <Route path="/JourneyLight" element={<JourneyLight />} />
        <Route path="/JourneyLight/new" element={<NewPageJournalLight />} />
        <Route path="/JourneyLight/:id" element={<NewPageJournalLight  />} />

        <Route path="/MagicHome" element={<MagicHome />} />
        <Route path="/MagicDay" element={<MagicDay />} />
        <Route path="/ProgressTracker" element={<ProgressTracker />} />

        <Route path="/MagicDay/:day" element={<MagicDay/>} />
        <Route path="/therapy" element={<VisionBoard/>} />

        <Route path="/reset" element={<Reset/>} />

        
      </Routes>
      
    </Router>
  );
}
export default App;





