import "../App.css";

import { useState } from "react";
import { validateUsername, validatePassword } from "../data/DataHandler";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [inputIncorrect, setInputIncorrect] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");

  async function authenticate(e) {
    e.preventDefault();
    setLoading(true);
    if ((await validateUsername(userInput)) && validatePassword(passInput)) {
      setLoading(false);
      setLoggedIn(true);
    } else {
      setInputIncorrect(true);
      setLoading(false);
    }
  }

  return (
    <div id="login-page" className="container is-half">
      <form className="container is-child box">
        { inputIncorrect && <div className="notification is-danger">
          <button className="delete" onClick={ () => setInputIncorrect(false) }></button>
          The username or password you entered is incorrect.
          Please try again.
        </div> }
        <h1 className="is-large">Album<strong>Discovery</strong></h1>
        <h2 className="is-large">Login</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          name="username"
          className="input"
          type="text"
          placeholder="Username"
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={passInput}
          onChange={(event) => {
            setPassInput(event.target.value);
          }}
          name="password"
          className="input"
          type="password"
          placeholder="Password"
        ></input>
        <button
          id="login"
          className={`button is-primary is-rounded is-centered ${
            loading ? "is-loading" : ""
          }`}
          type="submit"
          onClick={authenticate}
        >
          Login
        </button>
        { loggedIn && <Navigate to="/albums" /> }
      </form>
    </div>
  );
}
