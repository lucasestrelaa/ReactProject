import React, { useState, useEffect } from "react";
import Data from "../Components/Label/Dados";
import Edit from "../Components/Edicao/Edicao";
import ShowEditting from "../Components/Show/Show";
import EditSetor from "../Components/Edits/EditSetor";
import EditCargo from "../Components/Edits/EditCargo";
import NewSetor from "../Components/New/NewSetor";
import Card from "../layout/Card";
import "./Home.css";

export default function Home(props) {
  const [Setores, setSetores] = useState(null);
  const [Cargos, setCargos] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [SetorSel, setSetorSel] = useState(null);
  const [CargoSel, setCargoSel] = useState(null);

  const toggleEditForm = () => setEditForm(!editForm);

  const changeEdit = () =>
    editForm
      ? "Editando" + console.log(Setores)
      : "Bloqueado" + console.log(Cargos);

  //const id = () =>

  //data and variables
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

  //functions
  //Create

  //Read
  function getSetores() {
    //adicionar no button editar
    //<button onClick={showCargos}>Mostrar Cargos</button>
    if (Setores) {
      return Setores.map((del) => {
        return (
          <div>
            <span key={del.id} className="divSetor">
              {del.id} - {del.name}
            </span>
            <button setor={del} onClick={() => toggleEditSetor(del.id)}>
              Editar
            </button>

            <button onClick={() => deleteSetor(del.id)}>Excluir Setor</button>
            <ul className="ulCargos">{getCargos(del.id)}</ul>
          </div>
        );
      });
    }
  }
  function getCargos(del) {
    if (Cargos) {
      return Cargos.map((cargo) => {
        //console.log(cargo.name);
        if (cargo.idSetor === del) {
          return (
            <div>
              <span key={cargo.id}>{cargo.name}</span>
              <button onClick={() => toggleEditCargo(cargo.id)}>Editar</button>
              <button onClick={() => deleteCargo(cargo.id, cargo.idSetor)}>
                X
              </button>
            </div>
          );
        }
      });
    }
  }
  //Read each
  //pegar apenas o selecionado

  //receber o selecionado
  //const dataFinal = (del) => del ? del.id : "array Vazio"
  const toggleEditSetor = (del) => setSetorSel(del);

  const changeSetor = () => (SetorSel ? SetorSel : "");

  const toggleEditCargo = (carg) => setCargoSel(carg);

  const changeCargo = () => (CargoSel ? CargoSel : "");

  function getCargo() {}
  //Update
  function updateSetor(e) {
    e.preventDefault();
    console.log("Setor atualizado! " + e.target.value);
  }
  function updateCargo() {}
  //delete
  function deleteSetor(id) {
    console.log(id);
    fetch("https://localhost:8000/setores/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log("Setor removido")) // or res.json()
      .then((res) => console.log(res));
    //const newSetores = Setores.filter((setor) => setor.id !== id);
    //setSetores(newSetores);
  }
  function deleteCargo(id, idSetor) {
    console.log(id, idSetor);
    console.log(Cargos);
    console.log(id);
    fetch("https://localhost:8000/cargos/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log("cargo removido")) // or res.json()
      .then((res) => console.log(res));
  }

  //returns
  return (
    <div className="Body">
      <nav className="NavData">
        <Data setores={getSetores()} className="Conteudo"></Data>
        {/*<Edit changeEdit={toggleEditForm} className="Conteudo"></Edit>
        <ShowEditting number={changeEdit()} className="Conteudo"></ShowEditting>*/}
      </nav>
      <nav className="NavForm">
        <EditSetor number={changeSetor()} className="Conteudo"></EditSetor>
        <EditCargo number={changeCargo()} className="Conteudo"></EditCargo>
        <NewSetor></NewSetor>
      </nav>
    </div>
  );
}
