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
    if (Cargos) {
      return Cargos.map((carg) => {
        if (carg.id === props.number) {
          return Setores.map((setr) => {
            if (setr.id === carg.idSetor) {
              return (
                <div>
                  <h3>Setor: {setr.name}</h3>
                  <form onSubmit={updateCargo}>
                    <input type="text" name="id" id="id" value={carg.id} readOnly hidden/>
                    <input type="text" name="idSetor" id="idSetor" value={carg.idSetor} readOnly hidden/>
                    <div class="col-auto">
                      <input type="text" name="name" id="name" placeholder={carg.name} onChange={(e) => setCargo(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm">Atualizar</button>
                    <p>{() => props.getCargos}</p>
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
      idSetor: +e.target.idSetor.value
    };
    fetch("http://localhost:8000/cargos/" + e.target.id.value, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then(console.log("cargo Atualizado")) // or res.json()
      .then((res) => console.log(res));
      window.location.reload();
  }

  return (
    <div>
      <h3>{getCargo()}</h3>
    </div>
  );
}
