const Table = ({columnas, datos, renderFila}) => {
    return (

        <table >
            <thead>
                <tr>
                    {columnas.map((col, index)=>(
                        <th key = {index} style={{ padding: "10px"}}>{col}</th>
                    ))}
                </tr>

            </thead>
            <tbody>
                {datos.map((item)=>(
                    <tr key = {item._id} >
                        {renderFila(item)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
