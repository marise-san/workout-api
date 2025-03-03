const jwt = require("jsonwebtoken");
const md5 = require("md5");
const pool = require("../config/database");

const login = async (req, res) => {
    const { email, password } = req.body;

    const passwordHash = md5(password);
    console.log(passwordHash);

    try {
        const result = await pool.query("SELECT * FROM public.user WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const user = result.rows[0];
        const isMatch = passwordHash === user.password;
        if (!isMatch) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { login };
