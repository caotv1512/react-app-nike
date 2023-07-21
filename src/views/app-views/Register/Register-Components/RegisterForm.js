import React, { useState } from "react";
import SelectCountries from "../../LoginModal/LoginModal-Components/SelectCountries";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
const RegisterForm = ({ setOturumAc }) => {
  const [Gender, setGender] = useState(undefined);
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    lastname: "",
    firstname: "",
    birth: "",
  });
  const handleRegister = (e) => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString();
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      date: currentDateString,
      gender: Gender,
      block: false,
      isLogin: false,
      listcart: [],
      favourites: [],
      bill: [],
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.get("https://db-nike.onrender.com/users");
        const users = response.data;
        const existingUser = users.find((u) => u.email === user.email);
        if (existingUser) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already exists",
          }));
        } else {
          axios.post("https://db-nike.onrender.com/users", user);
          toast.success("Registration successful!");
          setTimeout(() => {
            setUser({});
            setGender(undefined);
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }

  };
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (!user.email) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else {
      const emailPattern = /^[^\s@]{6,}@gmail\.com$/;
      if (!emailPattern.test(user.email)) {
        formIsValid = false;
        errors["email"] = "Invalid email address. Only gmail.com addresses are allowed.";
      }
    }
    const passwordPattern = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()-_+=]{7,}$/;
    if (!user.password) {
      formIsValid = false;
      errors["password"] = "Password is required";
    } else if (!passwordPattern.test(user.password)) {
      formIsValid = false;
      errors["password"] =
        "Password must be at least 8 characters long and start with a letter";
    }
    if (!user.lastname) {
      formIsValid = false;
      errors["lastname"] = "Last name is required";
    }
    else if (user.lastname.length < 2) {
      formIsValid = false;
      errors["lastname"] = "Last name must be at least 2 characters";
    }

    if (!user.firstname) {
      formIsValid = false;
      errors["firstname"] = "First name is required";
    }
    else if (user.firstname.length < 2) {
      formIsValid = false;
      errors["firstname"] = "Frist name must be at least 2 characters";
    }
    const today = new Date();
    const minAge = 16;

    const birthDate = new Date(user.birth);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (
      !user.birth ||
      isNaN(birthDate.getTime()) ||
      age < minAge ||
      (age === minAge && today.getMonth() < birthDate.getMonth()) ||
      (age === minAge && today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      formIsValid = false;
      errors["birth"] = `You must be at least ${minAge} years old`;
    }
    setErrors(errors);
    return formIsValid;
  };
  console.log(errors);

  return (
    <div className="flex flex-col justify-center text-center items-center">
      <div className="nike-unite-swoosh">
        <img
          src="https://s3.nikecdn.com/unite/app/912/images/swoosh_black.png"
          alt="nike"
        />
      </div>
      <div className="header-text">
        <span>Nike</span>
      </div>
      <form>
        <div className="register-panel-form">
          <input
            required
            placeholder="Email"
            type="text"
            onChange={handleRegister}
            name="email"
          />
          <span className="text-red-500 text-sm">{errors["email"]}</span>

          <input
            required
            placeholder="Password"
            type="password"
            onChange={handleRegister}
            name="password"
          />
          <span className="text-red-500 text-sm">{errors["password"]}</span>

          <input
            required
            placeholder="Tên"
            type="text"
            onChange={handleRegister}
            name="lastname"
          />
          <span className="text-red-500 text-sm">{errors["lastname"]}</span>

          <input
            required
            placeholder="Họ"
            type="text"
            onChange={handleRegister}
            name="firstname"
          />
          <span className="text-red-500 text-sm">{errors["firstname"]}</span>

          <input
            required
            placeholder="gg/aa/yy"
            type="date"
            onChange={handleRegister}
            name="birth"
          />
          <span className="text-red-500 text-sm">{errors["birth"]}</span>
          <SelectCountries />
          <div className="flex gap-4 justify-center mt-4 items-center">
            {Gender}
            <button
              type="button"
              onClick={() => setGender(false)}
              className={`${Gender ? "" : "border-black"
                } border rounded-md py-2 w-full text-sm px-6`}
            >
              <i
                className={`${Gender ? "hidden" : "visible"} fa-solid fa-check`}
              ></i>{" "}
              Male
            </button>{" "}
            <button
              type="button"
              onClick={() => setGender(true)}
              className={`${Gender ? "border-black" : ""
                } border rounded-md py-2 text-sm w-full px-6`}
            >
              <i
                className={`${Gender ? "visible" : "hidden"} fa-solid fa-check`}
              ></i>{" "}
              Female
            </button>
          </div>
          <button className="register-panel-button" onClick={handleClick}>Join Us</button>
          <span className="text-xs text-center mt-4">
            Already a Member?
            <Link to="/login">
              <span
                onClick={() => setOturumAc(false)}
                className="underline cursor-pointer"
              >
                Sign in
              </span>{" "}</Link>

          </span>
        </div>
      </form>
      <div className="flex flex-col justify-center text-center items-center">
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterForm;
