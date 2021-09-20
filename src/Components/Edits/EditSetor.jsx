import React, { useEffect, useState } from "react";
import NewCargo from '../New/NewCargo'

export default function Componente5(props) {
  const [Setores, setSetores] = useState(null);
  const [Setor, setSetor] = useState("null");
  useEffect(() => {
    fetch("http://localhost:8000/setores")
      .then((res) => {
        return res.json();
      })
      .then((req) => {
        setSetores(req);
      });
  }, []);
  function getSetor() {
    if (Setores) {
      return Setores.map((sel) => {
        if (sel.id === props.number) {
          return (
            <div>
              <form onSubmit={updateSetor}>
                <input type="text" name="id" id="id" value={sel.id} readOnly />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={sel.name}
                  onChange={(e) => setSetor(e.target.value)}
                />
                <button type="submit">Atualizar</button>
              </form>
              <NewCargo id={sel.id}></NewCargo>
            </div>
          );
        }
      });
    }
  }
  function updateSetor(e){
      e.preventDefault()
      const data = {
        name: e.target.name.value,
      };
      fetch("https://localhost:8000/setores/" + e.target.id.value, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then(console.log("Setor Atualizado")) // or res.json()
      .then((res) => console.log(res));

      

  }

  return (
    <div>
      <h3>{getSetor()}</h3>
    </div>
  );
}
