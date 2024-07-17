import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserSearch from "./components/UserSearch";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/search" element={<UserSearch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
