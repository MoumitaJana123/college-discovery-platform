
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

//  SEARCH/GET allL Colleges
app.get('/api/colleges', async (req, res) => {
  
  res.set('Cache-Control', 'public, max-age=300');

  try {
    const { name, location, course, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    
    if (name && name.trim()) {
      const exactResult = await pool.query(
        "SELECT * FROM colleges WHERE name = $1 LIMIT 1", 
        [name.trim()]
      );
      
      if (exactResult.rows.length > 0) {
        return res.json({
          colleges: exactResult.rows,
          pagination: { totalCount: 1, currentPage: 1, totalPages: 1 }
        });
      }
    }

    //  FUZZY SEARCH ---
    let query = "FROM colleges WHERE 1=1";
    let params = [];

    if (name) {
      params.push(`%${name.trim()}%`);
      query += ` AND name ILIKE $${params.length}`;
    }
    if (location) {
      params.push(location);
      query += ` AND location = $${params.length}`;
    }
    if (course) {
      params.push(`%${course}%`);
      query += ` AND course ILIKE $${params.length}`;
    }

    // Optimization: Run count and data query in parallel to save time
    const countPromise = pool.query(`SELECT COUNT(*) ${query}`, params);
    
    const dataParams = [...params, limit, offset];
    const dataQuery = `SELECT * ${query} ORDER BY rating DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    const dataPromise = pool.query(dataQuery, dataParams);

    const [countResult, dataResult] = await Promise.all([countPromise, dataPromise]);

    const totalCount = parseInt(countResult.rows[0].count);

    res.json({
      colleges: dataResult.rows,
      pagination: {
        totalCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Compare colleges
app.get('/api/colleges/compare', async (req, res) => {
  res.set('Cache-Control', 'public, max-age=600'); 
  try {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({ error: 'No college IDs provided' });
    
    const idsArray = ids.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
    const result = await pool.query('SELECT * FROM colleges WHERE id = ANY($1::int[])', [idsArray]);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comparison data" });
  }
});

//  Single college detail
app.get('/api/colleges/:id', async (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600'); // Individual pages cache for 1 hour
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM colleges WHERE id = $1', [id]);
    
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/health', (req, res) => res.status(200).send('OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Backend running on port ${PORT}`));
