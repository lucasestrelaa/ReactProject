import React, { useState } from 'react'

export default function Componente2(props) {
    //let valor = props.showValue;
    //const [editForm, setEditForm] = useState(false);
    return (
        <div>
            <p>Edição</p>
            <button onClick={() => props.changeEdit()}>Mostrar</button>
            <hr />
        </div>
    )
}
