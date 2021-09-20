import React from "react";

export default function newCargo(props) {
  function saveFormCargo(e) {
    e.preventDefault();
    console.log(e.target.name.value);
    const data = {
      name: e.target.name.value,
      idSetor: props.id,
      //"cargo": e.target.cargo.value
    };

    fetch("http://localhost:8000/cargos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
      //update = body: JSON.stringify({ ...dados, categoriaId: Number(dados.categoriaId) })
    })
      .then(function (response) {
        return response.json();
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", JSON.stringify(response)));
    //console.log(dados);
    //() => props.getSetores()
    console.log("formúlário" + e.target.name.value);
  }
  function newCargoF() {
    
  }
  return (
    <div>
      <form onSubmit={saveFormCargo} method="post">
          <input type="text" name="name" id="name" placeholder="Digite o nome do cargo" />
          <button type="submit">Novo Cargo</button>
        </form>
      
    </div>
  );
}
