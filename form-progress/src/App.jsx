import { useState } from "react";

const nameRegex = /\D\s\D/;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function App() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    maritalStatus: "",
    genre: "",
    fillBar: 0,
  });

  function handleChange(event) {
    setData((previousData) => {
      let newData = { ...data };

      switch (event.target.name) {
        case "fullName":
          newData.fullName = event.target.value;
          break;

        case "email":
          newData.email = event.target.value;
          break;

        case "maritalStatus":
          newData.maritalStatus = event.target.value;
          break;

        case "genre":
          newData.genre = event.target.value;
          break;

        default:
          break;
      }

      newData.fillBar = calculateProgress(newData);

      return newData;
    });
  }

  function calculateProgress(newData) {
    let value = 0;

    if (nameRegex.test(newData.fullName)) value += 25;
    if (emailRegex.test(newData.email)) value += 25;
    if (newData.maritalStatus != "") value += 25;
    if (newData.genre != "") value += 25;

    return value;
  }

  function sendData() {
    window.alert("Formulário enviado com sucesso");
    document.getElementById(data.genre).checked = false;
    setData({
      fullName: "",
      email: "",
      maritalStatus: "",
      genre: "",
      fillBar: 0,
    });
  }

  return (
    <div className="container">
      <div className="form">
        {data.fillBar > 0 ? (
          <div className="progressBar">
            <div
              className="fillBar"
              style={{ width: data.fillBar + "%" }}
            ></div>
          </div>
        ) : (
          ""
        )}

        <div className="nameInput">
          <h4>Nome Completo</h4>

          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          ></input>
        </div>

        <div className="emailInput">
          <h4>E-mail</h4>

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          ></input>
        </div>

        <div className="maritalStatusInput">
          <h4>Estado Civil</h4>

          <select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            <option value="single">Solteiro(a)</option>
            <option value="married">Casado(a)</option>
            <option value="divorced">Divorciado(a)</option>
          </select>
        </div>

        <div className="genreInput">
          <h4>Gênero</h4>

          <input
            type="radio"
            id="male"
            name="genre"
            value="male"
            onClick={handleChange}
          />
          <label htmlFor="male">Masculino</label>

          <input
            type="radio"
            id="female"
            name="genre"
            value="female"
            onClick={handleChange}
          />
          <label htmlFor="female">Feminino</label>
        </div>

        <button
          className="sendButton"
          disabled={data.fillBar === 100 ? false : true}
          onClick={sendData}
        >
          Enviar Formulário
        </button>
      </div>
    </div>
  );
}

export default App;
