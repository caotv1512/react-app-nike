import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./bill.scss";
import axios from "axios"
import "./bill.css"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';

const Bill = () => {
  useEffect(() => {
    document.title = "Bill | Nike";
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const id = localStorage.getItem("isLogin")
  const [editedShipment, setEditedShipment] = useState({});
  useEffect(() => {
    axios.get(`https://db-nike.onrender.com/users/${id}`).then((response) => {
      setUsers(response.data)
    });
  }, [isEditing]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedShipment((prevShipment) => ({
      ...prevShipment,
      [name]: value,
    }));
  };
  const handleEdit = (billId) => {
    const bill = users.bill.find((e) => e.id === billId);
    setEditedShipment(bill.shipment);
    setIsEditing(true);
  };
  const handleSave = (billId) => {
    axios
      .patch(`https://db-nike.onrender.com/users/${id}`, {
        bill: users.bill.map((bill) =>
          bill.id === billId ? { ...bill, shipment: editedShipment } : bill
        )
      }
      )
      .then(() => {
        setIsEditing(false);
        toast.success("Changes saved successfully!");
      })
      .catch((error) => {
        toast.error("Failed to save changes.");
        console.log(error);
      });
  };
  if (users.id == id) {
    return (
      <div className="container mt-2">
        <div className="flex flex-col gap-4" style={{ width: '100%' }}>
          <span className="text-3xl">Total Bill: {users.bill.length}</span>
          <br />
          {users.bill.length > 0 ? (
            users.bill.map((e) => (
              <div key={e.id}>
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border p-2">
                        Bill ID :{e.id.slice(5, 8)}
                      </th>
                      <th className="border p-2" style={{ display: 'flex', justifyContent: 'space-between' }}>Order Information
                        {e.status == "pending" ? (
                          <>{isEditing ? (
                            <Button variant="outline-warning" onClick={() => handleSave(e.id)}>
                              Save
                            </Button>
                          ) : (
                            <Button variant="outline-primary" onClick={() => handleEdit(e.id)}>
                              Edit
                            </Button>
                          )}</>
                        ) : (<div></div>)}

                      </th>
                      <th className="border p-2">Product Details</th>
                      <th className="border p-2">Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">
                        <br></br>
                        Order date: {e.date}
                        <br></br>
                        Status:{e.status}</td>
                      {isEditing ? (
                        <td className="border p-2">

                          <div>
                            <label className="margin">Name:</label>
                            <input className="fontsize" type="text" value={editedShipment.name} style={{ borderBottom: '1px solid black' }} name="name" onChange={handleChange}></input>
                          </div>
                          <div>
                            <label className="margin">Phone:</label>
                            <input className="fontsize" type="tel" value={editedShipment.phone} style={{ borderBottom: '1px solid black' }} name="phone" onChange={handleChange}></input>
                          </div>
                          <div>
                            <label className="margin">Address:</label>
                            <input className="fontsize" type="text" value={editedShipment.address} name="address" onChange={handleChange}></input>
                          </div>
                        </td>
                      ) : (
                        <td className="border p-2">
                          <div>
                            <label className="margin">Name:</label>
                            <input className="fontsize" type="text" value={e.shipment.name} style={{ borderBottom: '1px solid black' }} name="name" ></input>
                          </div>
                          <div>
                            <label className="margin">Phone:</label>
                            <input className="fontsize" type="tel" value={e.shipment.phone} style={{ borderBottom: '1px solid black' }} name="phone" ></input>
                          </div>
                          <div>
                            <label className="margin">Address:</label>
                            <input className="fontsize" type="text" value={e.shipment.address} name="address"></input>
                          </div>
                        </td>)}
                      <td className="border p-2">
                        {e.listBuy.map((bill) => (
                          <div key={bill.id}>
                            <div className="flex">
                              <img src={bill.image} style={{ width: '100px' }} alt={bill.title} />
                            </div>
                            <div style={{ marginLeft: '1em' }}>
                              <p>Name: {bill.title}</p>
                              <p><b>Price: {bill.price}$</b></p>
                              <p>Size: {bill.size}</p>
                              <label>Amount:
                                <input
                                  type="number"
                                  value={bill.count}
                                  style={{ width: '40px', marginTop: '5px' }}
                                ></input>
                              </label>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td className="border p-2 summary-column">
                        <p className="text-2xl">Summary</p>
                        <i><b><span>Subtotal: {e.totalAmount} Product</span></b></i>
                        <p>Estimated Delivery & Handling: Free</p>
                        <hr />
                        <span className="font-semibold">
                          Total: {e.totalPrice}$
                        </span>
                        <hr />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <div>
              <span>No bills.</span>
            </div>
          )}
        </div>
        <ToastContainer />
      </div >
    );
  } else {
    return (
      <div className="container mt-2">
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Bill</span>
          <span>No Bills</span>
          <div className="mt-48">
            Want to view your favourites?
            <Link to="/register">
              <span className="underline opacity-70">Join Us</span>
            </Link>{" "}
            or{" "}
            <Link to="/login">
              <span className="underline opacity-70">Sign in</span>{" "}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Summary</span>
          <span>Subtotal</span>
          <span>Estimated Delivery & Handling: Free</span>
          <hr />
          <span className="font-semibold">
            Total: <span></span>
          </span>
          <hr />
        </div>
      </div>
    );
  }
}

export default Bill;
