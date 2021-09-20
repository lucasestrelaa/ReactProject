import React, { useEffect, useState } from "react";

export default function Componente5(props) {
  const [Setores, setSetores] = useState(null);
  const [Cargos, setCargos] = useState(null);
  const [Setor, setSetor] = useState("null");
  const [Cargo, setCargo] = useState("null");
  useEffect(() => {
    fetch("http://localhost:8000/cargos")
      .then((res) => {
        return res.json();
      })
      .then((req) => {
        setCargos(req);
      });
    fetch("http://localhost:8000/setores")
      .then((res) => {
        return res.json();
      })
      .then((req) => {
        setSetores(req);
      });
  }, []);
  function getCargo() {
    
      //document.getElementById("FormNew").style.display = "none";
    
    
    if (Cargos) {
      return Cargos.map((carg) => {
        if (carg.id === props.number) {
          return Setores.map((setr) => {
            if (setr.id === carg.idSetor) {
              return (
                <div>
                  <h3>Setor: {setr.name}</h3>
                  <form onSubmit={updateCargo}>
                    <input type="text" name="id" id="id" value={carg.id} readOnly />
                    <input type="text" name="name" id="name" placeholder={carg.name} onChange={(e) => setCargo(e.target.value)} />
                    <button type="submit">Atualizar</button>
                  </form>
                </div>
              );
            }
          });
        }
      });
    }
  }
  function updateCargo(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
    };
    fetch("https://localhost:8000/cargos/" + e.target.id.value, {
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
      <h3>{props.number}</h3>
      <h3>{getCargo()}</h3>
    </div>
  );
}
