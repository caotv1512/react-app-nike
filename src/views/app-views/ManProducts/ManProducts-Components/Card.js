import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ options }) => {
  const searchProduct = useSelector((state) => state.search)
  console.log(searchProduct)
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/products/${id}`)
  }
  return (
    <>
      {searchProduct && searchProduct.length > 0 ? (
        searchProduct.sort((a, b) => a.Price - b.Price).map((e) => (
          <div className="cursor-pointer" key={e.id}>
            <img
              className="mb-2"
              src={e.Image}
              alt={e.Title}
              onClick={() => handleClick(e.id)}
            />
            <div className="flex flex-col">
              {e.New && <span className="text-orange-500">New</span>}
              <span>{e.Title}</span>
              <span className="text-gray-400">{e.Desc}</span>
              <span className="text-gray-400">{e.Color}</span>
              <span className="mt-2">${e.Price}</span>
            </div>
          </div>
        ))
      ) : (
        options.sort((a, b) => a.Price - b.Price).map((e) => (
          <div className="cursor-pointer" key={e.id}>
            <img
              className="mb-2"
              src={e.Image}
              alt={e.Title}
              onClick={() => handleClick(e.id)}
            />
            <div className="flex flex-col">
              {e.New && <span className="text-orange-500">New</span>}
              <span>{e.Title}</span>
              <span className="text-gray-400">{e.Desc}</span>
              <span className="text-gray-400">{e.Color}</span>
              <span className="mt-2">${e.Price}</span>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Card;
