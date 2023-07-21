import React, { useState } from "react";
import "../styles/Modal.css";

const Modal = ({ data, onCloseModal, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({
    _id: data._id,
    image: data.image,
    availability: data.availability,
    price: data.price,
    stock: data.stock,
    dish_name: data.dish_name,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(updatedData);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        {/* Modal content */}
        <h2>Update Modal</h2>
        <label>
          ID:
          <input type="text" name="id" value={updatedData._id} readOnly />
        </label>
        <label>
          Dish Name:
          <input
            type="text"
            name="dish_name"
            value={updatedData.dish_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={updatedData.image}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Availability:
          <input
            type="text"
            name="availability"
            value={updatedData.availability}
            onChange={handleInputChange}
          />
        </label>
        {/* <label>
          Availability:
         <select
          name="availability"
          value={updatedData.availability}
          onChange={handleInputChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label> */}

        <label>
          Price:
          <input
            type="text"
            name="price"
            value={updatedData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="text"
            name="stock"
            value={updatedData.stock}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-container">
          <button onClick={handleUpdate} data-id={data.id}>
            Update
          </button>
          <button className="close-button" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
