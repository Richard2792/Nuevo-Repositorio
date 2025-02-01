const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/sendToDiscord", async (req, res) => {
    const { webhook_url, content, username, avatar_url } = req.body;

    if (!webhook_url || !content) {
        return res.status(400).json({ error: "El webhook y el contenido son obligatorios." });
    }

    try {
        await axios.post(webhook_url, {
            content,
            username: username || "Roblox API",
            avatar_url: avatar_url || ""
        });

        res.json({ status: "Mensaje enviado con éxito a Discord" });
    } catch (error) {
        res.status(500).json({ error: "Error al enviar mensaje a Discord" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API corriendo en el puerto ${PORT}`));
