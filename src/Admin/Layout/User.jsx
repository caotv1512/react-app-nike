import * as React from "react";
import Button from "react-bootstrap/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { act_status } from "action";

export default function Orders() {
  const [users, setUsers] = useState([]);
  const isStatus = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const handleBlock = (id, block) => {
    axios.patch(`https://db-nike.onrender.com/users/${id}`, {
      block: !block,
    });
    dispatch(act_status(!isStatus));
  };

  useEffect(() => {
    axios.get("https://db-nike.onrender.com/users").then((res) => setUsers(res.data));
  }, [isStatus]);
  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Recent Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Number of orders</TableCell>
            <TableCell>Successful orders</TableCell>
            <TableCell align="right">Total amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.date}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.bill.length}</TableCell>
              <TableCell>
                {user.bill.filter((billS) => billS.status === "accept").length}
              </TableCell>
              <TableCell align="right">
                {user.bill
                  .filter((bill) => bill.status === "accept")
                  .reduce((total, bill) => total + bill.totalPrice, 0)}
                $
              </TableCell>
              <TableCell
                align="right"
                onClick={() => handleBlock(user.id, user.block)}
              >
                {user.block ? <button>Lock</button> : <button>Unlock</button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
