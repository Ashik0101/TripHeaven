import "./App.css";
import Home from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";

import UserRegistrationPage from "./pages/UserRegistrationPage";
function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<UserRegistrationPage />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
