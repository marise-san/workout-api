const pool = require("../config/database");
const User = require("../models/User");

const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM public.user;");
        const user = result.rows.map(row => new User(row.id, row.name, row.email));
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM public.user WHERE id = $1;", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const user = new User(result.rows[0].id, result.rows[0].name, result.rows[0].email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➕ Criar um novo usuário
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await pool.query("INSERT INTO public.user (name, email, password) VALUES ($1, $2, $3) RETURNING *;", [name, email, password]);
        res.status(201).json(`Usuário ${result.rows[0].name} criado com sucesso`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const result = await pool.query("UPDATE public.user SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;", [name, email, password, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(201).json({ message: `Usuário ${result.rows[0].name} atualizado com sucesso` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM public.user WHERE id = $1 RETURNING *;", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
