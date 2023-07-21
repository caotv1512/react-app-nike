import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.scss";
import axios from "axios"
import "./cart.css"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { act_status } from "action";
const Cart = ({ isLoad, setIsLoad }) => {
  useEffect(() => {
    document.title = "Basket | Nike";
  }, []);

  const [status2, setStatus2] = useState(false)
  const id = localStorage.getItem("isLogin");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([])
  const isStatus = useSelector((state) => state.status)
  const dispatch = useDispatch()
  const [shipment, setShipment] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const handleChangeShip = (e) => {
    setShipment({ ...shipment, [e.target.name]: e.target.value })
  }
  const handleOrder = () => {
    if (!shipment.name || !shipment.phone || !shipment.address) {
      setError("Please enter all shipment details.");
      return;
    }
    const updatedBill = [...users.listcart];
    const totalAmount = AmountProduct();
    const totalPrice = Total();

    axios
      .patch(`https://db-nike.onrender.com/users/${id}`, {
        bill: [
          ...users.bill,
          {
            id: uuidv4(),
            listBuy: [...updatedBill],
            totalAmount: totalAmount,
            totalPrice: totalPrice,
            shipment: shipment,
            status: "pending",
            date: new Date().toLocaleDateString()
          },
        ],
        listcart: [],
      })
      .then(() => {
        toast.success("Order successful!");
        dispatch((act_status(!isStatus)))
        setStatus2(!status2);

      })
      .catch((error) => {
        toast.error("Failed to update cart and create bill.");
        console.log(error);
      });
    dispatch((act_status(!isStatus)))
    setError('')
    setIsLoad(!isLoad)
    handleClose()
  };

  const handleDelete = (index) => {
    const updatedListCart = [...users.listcart];
    updatedListCart.splice(index, 1);

    axios
      .patch(`https://db-nike.onrender.com/users/${id}`, { listcart: updatedListCart })
      .then(() => {
        toast.success("Item removed from cart successfully!");
      })
      .catch((error) => {
        toast.error("Failed to remove item from cart.");
        console.log(error);
      });
    dispatch((act_status(!isStatus)))
    setStatus2(!status2)
    setIsLoad(!isLoad)
  };

  const handleChange = (e, index) => {
    const newCount = parseInt(e.target.value);

    if (newCount > 0) {
      const updatedListCart = users.listcart.map((item, i) => {
        if (i === index) {
          const newPrice = item.price / item.count * newCount;
          return { ...item, count: newCount, price: newPrice };
        }
        return item;
      });

      axios
        .patch(`https://db-nike.onrender.com/users/${id}`, { listcart: updatedListCart })
        .catch((error) => {
          console.log(error);
        });
      dispatch((act_status(!isStatus)))
      setStatus2(!status2)
    }
  };

  const Total = () => {
    let total = 0;
    users.listcart.forEach((item) => {
      total += Number(item.price)
    });
    return total;
  };

  const AmountProduct = () => {
    let amount = 0;
    users.listcart.forEach((item) => {
      amount += (item.count)
    })
    return amount
  }



  useEffect(() => {
    axios
      .get(`https://db-nike.onrender.com/users/${id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, status2, isStatus]);
  useEffect(() => {
    axios.get('https://db-nike.onrender.com/products/')
      .then((res) => {
        setProducts(res.data)
      }).catch((err) => { console.log(err) })
  }, [isStatus])
  if (users.id == id) {
    return (
      <div className="container flex justify-around mt-2">
        <div className="flex flex-col gap-4" style={{ width: '50%' }}>
          <span className="text-2xl">Bag</span>

          {users.listcart.length > 0 ? (
            users.listcart.map((e, index) => (
              <div style={{ display: "flex", justifyContent: "space-between" }} key={index}>
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={e.image} style={{ width: '100px' }} alt={e.title} />
                  </div>
                  <div style={{ marginLeft: '50px' }}>
                    <p>Name: {e.title}</p>
                    <p><b>Price: {e.price}$</b></p>
                    <p>Size: {e.size}</p>
                    <label style={{ fontWeight: 'bold' }}>Amount:
                      <input
                        type="number"
                        value={e.count}
                        style={{ width: '40px', marginTop: '5px', fontWeight: 'bold' }}
                        onChange={(e) => handleChange(e, index)}
                      ></input>
                    </label>
                  </div>
                </div>
                <div>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    <svg className="delete-svgIcon" viewBox="0 0 448 512">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <span>There are no items in your bag.</span>
            </div>
          )}
          <div className="mt-48">
            Want to view your favourites?
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Summary</span>
          <span style={{ fontWeight: 'bold ', fontSize: '20px', fontStyle: 'italic' }}>Subtotal : {AmountProduct()}  Product</span>
          <span>Estimated Delivery & Handling: Free</span>
          <hr />
          <span className="font-semibold" style={{ fontSize: '20px' }}>
            Total: {Total()}$<span></span>
          </span>
          <hr />
          <div className="flex flex-col buttons-cart">
            <button style={{ color: "white", backgroundColor: 'black' }} onClick={handleShow} disabled={users.listcart.length === 0}>Order</button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Shipment Details</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid black' }}>
                  <label htmlFor="name">Name
                    <br></br>
                    <input type="text" onChange={handleChangeShip} value={shipment.name} name="name" style={{ width: '470px' }}></input>
                  </label>
                </div>
                <br></br>
                <div style={{ borderBottom: '1px solid black' }}>
                  <label htmlFor="phone">Phone
                    <br></br>
                    <input type="tel" onChange={handleChangeShip} value={shipment.phone} name="phone" style={{ width: '470px' }}></input>
                  </label>
                </div>
                <br></br>
                <div style={{ borderBottom: '1px solid black' }}>
                  <label htmlFor="address">Address
                    <br></br>
                    <input type="text" onChange={handleChangeShip} value={shipment.address} name="address" style={{ width: '470px' }}></input>
                  </label>
                </div>
              </Modal.Body>
              {error && (
                <span style={{ color: 'red', marginLeft: '1em' }}>{error}</span>
              )}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleOrder(id)}>Order</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <ToastContainer />
      </div >
    );
  } else {
    return (
      <div className="container flex justify-around mt-2">
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Bag</span>
          <span>There are no items in your bag.</span>
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
          <span style={{ fontWeight: 'bold ', fontSize: '20px', fontStyle: 'italic' }}>Subtotal</span>
          <span>Estimated Delivery & Handling: Free</span>
          <hr />
          <span className="font-semibold" style={{ fontSize: '20px' }}>
            Total: <span></span>
          </span>
          <hr />
          <div className="flex flex-col buttons-cart">
            <button disabled>Order</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
