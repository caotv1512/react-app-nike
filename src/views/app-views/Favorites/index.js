import React, { useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Favorites = ({ isLoad, setIsLoad }) => {
  const [status, setStatus] = useState(false)
  const id = localStorage.getItem("isLogin")
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/products/${id}`)
  }
  const handleDelete = (index) => {
    const updatedListCart = [...users.favourites];
    updatedListCart.splice(index, 1);

    axios.patch(`https://db-nike.onrender.com/users/${id}`, { favourites: updatedListCart })
      .then(() => {
        toast.success("Item removed from cart successfully!");
      })
      .catch((error) => {
        toast.error("Failed to remove item from cart.");
        console.log(error);
      });
    setStatus(!status)
    setIsLoad(!isLoad)
  };
  useEffect(() => {
    axios.get(`https://db-nike.onrender.com/users/${id}`).then((response) => {
      setUsers(response.data);
    });
  }, [status]);

  console.log(users)
  useEffect(() => {
    document.title = "Favorites | Nike";
  }, []);
  return (
    <div className="mt-4">
      <h1 className="text-xl">Favorites</h1>
      {users.id == id ? (
        <div className="flex flex-col gap-4" style={{ width: '100%' }}>
          {users.favourites.length > 0 ? (
            users.favourites.map((e, index) => (
              <div style={{ display: "flex", justifyContent: "space-between" }} key={index}>
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={e.image} style={{ width: '100px' }} alt={e.title} onClick={() => handleClick(e.id)}></img>
                  </div>
                  <div style={{ marginLeft: '50px' }}>
                    <p>Name: {e.title}</p>
                    <p><b>Price: {e.price}$</b></p>
                    <p>Size: {e.size}</p>
                    <label>Amount:
                      <input
                        type="number"
                        value={e.count}
                        style={{ width: '40px', marginTop: '5px' }}
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
            <div className="flex text-center justify-center mt-10 text-xl">
              Items added to favorites will be saved here.
            </div>
          )}
        </div>
      ) : (
        <div className="flex text-center justify-center mt-10 text-xl">
          Please sign in to view your favorites.
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  )
};

export default Favorites;
