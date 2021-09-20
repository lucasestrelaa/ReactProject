import React from 'react'

export default function Componente1(props) {
    return (
        <div>
            <p>Delegacias</p>
            <hr />
            <ul>{props.setores}</ul>
        </div>
    )
}
