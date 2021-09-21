import React from "react";

export default function newCargo(props) {
  //save
  function saveFormCargo(e) {
    e.preventDefault();
    console.log(e.target.name.value);
    const data = {
      name: e.target.name.value,
      idSetor: props.id,
    };
    fetch("http://localhost:8000/cargos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then(function (response) {
        return response.json();
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", JSON.stringify(response)));
    console.log("formúlário" + e.target.name.value);
    window.location.reload();
  }
  return (
    <div>
      <form onSubmit={saveFormCargo} method="post">
        <div class="col-auto">
          <input type="text" name="name" id="name" placeholder="Digite o nome do cargo" />
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Novo Cargo</button>
      </form>
    </div>
  );
}
