import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Journey from "./pages/Journey";
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

import TaskList from "./components/TaskList";
import Login from "./components/Login";
import VisionBoard from "./pages/VisionBoard";
import Reset from "./pages/Reset";
import SoundTest from "./components/SoundTest";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        {/* PRIVATE (must be logged in) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/taskList"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journey"
          element={
            <ProtectedRoute>
              <Journey />
            </ProtectedRoute>
          }
        />

        <Route
          path="/JourneyHeavy"
          element={
            <ProtectedRoute>
              <JourneyHeavy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JourneyHeavy/new"
          element={
            <ProtectedRoute>
              <NewPageJournalHeavy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JourneyHeavy/:id"
          element={
            <ProtectedRoute>
              <NewPageJournalHeavy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/JourneyLight"
          element={
            <ProtectedRoute>
              <JourneyLight />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JourneyLight/new"
          element={
            <ProtectedRoute>
              <NewPageJournalLight />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JourneyLight/:id"
          element={
            <ProtectedRoute>
              <NewPageJournalLight />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MagicHome"
          element={
            <ProtectedRoute>
              <MagicHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MagicDay"
          element={
            <ProtectedRoute>
              <MagicDay />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MagicDay/:day"
          element={
            <ProtectedRoute>
              <MagicDay />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ProgressTracker"
          element={
            <ProtectedRoute>
              <ProgressTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/therapy"
          element={
            <ProtectedRoute>
              <VisionBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        {/* optional */}
        <Route
          path="/soundtest"
          element={
            <ProtectedRoute>
              <SoundTest />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
