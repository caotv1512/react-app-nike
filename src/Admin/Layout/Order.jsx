import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { act_status } from "action";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const isStatus = useSelector((state) => state.status);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("https://db-nike.onrender.com/users").then((res) => setUsers(res.data));
  }, [isStatus]);

  if (!users) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }
  const handleNavigate = () => {
    navigate(-1);
  };
  const handleDelete = (id, user) => {
    const filteredBill = [...user.bill].filter((isBill) => isBill.id !== id);
    axios.patch(`https://db-nike.onrender.com/users/${user.id}`, {
      bill: filteredBill,
    });
    dispatch(act_status(!isStatus));
  };

  const handleDeli = (userID, billID) => {
    axios.get(`https://db-nike.onrender.com/users/${userID}`).then((res) => {
      const filteredBill = res.data.bill.filter((bill) => bill.id === billID);
      if (filteredBill.length > 0) {
        let updatedStatus = "";
        const currentStatus = filteredBill[0].status;

        if (currentStatus === "pending") {
          updatedStatus = "delivery";
        } else if (currentStatus === "delivery") {
          updatedStatus = "accept";
        }

        if (updatedStatus !== "") {
          const updatedBill = { ...filteredBill[0], status: updatedStatus };
          axios
            .patch(`https://db-nike.onrender.com/users/${userID}`, {
              bill: res.data.bill.map((bill) =>
                bill.id === billID ? updatedBill : bill
              ),
            })
            .then((response) => {
              dispatch(act_status(!isStatus));
              toast.success("Order confirmation successful");
            })
            .catch((error) => {
              console.log("Error updating status:", error);
            });
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Button variant="light" onClick={handleNavigate}>
        Go to back
      </Button>
      <h1>Recent Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>BILL ID</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <React.Fragment key={user.id}>
              {user.bill.map((bill) => (
                <tr key={bill.id}>
                  <td>{user.email}</td>
                  <td>{bill.date}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{bill.id.slice(5, 8)}</span>

                    <div
                      class="modal fade"
                      id="exampleModalToggle"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel"
                      tabindex="-1"
                    >
                      <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5"
                              id="exampleModalToggleLabel"
                            >
                              BILL ID : {bill.id}
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <Table striped bordered>
                              <thead>
                                <tr>
                                  <th>STT</th>
                                  <th>ID Product</th>
                                  <th>Name Product</th>
                                  <th>Image Product</th>
                                  <th>Size</th>
                                  <th>Version number</th>
                                  <th>Classify</th>
                                  <th>Price</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bill.listBuy.map((listbuy, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{listbuy.id}</td>
                                    <td>{listbuy.title}</td>
                                    <td style={{ width: "100px" }}>
                                      <img src={listbuy.image}></img>
                                    </td>
                                    <td>{listbuy.size}</td>
                                    <td>{listbuy.color}</td>
                                    <td>{listbuy.desc}</td>
                                    <td>{listbuy.price}$</td>
                                    <td>{listbuy.count}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                          <div class="modal-footer"></div>
                        </div>
                      </div>
                    </div>
                    <button
                      class="btn btn-dark"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                    >
                      <i class="bi bi-ticket-detailed"></i>
                    </button>
                  </td>
                  <td>
                    {bill.shipment.name}
                    <br />
                    {bill.shipment.phone}
                    <br />
                    {bill.shipment.address}
                  </td>
                  <td>
                    {user.paymentMethod}
                    {bill.status === "accept" ? (
                      <Button variant="success">True</Button>
                    ) : (
                      <Button variant="warning">False</Button>
                    )}
                  </td>
                  <td>{bill.totalPrice}$</td>
                  <td>
                    {bill.status === "pending" && (
                      <Button
                        variant="primary"
                        onClick={() => handleDeli(user.id, bill.id)}
                      >
                        Pending
                      </Button>
                    )}
                    {bill.status === "delivery" && (
                      <Button
                        variant="warning"
                        onClick={() => handleDeli(user.id, bill.id)}
                      >
                        Delivery
                      </Button>
                    )}
                    {bill.status === "accept" && (
                      <Button variant="success">Accept</Button>
                    )}
                    {bill.status !== "accept" && (
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(bill.id, user)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: pageNumbers }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <ToastContainer />
    </div>
  );
}

export default Order;
