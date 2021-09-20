import React from 'react'

export default function Components4(props) {
    return (
        <div>
            <p>Formulário a Editar</p>
            <p>{props.dat}</p>
            <button onClick={() => props.changeSetor()}>Editar editado</button>
            <hr />
        </div>
    )
}
