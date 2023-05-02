import { BrowserRouter, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";
import RankListPage from "scenes/rankListPage/RankListPage";
import Navbar from "scenes/navbar/Navbar";
import { useSelector } from "react-redux";
import { accessToken, logout } from "spotify.js";
import { useEffect, useState } from "react";
import RankListForm from "scenes/rankListPage/RankListForm";

function App() {
  //const isAuth = Boolean(useSelector(state => state.token))
  const [token, setToken] = useState(null);
  useEffect(() => {
      setToken(accessToken);
  }, []);
  return (
    <BrowserRouter>
      <Navbar token={token}/>
      {token ?
      (<Routes>
        <Route path="/"></Route>
        <Route path="/home" element={token ? <HomePage/> : <Navigate to="/"/>}></Route>
        <Route path="/profile/:userId" element={token ? <ProfilePage/> : <Navigate to="/"/>}></Route>
        <Route path="/ranklists" element={token ? <RankListPage/> : <Navigate to="/"/>}></Route>
        <Route path="/add-ranklist/:type" element={token ? <RankListForm/> : <Navigate to="/"/>}></Route>
      </Routes>) : (null)
      }
    </BrowserRouter>
  );
}

export default App;
