import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemComponent = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(
          "http://ddragon.leagueoflegends.com/cdn/10.10.3216176/data/en_US/item.json"
        )
        .then((res) => {
          console.log(res.data.data[3047].image.full);
          setData(res.data);
        });
    } catch (error) {}
  };

  return (
    <div>
      {data ? (
        <div>
          <div className="box">
            <div className="header">
              <h1>Fiora full AD</h1>
              <div className="icons">
                <img src="/img/edit.svg" alt="edit" />
                <img src="/img/trash-2.svg" alt="eliminar" />
              </div>
            </div>
            <div className="itemsAdd">
              <div className="item1">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${data.data[3047].image.full}`}
                  alt=""
                />
                <div>
                  <p>{data.data[3047].name}</p>
                </div>
              </div>
              <div className="item1">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${data.data[3074].image.full}`}
                  alt=""
                />
                <p>{data.data[3074].name}</p>
              </div>
              <div className="item1">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${data.data[3078].image.full}`}
                  alt=""
                />
                <p>{data.data[3078].name}</p>
              </div>
              <div className="item1">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${data.data[3046].image.full}`}
                  alt=""
                />
                <p>{data.data[3046].name}</p>
              </div>
              <div className="item1">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${data.data[3053].image.full}`}
                  alt=""
                />
                <p>{data.data[3053].name}</p>
              </div>
              <div className="item1">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${data.data[3026].image.full}`}
                  alt=""
                />
                <p>{data.data[3026].name}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <strong>Loading..</strong>
      )}
    </div>
  );
};
export default ItemComponent;
