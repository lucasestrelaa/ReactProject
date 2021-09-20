import React from 'react'

export default function newSetor(props) {
    function saveForm(e) {
        e.preventDefault();
        console.log(e.target.name.value );
        const data = {
          name: e.target.name.value,
          //"cargo": e.target.cargo.value
        };
    
        fetch("http://localhost:8000/setores", {
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
        window.location.reload();
      }
    return (
        <div className="FormNew" id="FormNew">
          <h3>Novo Setor</h3>
          
           <form onSubmit={saveForm} method="post">
           <div class="col-auto">
               <input type="text" name="name" id="name" placeholder="Digite o nome do setor"/>
               </div>
               <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
              
            </form> 
        </div>
    )
}
