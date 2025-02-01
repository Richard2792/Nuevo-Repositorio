const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"; // 🔹 Cambia esto por tu Webhook de Discord

app.post("/sendToDiscord", async (req, res) => {
    const { content, username, avatar_url } = req.body;

    if (!content) {
        return res.status(400).json({ error: "El contenido del mensaje es obligatorio" });
    }

    try {
        await axios.post(DISCORD_WEBHOOK, {
            content,
            username: username || "Render Proxy",
            avatar_url: avatar_url || ""
        });

        res.json({ status: "Mensaje enviado con éxito a Discord" });
    } catch (error) {
        res.status(500).json({ error: "Error al enviar mensaje a Discord" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy corriendo en el puerto ${PORT}`));
