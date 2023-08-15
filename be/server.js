const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/wildfires', async (req, res) => {
    const { month, year } = req.query;

    try {
        const response = await axios.get(`https://eonet.gsfc.nasa.gov/api/v3/events/geojson?month=${month}&year=${year}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});