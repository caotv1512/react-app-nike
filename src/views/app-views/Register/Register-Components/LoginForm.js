import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { act_login } from "action";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
const LoginForm = ({ setOturumAc, isLoad, setIsLoad }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login. Nike UK";
  }, []);

  const handleChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://db-nike.onrender.com/users");
      const users = response.data;
      const user = users.find(
        (u) => u.email === login.email && u.password === login.password
      );

      if (user) {
        if (user.block === true) {
          setError("Account is locked");
          return;
        }

        const userId = user.id;
        localStorage.setItem("isLogin", userId);

        axios.patch(`https://db-nike.onrender.com/users/${userId}`, { isLogin: true });

        dispatch(act_login(userId));

        setError("");

        toast.success("Logged in successfully!");

        setTimeout(() => {
          setLogin({});
          window.location.href = "/home";
        }, 1000);
      } else {
        setError("Email or password is invalid");
      }
    } catch (error) {
      console.log(error);
      setIsLoad(!isLoad);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="nike-unite-swoosh">
        <img
          src="https://s3.nikecdn.com/unite/app/912/images/swoosh_black.png"
          alt="nike"
        />
      </div>
      <div className="header-text">
        <span>
          Nike
        </span>
      </div>
      <form>
        <div className="login-panel-form">
          <input required placeholder="Email" type="text" name="email" onChange={handleChange} />
          <input required placeholder="Password" type="password" name="password" onChange={handleChange} />
          <button className="login-panel-button" onClick={handleLogin}>Sign in</button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <span className="text-center mt-4 text-xs">
            Not a Member?{" "}
            <Link to="/register">
              <span
                className="underline cursor-pointer"
                onClick={() => setOturumAc(true)}
              >
                Join Us
              </span>
            </Link>
          </span>
        </div>
      </form>
      <div className="flex flex-col justify-center text-center items-center">
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
