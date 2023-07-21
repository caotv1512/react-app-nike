import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { act_status } from "action";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isStatus = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [addproduct, setAddproduct] = useState({
    Image: "",
    New: true,
    Title: "",
    Desc: "",
    Price: "",
    Detail: [],
    size: [
      { size: "EU 40", quantity: 20 },
      { size: "EU 41", quantity: 20 },
      { size: "EU 42", quantity: 20 },
      { size: "EU 43", quantity: 20 },
      { size: "EU 44", quantity: 20 },
      { size: "EU 45", quantity: 20 },
      { size: "EU 46", quantity: 20 },
      { size: "EU 47", quantity: 20 },
    ],
  });
  const handleNavigate = () => {
    navigate(-1);
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://db-nike.onrender.com/products/${id}`)
      .then((res) => {
        toast.success("Product deleted successfully");
        dispatch(act_status(!isStatus));
      })
      .catch((err) => {
        console.error("Failed to delete product:", err);
      });
  };
  const handleAddInfoProduct = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("Detail")) {
      const index = Number(name.replace("Detail", "")) - 1;
      const updatedDetail = [...addproduct.Detail];
      updatedDetail[index] = value;
      setAddproduct({ ...addproduct, Detail: updatedDetail });
    } else {
      setAddproduct({ ...addproduct, [name]: value });
    }
  };
  const handleAddProduct = () => {
    axios
      .get("https://db-nike.onrender.com/products")
      .then((res) => {
        const existingData = res.data;
        const newData = { ...existingData, ...addproduct };
        return axios.post("https://db-nike.onrender.com/products", newData);
      })
      .then((res) => {
        console.log("Product add successfully");
        setAddproduct({
          Image: "",
          New: true,
          Title: "",
          Desc: "",
          Price: "",
          Detail: [],
          size: [
            "EU 40",
            "EU 41",
            "EU 42",
            "EU 43",
            "EU 44",
            "EU 45",
            "EU 46",
            "EU 47",
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditId = (id) => {
    axios
      .get(`https://db-nike.onrender.com/products/${id}`)
      .then((res) => setAddproduct(res.data));
  };
  const handleSave = (id) => {
    axios
      .patch(`https://db-nike.onrender.com/products/${id}`, addproduct)
      .then((res) => {
        toast.success("Product saved successfully");
        setAddproduct({
          Image: "",
          New: true,
          Title: "",
          Desc: "",
          Price: "",
          Color: "",
          Detail: [],
          size: [
            "EU 40",
            "EU 41",
            "EU 42",
            "EU 43",
            "EU 44",
            "EU 45",
            "EU 46",
            "EU 47",
          ],
        });
      })
      .catch((err) => {
        console.error("Failed to save product:", err);
      });
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get("https://db-nike.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [addproduct, isStatus]);
  return (
    <div>
      <Button variant="dark" onClick={handleNavigate}>
        Go to back
      </Button>
      <>
        <Button
          variant="outline-primary"
          style={{ marginLeft: "50%", marginTop: "2em", marginBottom: "2em" }}
          onClick={handleShow}
        >
          Add Product
        </Button>
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: "flex" }}>
              <div>
                <label>Image:</label>
                <br />
                <input
                  type="text"
                  style={{ border: "1px solid black", width: "30em" }}
                  onChange={handleAddInfoProduct}
                  name="Image"
                  value={addproduct.Image}
                />
                <br />
                <label>Title:</label>
                <br />
                <input
                  type="text"
                  style={{ border: "1px solid black", width: "30em" }}
                  onChange={handleAddInfoProduct}
                  name="Title"
                  value={addproduct.Title}
                />
                <br />
                <label>Desc:</label>
                <br />
                <input
                  type="text"
                  style={{ border: "1px solid black", width: "30em" }}
                  onChange={handleAddInfoProduct}
                  name="Desc"
                  value={addproduct.Desc}
                />
                <br />
                <label>Price:</label>
                <br />
                <input
                  type="text"
                  style={{ border: "1px solid black", width: "30em" }}
                  onChange={handleAddInfoProduct}
                  name="Price"
                  value={addproduct.Price}
                />
                <br />
                <label>Color:</label>
                <input
                  type="text"
                  style={{ border: "1px solid black", width: "30em" }}
                  onChange={handleAddInfoProduct}
                  name="Color"
                  value={addproduct.Color}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label>
                  Detail: "Image"
                  <br />
                  {[...Array(8)].map((_, index) => (
                    <label key={index} style={{ marginBottom: "15px" }}>
                      Detail {index + 1}:
                      <input
                        type="text"
                        style={{ border: "1px solid black", width: "30em" }}
                        onChange={handleAddInfoProduct}
                        name={`Detail${index + 1}`}
                        value={addproduct.Detail[index] || ""}
                      />
                    </label>
                  ))}
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Table striped bordered hover>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Color</th>
            <th style={{ width: "300px" }}>Detail</th>
            <th>Desc</th>
            <th style={{ width: "200px" }}>Sche</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product, index) => (
            <tr style={{ textAlign: "center" }} key={index}>
              <td>{product.id}</td>
              <td>{product.Title}</td>
              <td style={{ width: "80px" }}>
                {product.Image && <img src={product.Image} alt="" />}
              </td>
              <td>{product.Price}$</td>
              <td>{product.Color}</td>
              <td style={{ display: "flex", flexWrap: "wrap" }}>
                {product.Detail &&
                  product.Detail.map((detail, index) => (
                    <img
                      key={index}
                      src={detail}
                      alt=""
                      style={{ width: "50px" }}
                    />
                  ))}
              </td>
              <td>{product.Desc}</td>
              <td style={{ display: "flex", flexWrap: "wrap" }}>
                {product.sche &&
                  product.sche.map(
                    (Sche, index) =>
                      Sche && (
                        <img
                          key={index}
                          src={Sche.src}
                          alt=""
                          style={{ width: "50px" }}
                        />
                      )
                  )}
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditId(product.id)}
                >
                  Edit
                </button>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-xl" style={{ zIndex: "100" }}>
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Edit Product
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div style={{ display: "flex" }}>
                          <div>
                            <label>Image:</label>
                            <br />
                            <input
                              type="text"
                              style={{
                                border: "1px solid black",
                                width: "30em",
                              }}
                              onChange={handleAddInfoProduct}
                              name="Image"
                              value={addproduct.Image}
                            />
                            <br />
                            <label>Title:</label>
                            <br />
                            <input
                              type="text"
                              style={{
                                border: "1px solid black",
                                width: "30em",
                              }}
                              onChange={handleAddInfoProduct}
                              name="Title"
                              value={addproduct.Title}
                            />
                            <br />
                            <label>Desc:</label>
                            <br />
                            <input
                              type="text"
                              style={{
                                border: "1px solid black",
                                width: "30em",
                              }}
                              onChange={handleAddInfoProduct}
                              name="Desc"
                              value={addproduct.Desc}
                            />
                            <br />
                            <label>Price:</label>
                            <br />
                            <input
                              type="text"
                              style={{
                                border: "1px solid black",
                                width: "30em",
                              }}
                              onChange={handleAddInfoProduct}
                              name="Price"
                              value={addproduct.Price}
                            />
                            <br />
                            <label>Color:</label>
                            <input
                              type="text"
                              style={{
                                border: "1px solid black",
                                width: "30em",
                              }}
                              onChange={handleAddInfoProduct}
                              name="Color"
                              value={addproduct.Color}
                            />
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            <label>
                              Detail: "Image"
                              <br />
                              {[...Array(8)].map((_, index) => (
                                <label
                                  key={index}
                                  style={{ marginBottom: "15px" }}
                                >
                                  Detail {index + 1}:
                                  <input
                                    type="text"
                                    style={{
                                      border: "1px solid black",
                                      width: "30em",
                                    }}
                                    onChange={handleAddInfoProduct}
                                    name={`Detail${index + 1}`}
                                    value={addproduct.Detail[index] || ""}
                                  />
                                </label>
                              ))}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => handleSave(addproduct.id)}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
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
      </Table>
    </div>
  );
}

export default Shop;
