import React from "react";
import url from "./url";
import { useInRouterContext, useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();
  const redirect = (id) => {
    navigate(`/listing/${id}`);
  };
  return (
    <div
      className="card"
      style={{ width: "16.5rem", height: "16rem", cursor: "Pointer" }}
      onClick={() => redirect(data._id)}
    >
      <img
        className="card-img-top"
        src={data.thumbnail_image}
        alt={data.name}
        style={{ borderRadius: "1rem" }}
      />
      <div
        style={{ textAlign: "left", lineHeight: "0.7rem" }}
        className="card-body"
      >
        <p className="card-title">
          {data.title.length > 27
            ? data.title.substring(0, 27) + "..."
            : data.title}
        </p>

        <h5 className="card-text">{data.location}</h5>
        <span>
          {`$${data.price_per_night}`}
          <span>/night</span>
        </span>
      </div>
    </div>
  );
}

export default Card;
