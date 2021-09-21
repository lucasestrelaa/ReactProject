import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import NewCargo from '../New/NewCargo'

export default function Componente5(props) {
  const [Setores, setSetores] = useState(null);
  const [Cargos, setCargos] = useState(null);
  const [Setor, setSetor] = useState("null");
  //data
  useEffect(() => {
    fetch("http://localhost:8000/cargos")
      .then((res) => {
        //console.log(res.json());
        return res.json();
      })
      .then((cargo) => {
        setCargos(cargo);
      });
    fetch("http://localhost:8000/setores")
      .then((res) => {
        return res.json();
      })
      .then((req) => {
        setSetores(req);
      });
  }, []);
  function getCargos(del) {
    if (Cargos) {
      return Cargos.map((cargo) => {
        //console.log(cargo.name);
        if (cargo.idSetor === del) {
          return (
            <div className="col-md-auto">
              <span key={cargo.id} class="card">{cargo.name}</span>
              <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteCargo(cargo.id, cargo.idSetor)}>
                Excluir Cargo
              </button>
              <hr />
            </div>
          );
        }
      });
    }
  }
  function getSetor() {
    if (Setores) {
      return Setores.map((sel) => {
        if (sel.id === props.number) {
          return (
            <div className="EditSetor" >
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
              <ul>{getCargos(sel.id)}</ul>
            </div>
          );
        }
      });
    }
  }
  //update
  function updateSetor(e){
      e.preventDefault()
      const data = {
        name: e.target.name.value,
      };
      fetch("http://localhost:8000/setores/" + e.target.id.value, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then(console.log("Setor Atualizado")) // or res.json()
      .then((res) => console.log(res));
      window.location.reload();

      

  }
  //delete
  function deleteCargo(id, idSetor) {
    console.log(id, idSetor);
    console.log(Cargos);
    console.log(id);
    fetch("http://localhost:8000/cargos/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log("cargo removido")) // or res.json()
      .then((res) => console.log(res));
      window.location.reload();
  }
  return (
    <div>
      <h3>{getSetor()}</h3>
    </div>
  );
}
