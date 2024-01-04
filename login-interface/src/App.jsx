import { useState, useEffect } from "react";
import login from "./login";
import "./index.css";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function App() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [canRequest, setCanRequest] = useState(false);
  const [error, setError] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    if (emailRegex.test(emailInput) && passwordInput.length >= 6) {
      setCanRequest(true);
    } else {
      setCanRequest(false);
    }
  }, [emailInput, passwordInput]);

  async function submit() {
    const values = {
      email: emailInput,
      password: passwordInput,
    };

    setCanRequest(false);

    await login(values)
      .then(() => {
        setIsUserLogged(true);
      })
      .catch((error) => setError(error.message));

    setCanRequest(true);
  }

  return (
    <div className="container">
      {!isUserLogged ? (
        <div>
          <h1>Login Form</h1>
          <div className="loginForm">
            <div className={error ? "error active" : "error"}>
              {error && (
                <div>
                  <h2>Error:</h2>
                  <p>{error}</p>
                </div>
              )}
            </div>

            <div className="loginInput">
              <label htmlFor="email"> Email </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                value={emailInput}
                onChange={(event) => {
                  setEmailInput(event.target.value);
                  if (error) setError(false);
                }}
              />
            </div>

            <div className="loginInput">
              <label htmlFor="password"> Password </label>
              <input
                type="password"
                id="password"
                placeholder="Atleast 6 characters"
                value={passwordInput}
                onChange={(event) => {
                  setPasswordInput(event.target.value);
                  if (error) setError(false);
                }}
              />
            </div>
          </div>

          <div className="loginButton">
            <button disabled={!canRequest} onClick={submit}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="logged">
          <h1>Login realizado com sucesso!</h1>
          <button onClick={() => setIsUserLogged(false)}>Voltar</button>
        </div>
      )}
    </div>
  );
}

export default App;
