const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all candidates
router.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates. *, parties.name 
    AS party_name
    From candidates
    LEFT JOIN parties
    On candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });

    // GET a single candidate
router.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a candidate
router.delete("/api/candidate/:id", (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
    if (err) {
    res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
    res.json({
        message: "Candidate not found!",
    });
    } else {
        res.json({
            message: "deleted",
            changes: result.affectedRows,
            id: req.params.id,
        });
        }
    });
});

module.exports = router;