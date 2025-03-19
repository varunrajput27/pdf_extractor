import { useState } from 'react';
import axios from 'axios';
import "./App.css";


function App() {
    const [table, setTable] = useState([]);
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post('https://pdf-extractor-backend-3xuv.onrender.com/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTable(response.data.table);
        } catch (error) {
            console.error('Error extracting table:', error);
        }
    };



    return (
        <div>
            <h1>PDF Table Extractor</h1>
            <div className="show">
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Show Data</button>
            </div>

            <div className="table">
            {table.length > 0 && (
                <table border="1">
                    <tbody>
                        {table.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}

export default App;
