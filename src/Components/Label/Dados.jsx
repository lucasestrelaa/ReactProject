import React from 'react'

export default function Componente1(props) {
    return (
        <div>
            <p>Setores</p>
            <hr />
            <ul>{props.setores}</ul>
        </div>
    )
}
