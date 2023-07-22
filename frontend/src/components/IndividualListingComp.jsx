import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "./url";
function IndividualListingComp() {
  const [individualData, setIndividualData] = useState([]);
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
    console.log(individualData);
  }, [individualData]);

  return <div>hello</div>;
}

export default IndividualListingComp;
