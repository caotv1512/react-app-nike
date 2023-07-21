import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Deposits() {
  const [users, setUsers] = useState([]);
  const isStatus = useSelector((state) => state.status);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/admin/user");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://db-nike.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [isStatus]);
  const totalAmount = users.reduce((total, user) => {
    const userTotal = user.bill.reduce((subtotal, bill) => {
      return subtotal + bill.totalPrice;
    }, 0);
    return total + userTotal;
  }, 0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {totalAmount}$
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {currentDate.toString()}
      </Typography>
      <div>
        <Link to="/user" color="primary" onClick={handleNavigate}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
