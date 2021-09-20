import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

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
