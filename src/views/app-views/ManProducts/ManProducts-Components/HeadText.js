import React, { useEffect, useState } from "react";
import axios from 'axios'

const HeadText = () => {
  const [newSnk, setNewSnk] = useState('')

  useEffect(() => {
    axios.get("https://db-nike.onrender.com/products").then((res) => (setNewSnk(res.data.filter((e) => e.New == true))))

  }, [])



  return (
    <div className="bg-white w-full  sticky top-0 z-10 h-13 flex items-center">
      <span className="text-2xl  header-text-man" style={{ color: 'orangered' }}>
        New ({newSnk.length})
      </span>
    </div>
  );
};

export default HeadText;
