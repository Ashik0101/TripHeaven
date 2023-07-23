import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "./url";
import styles from "../styles/IndividualListingComp.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "./Header";

function IndividualListingComp() {
  const [individualData, setIndividualData] = useState([]);
  const [totalPeople, setTotalPeople] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalFare, setTotalFare] = useState(0);
  const [bookedDates, setBookedDates] = useState([]);
  const [toggle, setToggle] = useState(true);
  const token = localStorage.getItem("user_login_token");

  const handleClick = () => {
    let obj = {
      no_of_people: +totalPeople,
      checkin_date: selectedDate,
      total_fare: totalFare,
      property_id: id,
    };
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .post(`${url}/bookings/create`, obj)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          notifyAfterBookingSuccess();
          setToggle(!toggle);
        } else {
          notifyAfterBookingFail();
        }
      })
      .catch((err) => {
        notifyAfterBookingFail();
        console.log("some error while booking :", err);
      });
  };

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    console.log("params :", params.id);
    axios
      .get(`${url}/property/${id}`)
      .then((response) => {
        setIndividualData(response.data.property);
      })
      .catch((err) =>
        console.log("Some Error while fetching individual property data:", err)
      );
  }, [id]);
  useEffect(() => {
    axios
      .get(`${url}/bookings/${id}`)
      .then((res) => {
        setBookedDates(res.data.booked_dates);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(
          "Some Error while fetching booked dates of property : ",
          err
        );
      });
  }, [toggle]);

  useEffect(() => {
    console.log(individualData);
  }, [individualData]);

  const handleDateChange = (date) => {
    setSelectedDate(adjustDate(date));
  };

  const adjustDate = (date) => {
    const prevDay = new Date(date);
    prevDay.setDate(date.getDate() + 1);
    const formattedPrevDay = prevDay.toISOString().slice(0, 10);
    return formattedPrevDay;
  };
  const handleTotalPeopleChange = (e) => {
    console.log(e.target.value);
    setTotalPeople(e.target.value);
  };
  useEffect(() => {
    setTotalFare(totalPeople * individualData.price_per_night);
  }, [totalPeople]);

  // Custom function to disable one day less
  const isDateDisabled = (date) => {
    const prevDay = new Date(date);
    prevDay.setDate(date.getDate() + 1);
    const formattedPrevDay = prevDay.toISOString().slice(0, 10);
    return bookedDates.includes(formattedPrevDay);
  };
  function notifyAfterBookingFail() {
    toast.error("Something went wrong!", {
      position: "top-center",
      theme: "colored",
    });
  }

  function notifyAfterBookingSuccess() {
    toast.success("Booking Done Successfully!", {
      position: "top-center",
      theme: "colored",
    });
  }

  return (
    <>
      <Header />
      {individualData && (
        <div className={styles.container}>
          <div className={`${styles.image_container} ${styles.half_card}`}>
            <div className={styles.thumbnail_container}>
              <img src={individualData.thumbnail_image} alt="thumbnail" />
            </div>
            <div className={styles.other_images_container}>
              {individualData.other_images &&
                individualData.other_images
                  .slice(0, 4) // Get at most four elements from the array
                  .map((image, ind) => (
                    <div key={ind}>
                      <img src={image} alt="image" />
                    </div>
                  ))}
            </div>
          </div>
          <div className={styles.parent_details_container}>
            <div className={styles.details_container}>
              <h4>{individualData.title}</h4>
              <h5>{individualData.property_type}</h5>
              <h4> {individualData.location} </h4>
              <p> {individualData.description} </p>
              <div className={styles.amenities_container}>
                <h6>Anemities :</h6>
                <ul>
                  {individualData.amenities &&
                    individualData.amenities.map((el, ind) => {
                      return <li key={ind}>{el}</li>;
                    })}
                </ul>
              </div>
              <h5>₹{individualData.price_per_night}/night </h5>
              <div className={styles.billing_details}>
                {selectedDate && <h3>Booking Date: {selectedDate}</h3>}

                {selectedDate && (
                  <div>
                    <label htmlFor="totalPeople">Select Total People:</label>
                    <select
                      style={{
                        padding: ".2rem 1rem",
                        marginLeft: ".6rem",
                        backgroundColor: "lightblue",
                        borderRadius: "6px",
                      }}
                      id="totalPeople"
                      value={totalPeople}
                      onChange={handleTotalPeopleChange}
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                )}
                {totalPeople && (
                  <div className={styles.billing_details}>
                    {totalPeople && (
                      <h5>
                        <p>Total People: {totalPeople}</p>
                        Total Fare: ₹{totalFare}
                      </h5>
                    )}
                  </div>
                )}

                {totalPeople && (
                  <button className="btn btn-primary" onClick={handleClick}>
                    Book the apartment
                  </button>
                )}
              </div>
            </div>
            <div className={styles.calendar_container}>
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                tileDisabled={({ activeStartDate, date, view }) =>
                  view === "month" && isDateDisabled(date)
                }
                className={styles.customCalendar} // Apply the custom style for the entire calendar
                tileClassName={styles.customTile}
                minDate={new Date()}
              />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default IndividualListingComp;
