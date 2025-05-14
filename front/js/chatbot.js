document.addEventListener('DOMContentLoaded', function () {
    // Gerar UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    if (!sessionStorage.getItem('chatbotUUID')) {
        sessionStorage.setItem('chatbotUUID', generateUUID());
    }

    const uuid = sessionStorage.getItem('chatbotUUID');

    // Botão flutuante
    const chatButton = document.createElement('div');
    chatButton.id = 'chatbot-button';
    chatButton.innerHTML = '<img src="fotos/chat/logo_chat_branco.png" alt="Chat">';
    document.body.appendChild(chatButton);

    // Janela do chat
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.innerHTML = `
        <div id="chatbot-header">
            <img src="fotos/chat/logo_chat_branco.png" alt="Aquachat" id="chatbot-logo">
            <span id="chatbot-title">Aqua<span style="color: #FFCC33;">chat</span></span>
            <span id="chatbot-close">×</span>
        </div>
        <div id="chatbot-messages"></div>
        <div id="chatbot-input-container">
            <input type="text" id="chatbot-input" placeholder="Digite sua mensagem...">
            <button id="chatbot-send">
                <img src="fotos/chat/chat_enviar_preto.png" alt="Enviar">
            </button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    // CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #chatbot-button {
            position: fixed;
            bottom: 50px;
            right: 20px;
            width: 80px;
            height: 80px;
            background: #014421;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 9999;
        }
        #chatbot-button img { width: 60px; height: 60px; }
        #chatbot-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 450px;
            background: #f8f6d7;
            border: 3px solid #014421;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 9999;
        }
        #chatbot-header {
            background: #014421;
            color: white;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        #chatbot-logo { height: 45px; margin-right: 20px; }
        #chatbot-title { font-weight: bold; font-family: "Mochiy Pop P One", sans-serif; flex-grow: 1; }
        #chatbot-close { cursor: pointer; font-size: 20px; }
        #chatbot-messages {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #chatbot-input-container {
            display: flex;
            background: #014421;
            border-top: 3px solid #014421;
            border-radius: 40px;
            margin: 10px;
            align-items: center;
        }
        #chatbot-input {
            flex: 1;
            border: none;
            padding: 10px 15px;
            background: transparent;
            color: white;
            outline: none;
            font-size: 14px;
        }
        #chatbot-send {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 10px;
        }
        #chatbot-send img {
            width: 35px;
            height: 35px;
            filter: invert(100%);
        }
        .chatbot-user, .chatbot-bot {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
            display: inline-block;
        }
        .chatbot-user {
            align-self: flex-end;
            background-color: #dcf8c6;
            color: #014421;
        }
        .chatbot-bot {
            align-self: flex-start;
            background-color: #ffffff;
            color: #333;
        }
        .loading-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid #ccc;
            border-top: 3px solid #014421;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Abrir / Fechar
    chatButton.onclick = () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    };
    chatWindow.querySelector('#chatbot-close').onclick = () => {
        chatWindow.style.display = 'none';
    };

    // Função enviar mensagem
    async function sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        input.value = '';

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chatbot-bot';
        loadingDiv.innerHTML = '<span class="loading-spinner"></span>';
        const msgContainer = document.getElementById('chatbot-messages');
        msgContainer.appendChild(loadingDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        try {
            const response = await fetch('https://j1vx08fk-5678.brs.devtunnels.ms/webhook/854101d5-f9fa-4af2-aa3c-b7b24ed67556', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    APIkey: 'teste',
                    keyUUID: uuid,
                    Message: message
                })
            });

            const data = await response.json();
            loadingDiv.remove();
            appendMessage('bot', data.output || 'Resposta recebida.');
        } catch (error) {
            loadingDiv.remove();
            appendMessage('bot', 'Erro ao conectar com o servidor.');
            console.error(error);
        }
    }

    function appendMessage(sender, text) {
        const msgContainer = document.getElementById('chatbot-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'chatbot-user' : 'chatbot-bot';
        msgDiv.textContent = text;
        msgContainer.appendChild(msgDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    document.getElementById('chatbot-send').onclick = sendMessage;
    document.getElementById('chatbot-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
});
