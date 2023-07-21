import React, { useEffect, useState } from "react";
import "./Detail.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Detail({ isLoad, setIsLoad }) {
  const [detail, setDetail] = useState([]);
  const [listimg, setListimg] = useState([]);
  const [scheimg, setScheimg] = useState([]);
  const [imgChange, setImgChange] = useState("");
  const [size, setSize] = useState([]);
  const [bag, setBag] = useState({});
  const [sizeShoes, setSizeShoes] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectColor, setSelectColor] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  const id = localStorage.getItem("isLogin");
  const handleChangeImg = (idx) => {
    setSelectedItem(idx);
    setImgChange(detail[idx]);
  };
  const handleNavigate = (id, index) => {
    setSelectColor(index);
    navigate(`/products/${id}`);
    setImgChange("");
    setSelectedItem(0);
  };

  const handleSize = (e) => {
    setSizeShoes(e);
  };

  const handleAddtobag = (shoe) => {
    if (
      shoe.id &&
      shoe.Title &&
      shoe.Image &&
      sizeShoes &&
      shoe.Color &&
      shoe.Desc
    ) {
      const updatedBag = {
        ...bag,
        id: shoe.id,
        title: shoe.Title,
        image: shoe.Image,
        size: sizeShoes,
        color: shoe.Color,
        desc: shoe.Desc,
        price: shoe.Price,
        count: 1,
      };

      axios
        .get(`https://db-nike.onrender.com/users/${id}`)
        .then((response) => {
          const userData = response.data;
          const existingItem = userData.listcart.find(
            (item) => item.id === updatedBag.id && item.size === updatedBag.size
          );

          if (existingItem) {
            existingItem.count += 1;
            existingItem.price = existingItem.price * existingItem.count;
          } else {
            userData.listcart.push(updatedBag);
          }

          axios
            .patch(`https://db-nike.onrender.com/users/${id}`, {
              listcart: userData.listcart,
            })
            .then(() => {
              setIsLoad(!isLoad);
              toast.success("Added to bag successfully!");
            })
            .catch((error) => {
              toast.error("Failed to update user data.");
              console.log(error);
            });
        })
        .catch((error) => {
          toast.error("Failed to fetch user data.");
          console.log(error);
        });
      setSizeShoes("");
    }
  };

  const handleAddtofav = (shoe) => {
    if (
      shoe.id &&
      shoe.Title &&
      shoe.Image &&
      sizeShoes &&
      shoe.Color &&
      shoe.Desc &&
      shoe.Price
    ) {
      const updatedBag = {
        ...bag,
        id: shoe.id,
        title: shoe.Title,
        image: shoe.Image,
        size: sizeShoes,
        color: shoe.Color,
        desc: shoe.Desc,
        price: shoe.Price,
        count: 1,
      };

      axios
        .get(`https://db-nike.onrender.com/users/${id}`)
        .then((response) => {
          const userData = response.data;
          const existingItem = userData.favourites.find(
            (item) => item.id === updatedBag.id && item.size === updatedBag.size
          );

          if (existingItem) {
            existingItem.count += 1;
          } else {
            userData.favourites.push(updatedBag);
          }

          axios
            .patch(`https://db-nike.onrender.com/users/${id}`, {
              favourites: userData.favourites,
            })
            .then(() => {
              setIsLoad(!isLoad);
              toast.success("Added to Favourite successfully!");
            })
            .catch((error) => {
              toast.error("Failed to update user data.");
              console.log(error);
            });
        })
        .catch((error) => {
          toast.error("Failed to fetch user data.");
          console.log(error);
        });
      setSizeShoes("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://db-nike.onrender.com/products/${param.id}`
        );
        const data = response.data;
        setListimg(data);
        setDetail(data.Detail);
        setScheimg(data.sche);
        setSize(data.size);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [param.id, sizeShoes]);
  return (
    <div>
      <div className="detail">
        {detail.map((e, index) => (
          <div
            className={`item-1 ${selectedItem === index ? "active-img" : ""}`}
            key={index}
          >
            <img src={e} onClick={() => handleChangeImg(index)}></img>
          </div>
        ))}
        {imgChange == "" ? (
          <div className="item-2">
            <img src={listimg.Image}></img>
          </div>
        ) : (
          <div className="item-2">
            <img src={imgChange}></img>
          </div>
        )}

        <div className="item-3">
          <h2 style={{ fontSize: "30px" }}>{listimg.Title}</h2>
          <p>
            <b>{listimg.Desc}</b>
          </p>
          <p>
            <b>{listimg.Price}$</b>
          </p>
          {listimg.sche ? (
            <div className="image-item2">
              {scheimg.map((e, index) => (
                <img
                  key={index}
                  onClick={() => handleNavigate(e.id, index)}
                  className={`img-item2 ${
                    selectColor === index ? "active-img" : ""
                  }`}
                  src={e.src}
                  alt=""
                />
              ))}
            </div>
          ) : (
            <div style={{ marginTop: "3rem" }}></div>
          )}
          <div className="select-size" style={{ marginTop: "20px" }}>
            <h3>Select Size</h3>
            {size.map((sizeItem, index) => (
              <button
                key={index}
                className={`btn-size ${
                  sizeShoes === sizeItem.size ? "active" : ""
                }`}
                onClick={() => handleSize(sizeItem.size)}
              >
                {sizeItem.size}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "10px" }}>
            <button className="btn-bag" onClick={() => handleAddtobag(listimg)}>
              Add to Bag
            </button>
            <button className="btn-fav" onClick={() => handleAddtofav(listimg)}>
              Favourite{" "}
            </button>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
}

export default Detail;
