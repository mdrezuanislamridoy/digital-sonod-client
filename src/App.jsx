import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import authUser from "./state/userState";
import { useEffect, useState } from "react";
import ForgetPass from "./components/auth/ForgetPass";
import Loading from "./components/design/Loading";
import Signup from "./components/auth/Signup";
import Main from "./pages/home/Main";
import NavBar from "./components/layout/NavBar";
import Admin from "./pages/profile/admin/Admin";
import User from "./pages/profile/user/User";
import Chairman from "./pages/profile/chairman/Chairman";
import ChooseSonod from "./pages/sonod/ChoseSonod";
import NagorikSonod from "./pages/sonod/section/NagorikSonod";

export default function App() {
  const { profile, user, logout } = authUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      await profile();
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-200">
      <BrowserRouter>
        {<NavBar user={user} logout={logout} />}
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <Signup />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          ></Route>
          <Route path="/forgetPass" element={<ForgetPass />} />
          <Route path="/" element={<Main />} />

          <>
            <Route
              path="/profile"
              element={
                user ? (
                  user.role === "admin" ? (
                    <Admin />
                  ) : user.role === "user" ? (
                    <User />
                  ) : (
                    <Chairman />
                  )
                ) : (
                  <Navigate to={"/"} />
                )
              }
            ></Route>
            <Route path="/choose-sonod" element={<ChooseSonod />}></Route>
            <Route
              path="/choose-sonod/nagorikSonod"
              element={<NagorikSonod />}
            />
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
