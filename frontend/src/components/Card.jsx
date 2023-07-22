import React from "react";
import url from "./url";

function Card({ data }) {
  return (
    <div className="card" style={{ width: "16.5rem" }}>
      <img
        className="card-img-top"
        src={data.thumbnail_image}
        height={200}
        alt={data.name}
        style={{ borderRadius: "1rem" }}
      />
      <div style={{ textAlign: "left" }} className="card-body">
        <p className="card-title">{data.title}</p>
        <h5 className="card-text">{data.location}</h5>
        <h2>{`$${data.price_per_night}`}</h2>
        <span>per night</span>
      </div>
    </div>
  );
}

export default Card;
