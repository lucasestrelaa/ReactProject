import React from 'react'

export default function Componente1(props) {
    return (
        <div>
            <p>Setores</p>
            <button onClick={() => props.SE1(0, 3)}>Novo Setor</button>
            <hr />
            <ul>{props.setores}</ul>
        </div>
    )
}
