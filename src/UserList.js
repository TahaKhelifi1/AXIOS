import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]); // state to store list of users
  const [loading, setLoading] = useState(true); // loading state to show a loading message while fetching data
  const [error, setError] = useState(null); // error state to handle any errors

  // Fetching data from jsonplaceholder API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setListOfUser(response.data); // set fetched data into listOfUser state
        setLoading(false); // update loading state once data is fetched
      })
      .catch((err) => {
        setError("Something went wrong!"); // set error if any
        setLoading(false); // update loading state in case of error
      });
  }, []);

  // JSX to display the data
  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <p>Loading...</p> // show loading text until data is fetched
      ) : error ? (
        <p>{error}</p> // show error message if there's an error
      ) : (
        <div>
          <h1>User List</h1>
          <ul>
            {listOfUser.map((user) => (
              <li key={user.id} style={styles.userCard}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Inline styles for the user cards
const styles = {
  userCard: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
};

export default UserList;
