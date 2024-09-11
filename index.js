const fetch = require('node-fetch');


const tokens = ['', '', '']; 
const channels_id = [
    "", 
    "", 
    ""
];


async function enviarEncuesta(token, channelId) {
    const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
    
    const pollData = {
        content: "",
        tts: false,
        flags: 0,
        poll: {
            question: { text: "Linho on top" },
            answers: [
                { poll_media: { text: "server mierda" } },
                { poll_media: { text: "/ /EVxfpHuD" } },
                { poll_media: { text: "linho domina" } },
                { poll_media: { text: "server mierda" } },
                { poll_media: { text: "/ /EVxfpHuD" } },
                { poll_media: { text: "linho domina" } }
            ],
            allow_multiselect: true,
            duration: 1,
            layout_type: 1
        }
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pollData)
        });

        if (res.status === 429) {
            const retryAfter = res.headers.get('Retry-After');
            console.log(`buee llego el rate limit, intentemos en ${retryAfter} segundos`);
            setTimeout(() => enviarEncuesta(token, channelId), retryAfter * 1000);
        } else if (res.ok) {
            const data = await res.json();
            console.log('poll enviada:', data);
        } else {
            const errorData = await res.json();
            console.error(`Error al enviar la encuesta: ${res.status}`, errorData);
        }
    } catch (err) {
        console.error('Error en la petición:', err);
    }
}


async function spamEncuesta() {
    setInterval(async () => {
        for (const token of tokens) {
            for (const channelId of channels_id) {
                await enviarEncuesta(token, channelId);
            }
        }
    }, 2000); 
}

spamEncuesta();
