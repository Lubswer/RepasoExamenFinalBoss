const Table = ({campos, funcionRender, data}) => {

    return (
        <table>
            <thead>
                <tr>
                {campos.map((cam, index)=>(
                    <th key = {index}>{cam}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((dt)=>(
                    <tr key = {dt.id}>
                        {funcionRender(dt)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table