const User = require("../models/User");
const md5 = require("md5");
const { getEntity, getEntityById, createEntity, updateEntity, deleteEntity } = require("./baseController");

const getUsers = async (req, res) => {
    try {
        const result = await getEntity("user");
        const user = result.map(row => new User(row.id, row.name, row.email));
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getEntityById("user", id);

        if (result === null) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const user = new User(result.id, result.name, result.email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = md5(password);
        const result = await createEntity("user", ["name", "email", "password"], [name, email, passwordHash]);
        res.status(201).json(`Usuário ${result.name} criado com sucesso`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const passwordHash = md5(password);
        const result = await updateEntity("user", id, ["name", "email", "password"], [name, email, passwordHash]);

        if (result === null) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(201).json({ message: `Usuário ${result.name} atualizado com sucesso` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteEntity("user", id);
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
