const express = require("express");
const cors = require('cors');
const pdfExtractor = require('pdf-table-extractor');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), (req, res) => {
    const filePath = req.file.path;

    pdfExtractor(filePath, result => {
        const tables = result.pageTables.map(page => page.tables);
        const extractedTable = tables.flat().slice(0, 6).map(row => row.slice(0, 6));
        res.json({ table: extractedTable });
        fs.unlinkSync(filePath);
    }, error => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
