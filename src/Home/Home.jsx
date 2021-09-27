import React, { useState, useEffect } from "react";
import Data from "../Components/Label/Dados";
import Edit from "../Components/Edicao/Edicao";
import ShowEditting from "../Components/Show/Show";
import EditSetor from "../Components/Edits/EditSetor";
import EditCargo from "../Components/Edits/EditCargo";
import NewSetor from "../Components/New/NewSetor";
import Header from '../layout/Header';
import Card from "../layout/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import "./Home.css";

export default function Home(props) {
  const [Setores, setSetores] = useState(null);
  const [Cargos, setCargos] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [SetorSel, setSetorSel] = useState(null);
  const [CargoSel, setCargoSel] = useState(null);
  const [tog, setTog] = useState(3);

  const toggleEditForm = () => setEditForm(!editForm);

  const changeEdit = () =>
    editForm
      ? "Editando" + console.log(Setores)
      : "Bloqueado" + console.log(Cargos);
      
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
    if (Setores) {
      return Setores.map((del) => {
        return (
          <div >
            <span key={del.id} className="card">
              {del.id} - {del.name}
            </span>
            <button setor={del} onClick={() => SE1(del.id, 1)} class="btn btn-primary btn-sm">
              Editar
            </button>
            <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteSetor(del.id)}>Excluir Setor</button>
            <ul class="ulCargos" >{getCargos(del.id)}</ul>
          </div>
        );
      });
    }
  }
  function getCargos(del) {
    if (Cargos) {
      return Cargos.map((cargo) => {
        if (cargo.idSetor === del) {
          return (
            <div>
              <span key={cargo.id} class="card">{cargo.name}</span>
              <button type="button" class="btn btn-primary btn-sm" onClick={() => SE1(cargo.id, 2)}>Editar</button>
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
  //save or edit
  function selecionado(){
    switch (tog) {
      case 1:
        console.log("setor");
        showSetor();
        
        
        break;
      case 2:
        console.log("cargo")
        break;
      case 3:
          console.log("novo");

        break;
    }
  }
  function showSetor(){
    console.log("a");
    return (
      <div>
        <EditSetor number={changeSetor()} className="Conteudo" />
      </div>
    );
  }
  function SE1(del, num){
    setTog(num)
    selecionado(num)
    
    
    //ex(del)
  }
  function ex(del){
    if(tog){
      return (
          <div>
            <EditSetor number={changeSetor()}className="Conteudo" />
          </div>
        )
        
    }else{
      return (
        <div>
          <NewSetor />
        </div>
      )
    }
  }

  
  //Read one

  const toggleEditSetor = (del) => setSetorSel(del);

  const changeSetor = () => (SetorSel ? SetorSel : "");

  const toggleEditCargo = (carg) => setCargoSel(carg);

  const changeCargo = () => (CargoSel ? CargoSel : "");
  
  //delete
  function deleteSetor(id) {
    console.log(id);
    fetch("http://localhost:8000/setores/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log("Setor removido"))
      .then((res) => console.log(res));
    window.location.reload();
  }
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
      .then(console.log("cargo removido"))
      .then((res) => console.log(res));
      window.location.reload();
  }
  //layout
  $(".showOrHide").click(function(){
    $(this).next("ulCargos").toggle();
  });
  return (
    <div className="Body">
      <nav className="NavData">
        <Data setores={getSetores()}  SE1={SE1} className="Conteudo"></Data>
        {/*<Edit changeEdit={toggleEditForm} className="Conteudo"></Edit>
        <ShowEditting number={changeEdit()} className="Conteudo"></ShowEditting>*/}
      </nav>
      <nav className="NavForm">
        <div>{selecionado()}</div>
        <EditCargo number={changeCargo()} className="Conteudo"></EditCargo>
        
      </nav>
    </div>
  );
}
