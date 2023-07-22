import React, { useState, useEffect } from "react";
import styles from "../styles/UserProfileComp.module.css";
import axios from "axios";
import url from "./url";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  Textarea,
  InputRightAddon,
} from "@chakra-ui/react";

function UserProfileComp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const [userData, setUserData] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    bio: "",
  });
  const token = localStorage.getItem("user_login_token");
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`${url}/user/profile`)
      .then((response) => setUserData(response.data))
      .catch((err) =>
        console.log("Some error while fetching user profle data!")
      );
  }, [token]);

  // formate date input
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdateProfileButtonClick = (e) => {
    const { id, value } = e.target;
    setUpdatedData((prevUpdatedData) => ({
      ...prevUpdatedData,
      [id]: value,
    }));
  };
  useEffect(() => {
    console.log(updatedData);
  }, [updatedData]);

  return (
    <>
      <div
        className={`card ${styles.card_container}`}
        style={{ width: "30rem" }}
      >
        <img
          className="card-img-top"
          src="https://images.pexels.com/photos/3851929/pexels-photo-3851929.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Card image cap"
        />

        <div className="card-body">
          <h5 className="card-title">Name : {userData.name}</h5>
          <p className="card-text">Bio : {userData.bio}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Date Of Birth : {userData.date_of_birth}
          </li>
          <li className="list-group-item">Gender : {userData.gender}</li>
          <li className="list-group-item">Email ID : {userData.email}</li>
        </ul>
        <div className="card-body">
          <button style={{ fontSize: "1.1rem" }} className="btn btn-primary">
            Become A Host <i className="bx bxs-user-detail"></i>
          </button>
          <button
            onClick={() => onOpen()}
            style={{
              marginLeft: "6px",
              fontSize: "1.1rem",
            }}
            className="btn btn-primary"
          >
            Edit <i className="bx bxs-comment-edit"></i>
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  placeholder="name"
                  value={userData.name}
                  onChange={handleUpdateProfileButtonClick}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    id="email"
                    placeholder="email"
                    value={userData.email}
                    readOnly
                  />
                  {/* <InputRightAddon>.com</InputRightAddon> */}
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="gender">Select Gender</FormLabel>
                <Select
                  id="gender"
                  defaultValue={userData.gender}
                  onChange={handleUpdateProfileButtonClick}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="date_of_birth">Date Of Birth</FormLabel>
                <Input
                  type="date"
                  id="date_of_birth"
                  defaultValue={formatDateForInput(userData.date_of_birth)}
                  onChange={handleUpdateProfileButtonClick}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="bio">Enter Your Bio</FormLabel>
                <Textarea
                  id="bio"
                  value={userData.bio}
                  onChange={handleUpdateProfileButtonClick}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProfileButtonClick} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserProfileComp;
