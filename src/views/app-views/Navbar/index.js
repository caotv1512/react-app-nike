import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Navbar-Components/Menu";
import "./navbar.scss";
import { Avatar, Badge } from 'antd';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { act_search } from "action";
const Navbar = ({ isLoad, setIsLoad }) => {
  const isStatus = useSelector((state) => state.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');
  const [product, setProduct] = useState([])
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      axios.get(`https://db-nike.onrender.com/products?Title_like=${searchValue}`)
        .then((response) => {
          dispatch(act_search(response.data));
          navigate('/shop')
          setSearchValue('')
          // Thực hiện các thao tác khác với kết quả tìm kiếm ở đây
        })
        .catch((error) => {
          console.error('Error searching products:', error);
        });
    }
  };
  const [id, setId] = useState("")
  const [user, setUser] = useState([])
  useEffect(() => {
    const storedId = localStorage.getItem("isLogin");
    if (storedId) {
      setId(storedId);
      axios.get(`https://db-nike.onrender.com/users/${storedId}`).then((res) => setUser(res.data));
    }
  }, [id, isLoad, isStatus]);

  useEffect(() => {
    axios.get("https://db-nike.onrender.com/products").then((res) => setProduct(res.data))
  }, [isStatus])
  const newProducts = [
    {
      Id: 1,
      Name: "New & Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Arrivals",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Lastest Shoes  ",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Lastest Clothing",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "SNKRS Launch Calendar",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1004,
          Name: "Customise with Nike By You",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1005,
          Name: "Nike App Exclusives",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1006,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1007,
          Name: "Member Exclusive",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1008,
          Name: "Summer Essentials",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1009,
          Name: "Top Kicks Under 3,000,000₫",
          Parent: 1,
          Children: [],
        },

      ],
    },
    {
      Id: 2,
      Name: "Shop icons",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "Air Force 1",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Air Jordan 1",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Air Max",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Dunk",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Blazer",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Pegasus",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "New For Men",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "Shoes",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Accessories",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Shop All New",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "New For Women",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Shoes",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Clothing",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Accessories",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Shop All New",
          Parent: 4,
          Children: [],
        },
      ],
    },
    {
      Id: 5,
      Name: "New For Kids",
      Parent: null,
      Children: [
        {
          Id: 5000,
          Name: "Shoes",
          Parent: 4,
          Children: [],
        },
        {
          Id: 5001,
          Name: "Clothing",
          Parent: 4,
          Children: [],
        },
        {
          Id: 5002,
          Name: "Accessories",
          Parent: 4,
          Children: [],
        },
        {
          Id: 5003,
          Name: "Shop All New",
          Parent: 4,
          Children: [],
        },
      ],
    },
  ];
  const manProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Releases",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Member Exclusive",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "Jordan",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1004,
          Name: "Football Club Kits",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1005,
          Name: "Customise with Nike By You",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1006,
          Name: "Last Sizes Available",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1007,
          Name: "Sale",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1008,
          Name: "Running Shoe Finder",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1009,
          Name: "Sustainable Materials",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Shoes",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "All Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Newest Sneakers",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Lifestyle",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Jordan",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Basketball",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2006,
          Name: "Football",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2007,
          Name: "Gym and Training",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2008,
          Name: "Sandals and Slides",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2009,
          Name: "Last Sizes Available",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2010,
          Name: "Customise with Nike By You",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2011,
          Name: "Top Picks Under 3,000,000₫",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Clothing",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "All Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Performance Essentials",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Tops and T-Shirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Sports Bras",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Pants and Leggings",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Shorts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Hoodies and Sweatshirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "Jackets and Gilets",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3008,
          Name: "Jerseys and Kits",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3009,
          Name: "Jordan",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Shop By Sport",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Running",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Football",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Basketball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Gym and Training",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4004,
          Name: "Yoga",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4005,
          Name: "Skateboarding",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4006,
          Name: "Tennis",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4007,
          Name: "Golf",
          Parent: 4,
          Children: [],
        },
      ],
    },
  ];
  const womanProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Releases",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Member Exclusive",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "Jordan",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1004,
          Name: "Bra and Legging Duos",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1005,
          Name: "Customise with Nike By You",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1006,
          Name: "Last Sizes Available",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1007,
          Name: "Sale",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1008,
          Name: "Find Your Feel - Nike Leggings",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1009,
          Name: "Running Shoe Finder",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1010,
          Name: "Sustainable Materials",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Shoes",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "All Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Newest Sneakers",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Lifestyle",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Jordan",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Gym and Training",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2006,
          Name: "Sandals and Slides",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2007,
          Name: "Basketball",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2008,
          Name: "Football",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2009,
          Name: "Last Sizes Available",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2010,
          Name: "Customise with Nike By You",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2011,
          Name: "Top Picks Under 3,000,000₫",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Clothing",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "All Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Performance Essentials",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Tops and T-Shirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Sports Bras",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Pants and Leggings",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Shorts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Hoodies and Sweatshirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "Jackets and Gilets",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3008,
          Name: "Skirts and Dresses",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3009,
          Name: "Modest Wear",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3010,
          Name: "Nike Maternity",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3011,
          Name: "Plus Size",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Shop by Sport",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Yoga",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Running",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Gym and Training",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Basketball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4004,
          Name: "Tennis",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4005,
          Name: "Golf",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4006,
          Name: "Football",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4007,
          Name: "Skateboarding",
          Parent: 4,
          Children: [],
        },

      ],
    },
  ];
  const kidProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Releases",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Newest Sneakers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "Member Exclusive",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1004,
          Name: "Jordan",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1005,
          Name: "Bags and Backpacks",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1006,
          Name: "Last Sizes Available",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1007,
          Name: "Sale",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Boys' Shoes",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "All Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Older Boys (7 - 14 years)",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Younger Boys (4 - 7 years)",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Babies and Toddlers (0 - 4 years)",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Lifestyle",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Jordan",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2006,
          Name: "Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2007,
          Name: "Basketball",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2008,
          Name: "Football",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2009,
          Name: "Sandals and Slides",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Girls' Shoes",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "All Shoes",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Older Girls (7 - 14 years)",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Younger Girls (4 - 7 years)",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Babies and Toddlers (0 - 4 years)",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Lifestyle",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Jordan",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Running",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "Basketball",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3008,
          Name: "Football",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3009,
          Name: "Football",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Kids By Age",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Older Kids (7 - 14 years)",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Younger Kids (4 - 7 years)",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Babies & Toddlers (0 - 4 years)",
          Parent: 4,
          Children: [],
        },
      ],
    },
  ];
  const saleProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "Shop All Sale",
          Parent: 1,
          Children: [],
        },

      ],
    },
    {
      Id: 2,
      Name: "Men's Sale",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Clothing",
          Parent: 2,
          Children: [],
        }
      ],
    },
    {
      Id: 3,
      Name: "Women's Sale",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "Shoes",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Clothing",
          Parent: 3,
          Children: [],
        },

      ],
    },
    {
      Id: 4,
      Name: "Kids' Sale",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Shoes",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Clothing",
          Parent: 4,
          Children: [],
        },

      ],
    },
  ];
  const collectionProducts = [
  ];
  return (
    <nav className="flex justify-between items-center">
      <div className="Logo hover:opacity-50 cursor-pointer">
        <Link to="/home">

          <svg
            class="pre-logo-svg"
            height="60px"
            width="60px"
            fill="#111"
            viewBox="0 0 69 32"
          >
            <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.16 7.52Q11.2 18 14 18q2.24 0 5.04-.72z"></path>
          </svg>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fa-solid fa-bars"></i>
        </label>

        <ul>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fa-solid fa-x close hidden"></i>
          </label>
          <Link to="/shop">
            <li>
              New & Featured
              <div className="yeni-cikanlar hidden">
                <div className="grid grid-cols-5 gap-4">
                  <Menu options={newProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/shop">
            <li>
              Men
              <div className="yeni-cikanlar hidden">
                <div className="grid grid-cols-4 gap-4">
                  {" "}
                  <Menu options={manProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/shop">
            <li>
              Women
              <div className="yeni-cikanlar hidden">
                <div className="grid grid-cols-4 gap-4">
                  <Menu options={womanProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/shop">
            <li>
              Kids
              <div className="yeni-cikanlar hidden">
                <div className="grid grid-cols-5 gap-4">
                  <Menu options={kidProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/shop">
            <li>
              Sale
              <div className="yeni-cikanlar hidden">
                <div className="grid grid-cols-5 gap-4">
                  <Menu options={saleProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/shop">
            <li>
              SNKRS
              <div className="yeni-cikanlar hidden">
                <div className="grid grid-cols-5 gap-4">
                  <Menu options={collectionProducts} />
                </div>
              </div>
            </li>
          </Link>
        </ul>
        <div className="absolute right-28 hidden lg:block" style={{ marginRight: '30px' }}>
          <i className="fa-solid fa-magnifying-glass absolute top-1.5 right-1.5 opacity-50 text-xl"></i>
          <input
            placeholder="Search"
            className="bg-[#f0efef] p-2 rounded-full w-100 pl-8 hover:bg-[#ebe9e9]"
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      {
        id ? (<div className="mr-5 items-center hidden lg:flex">

          <div className="button-right">
            <Link to="/favorites">
              <Badge count={(user.favourites && user.favourites.length > 0) ? user.favourites.length : 0} >
                <Avatar shape="square" size="large" style={{ backgroundColor: 'white' }}>
                  <svg
                    style={{ marginTop: '5px' }}
                    className=""
                    width="30px"
                    height="24px"
                    fill="#111"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.11 4a6.6 6.6 0 0 0-4.79-1.92A6.27 6.27 0 0 0 12 3.84 6.57 6.57 0 0 0 2.89 4c-2.8 2.68-2.45 7.3.88 10.76l6.84 6.63A2 2 0 0 0 12 22a2 2 0 0 0 1.37-.54l.2-.19.61-.57c.6-.57 1.42-1.37 2.49-2.41l2.44-2.39 1.09-1.07c3.38-3.55 3.8-8.1.91-10.83zm-2.35 9.4l-.25.24-.8.79-2.44 2.39c-1 1-1.84 1.79-2.44 2.36L12 20l-6.83-6.68c-2.56-2.66-2.86-6-.88-7.92a4.52 4.52 0 0 1 6.4 0l.09.08a2.12 2.12 0 0 1 .32.3l.9.94.9-.94.28-.27.11-.09a4.52 4.52 0 0 1 6.43 0c1.97 1.9 1.67 5.25-.96 7.98z"></path>
                  </svg>
                </Avatar>

              </Badge>

            </Link>
          </div>
          <Link to="/cart">
            <div className="button-right">
              <Badge count={(user.listcart && user.listcart.length > 0) ? user.listcart.length : 0}>
                <Avatar shape="square" size="large" style={{ backgroundColor: 'white' }}>
                  <svg width="30px" height="24px" fill="#111" viewBox="0 0 24 24" style={{ marginTop: '5px' }}>
                    <path d="M16 7a1 1 0 0 1-1-1V3H9v3a1 1 0 0 1-2 0V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1z"></path>
                    <path d="M20 5H4a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a2 2 0 0 0-2-2zm0 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7h16z"></path>
                  </svg>
                </Avatar>
              </Badge>
            </div>
          </Link>
        </div >) : (<div className="mr-5 items-center hidden lg:flex">
          <div className="button-right">
            <Link to="/login">
              <Badge count={0}>
                <Avatar shape="square" size="large" style={{ backgroundColor: 'white', marginTop: '5px' }}>
                  <svg
                    className=""
                    width="30px"
                    height="24px"
                    fill="#111"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.11 4a6.6 6.6 0 0 0-4.79-1.92A6.27 6.27 0 0 0 12 3.84 6.57 6.57 0 0 0 2.89 4c-2.8 2.68-2.45 7.3.88 10.76l6.84 6.63A2 2 0 0 0 12 22a2 2 0 0 0 1.37-.54l.2-.19.61-.57c.6-.57 1.42-1.37 2.49-2.41l2.44-2.39 1.09-1.07c3.38-3.55 3.8-8.1.91-10.83zm-2.35 9.4l-.25.24-.8.79-2.44 2.39c-1 1-1.84 1.79-2.44 2.36L12 20l-6.83-6.68c-2.56-2.66-2.86-6-.88-7.92a4.52 4.52 0 0 1 6.4 0l.09.08a2.12 2.12 0 0 1 .32.3l.9.94.9-.94.28-.27.11-.09a4.52 4.52 0 0 1 6.43 0c1.97 1.9 1.67 5.25-.96 7.98z"></path>
                  </svg>
                </Avatar>

              </Badge>

            </Link>
          </div>
          <Link to="/login">
            <div className="button-right">
              <Badge count={0}>
                <Avatar shape="square" size="large" style={{ backgroundColor: 'white', marginTop: '5px' }}>
                  <svg width="30px" height="24px" fill="#111" viewBox="0 0 24 24">
                    <path d="M16 7a1 1 0 0 1-1-1V3H9v3a1 1 0 0 1-2 0V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1z"></path>
                    <path d="M20 5H4a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a2 2 0 0 0-2-2zm0 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7h16z"></path>
                  </svg>
                </Avatar>
              </Badge>
            </div>
          </Link>
        </div>)
      }






    </nav >
  );
};
export default Navbar;
