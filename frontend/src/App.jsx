import "./App.css";
import Home from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import IndividualListingComp from "./components/IndividualListingComp";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserProfileComp from "./components/UserProfileComp";
function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/listing/:id"
            element={<IndividualListingComp />}
          ></Route>
          <Route path="/register" element={<UserRegistrationPage />}></Route>
          <Route path="/login" element={<UserLoginPage />}></Route>
          <Route path="/user-profile" element={<UserProfileComp />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
