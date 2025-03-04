const pool = require("../config/database");

const getEntity = async (table) => {
    try {
        const query = `SELECT * FROM public.${table};`;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getEntityById = async (table, id) => {
    try {
        const query = `SELECT * FROM public.${table} WHERE id = ${id} LIMIT 1`;
        const result = await pool.query(query);
        return result.rows[0] ?? null;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createEntity = async (table, columns, values) => {
    try {
        const query = `INSERT INTO public.${table} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *;`;
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateEntity = async (table, id, columns, values, conditions = []) => {
    const entity = await getEntityById(table, id);
    if (!entity) throw new Error(`${table} not found`);
    try {
        const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');
        const whereClause = conditions.map((cond, i) => `${cond}`).join(' AND ');
        const query = `UPDATE public.${table} SET ${setClause} WHERE id = ${id} ${whereClause.length > 0 ? 'AND ' + whereClause : ''} RETURNING *;`;
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteEntity = async (table, id) => {
    const entity = await getEntityById(table, id);
    if (!entity) throw new Error(`${table} not found`);
    try {
        const query = `DELETE FROM public.${table} WHERE id = ${id} RETURNING *;`;
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getEntity, getEntityById, createEntity, updateEntity, deleteEntity };
