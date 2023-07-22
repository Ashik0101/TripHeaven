import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import url from "../components/url";

import Header from "../components/Header";
import axios from "axios";
import Loader from "../components/Loader";
import HeaderLoader from "../components/HeaderLoader";

const Home = () => {
  const [data, setData] = useState(null);
  const num = [1, 2, 3, 4, 5, 6, 7, 8];
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
      <>{!data ? <HeaderLoader /> : <Header />}</>
      {data === null ? (
        <div className={styles.container}>
          {num.map((el, index) => (
            <Loader key={index} />
          ))}
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
