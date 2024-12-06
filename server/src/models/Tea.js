const db = require('../db');

const Tea = {
    getAllTeas: async () => {
        const res = await db.query('SELECT * FROM teas');
        return res.rows;
    },
    searchTeas: async (criteria) => {
        const query = `
            SELECT * FROM teas
            WHERE (type ILIKE \$1 OR \$1 IS NULL) AND
                  (variety ILIKE \$2 OR \$2 IS NULL) AND
                  (additives ILIKE \$3 OR \$3 IS NULL) AND
                  (producer ILIKE \$4 OR \$4 IS NULL) AND
                  (price <= \$5 OR \$5 IS NULL)
        `;
        const values = [
            criteria.type || null,
            criteria.variety || null,
            criteria.additives || null,
            criteria.producer || null,
            criteria.price || null
        ];
        const res = await db.query(query, values);
        return res.rows;
    },
    addTea: async (tea) => {
        const query = `
            INSERT INTO teas (type, variety, additives, producer, weight, price)
            VALUES (\$1, \$2, \$3, \$4, \$5, \$6) RETURNING *
        `;
        const values = [tea.type, tea.variety, tea.additives, tea.producer, tea.weight, tea.price];
        const res = await db.query(query, values);
        return res.rows[0];
    },
    updateTea: async (id, tea) => {
        const query = `
            UPDATE teas
            SET type = \$1, variety = \$2, additives = \$3, producer = \$4, weight = \$5, price = \$6
            WHERE id = \$7 RETURNING *
        `;
        const values = [tea.type, tea.variety, tea.additives, tea.producer, tea.weight, tea.price, id];
        const res = await db.query(query, values);
        return res.rows[0];
    },
    deleteTea: async (id) => {
        await db.query('DELETE FROM teas WHERE id = \$1', [id]);
    },
};

module.exports = Tea;