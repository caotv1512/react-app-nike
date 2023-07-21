import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopHeader.scss";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { act_logout } from "action";
const TopHeader = () => {
  const isStatus = useSelector((state) => state.status)
  const isLogin = useSelector((state) => state.exampleReducer.isLogin);
  const id = localStorage.getItem("isLogin");
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://db-nike.onrender.com/users").then((response) => {
      setUsers(response.data);
    });
  }, [isLogin, isStatus]);

  useEffect(() => {
    // Kiểm tra nếu user bị block, tự động logout
    if (currentUser && currentUser.block) {
      handleLogout();
    }
  }, [currentUser]);


  const handleLogout = () => {
    dispatch(act_logout());
    localStorage.removeItem("isLogin");
    axios.patch(`https://db-nike.onrender.com/users/${id}`, { isLogin: false });
    window.location.href = "/home";
  };

  useEffect(() => {
    if (users.length > 0) {
      const findUser = users.find((user) => user.id == localStorage.getItem("isLogin"));
      setCurrentUser(findUser);
    }
  }, [users]);


  return (

    <div className="header-top justify-between flex">
      <Link to="/jordan">
        <div className="svg-top">
          <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
            <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z"></path>
          </svg>
        </div>
      </Link>
      <div className="">
        {currentUser ? (
          <nav>
            <ul>
              <Link to="/help">
                {" "}
                <li>Help</li>
              </Link>
              <li className="separator-top-menu">|</li>
              <Link to="/bill">
                <li>{currentUser.firstname} {currentUser.lastname}</li>
              </Link>
              <li className="separator-top-menu">|</li>
              <li onClick={handleLogout}>
                <button class="Btn">
                  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                  <div class="text">Logout</div>
                </button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <Link to="/help">
                <li>Help</li>
              </Link>
              <li className="separator-top-menu">|</li>
              <Link to="/register">
                <li>Join Us</li>
              </Link>
              <li className="separator-top-menu">|</li>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}


export default TopHeader;
