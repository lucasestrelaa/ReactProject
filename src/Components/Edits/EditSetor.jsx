import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
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
            <div >
              <h3>Setor: {sel.name}</h3>
              <form onSubmit={updateSetor}  >
                <div>
                  <input type="text"   name="id" id="id" value={sel.id} readOnly hidden/>
                </div>
                <div class="col-auto">
                  <input type="text" name="name" id="name" placeholder={sel.name} onChange={(e) => setSetor(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary btn-sm">Atualizar</button>
              </form>
              <NewCargo id={sel.id}></NewCargo>
              <ul>{() => props.getCargos(sel.id)}</ul>
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
