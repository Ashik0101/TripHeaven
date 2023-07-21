import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import url from "../components/url";

import Header from "../components/Header";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState(null);

  /********** fetching data here ************/

  useEffect(() => {
    axios
      .get(`${url}/property`)
      .then((res) => {
        setData(res.data.properties);
      })
      .catch((err) => console.log("Error while fetching properties: ", err));
  }, []);

  return (
    <>
      <Header />
      {data === null ? (
        <div className={styles.loding_data}>
          <h1>Loading Data....</h1>
        </div>
      ) : (
        <>
          {data && data.length === 0 ? (
            <div className={styles.loding_data}>
              <h1>No data found....</h1>
            </div>
          ) : (
            <div className={styles.container}>
              {data.map((el, index) => {
                return <Card key={el._id} data={el} />;
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
