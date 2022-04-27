import { useState } from "react";

function Loader() {
    const [origData, setOrigData] = useState();
    const [data, setData] = useState();
    const [filterVal, setFilterVal] = useState();

    const loadFile = () => {
        var fileToLoad = document.getElementById("tabdellimitedfile").files[0];

        var fileReader = new FileReader();
        fileReader.onload = e => {
            setData(e.target.result.split('\n').map((line, idx) => {
                let rec = line.split('\t');
                return {
                    id: idx + 1,
                    name: rec[0],
                    type: rec[1],
                }
            }));
            setOrigData(data);
        };

        fileReader.readAsText(fileToLoad, "UTF-8");
    }
    const sortData = () => {
        setOrigData(data);
        setData(data.sort((a, b) => a.name < b.name ? -1 : 1))
    }
    const filter = (id) => {
        setOrigData(data);
        setData(data.filter(rec => id ? rec.id !== id : JSON.stringify(rec).toLowerCase().indexOf(filterVal.toLowerCase()) >= 0))
    }
    const undo = () => {
        setData(origData);
    }

    return (
        <div>
            <div className="inputBox">
                <input type="file" id="tabdellimitedfile" name="tabdellimitedfile" />
                <button onClick={e => loadFile()}>Load Selected File</button>
                <button onClick={e => setData()}>Delete File</button>
            </div>
            {data && <div className="inputBox">
                <button onClick={e => sortData()}>Sort By Product Name</button>
                <div>
                    <input type="text" onChange={e => setFilterVal(e.target.value)} />
                    <button onClick={e => filter()}>Filter</button>
                </div>
                <button onClick={e => undo()}>Undo Change</button>
            </div>
            }
            {data && <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Product Name</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.map((entry, key) => (
                        <tr key={key}>
                            <td>{entry.id}</td>
                            <td>{entry.name}</td>
                            <td>{entry.type}</td>
                            <td>
                                <button onClick={e => filter(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    );
}

export default Loader;