import React, { useEffect } from "react";

const ListItem = (props) => {
  const id = props.id;

  useEffect(() => {
    const item = document.querySelector(`#${id}`);
    item.style.backgroundImage = `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg")`;
  }, []);

  return (
    <div id={`${id}`} className="list-item">
      <div className="info-item">
        <h2>{props.name}</h2>
        <p>{props.title}</p>
      </div>
      <img src="/img/star.svg" alt="" />
      <div className="color-item"></div>
    </div>
  );
};

export default ListItem;
