(function () {
    // Gerar UUID e salvar em sessionStorage
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

    // Criar botão flutuante
    const chatButton = document.createElement('div');
    chatButton.id = 'chatbot-button';
    chatButton.innerHTML = '💬';
    document.body.appendChild(chatButton);

    // Criar janela do chat
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.innerHTML = `
        <div id="chatbot-header">Assistente Virtual <span id="chatbot-close">×</span></div>
        <div id="chatbot-messages"></div>
        <div id="chatbot-input-container">
            <input type="text" id="chatbot-input" placeholder="Digite sua mensagem...">
            <button id="chatbot-send">Enviar</button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    // Estilos CSS embutidos
    const style = document.createElement('style');
    style.innerHTML = `
        #chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: #0b6ef5;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 9999;
            font-size: 24px;
        }
        #chatbot-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 300px;
            height: 400px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 9999;
        }
        #chatbot-header {
            background: #0b6ef5;
            color: white;
            padding: 10px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #chatbot-messages {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            font-family: sans-serif;
        }
        #chatbot-input-container {
            display: flex;
            border-top: 1px solid #ccc;
        }
        #chatbot-input {
            flex: 1;
            border: none;
            padding: 10px;
        }
        #chatbot-send {
            background: #0b6ef5;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
        }
        .chatbot-user, .chatbot-bot {
            margin-bottom: 10px;
        }
        .chatbot-user {
            text-align: right;
            color: #0b6ef5;
        }
        .chatbot-bot {
            text-align: left;
            color: #333;
        }
    `;
    document.head.appendChild(style);

    // Lógica de abrir/fechar chat
    chatButton.onclick = () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    };
    document.getElementById('chatbot-close').onclick = () => {
        chatWindow.style.display = 'none';
    };

    // Função para enviar mensagem
    async function sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (message === '') return;

        appendMessage('user', message);

        // Requisição POST
        try {
            const response = await fetch('http://localhost:5678/webhook/854101d5-f9fa-4af2-aa3c-b7b24ed67556', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    APIkey: 'teste',
                    keyUUID: uuid,
                    Message: message
                })
            });

            const data = await response.json();
            appendMessage('bot', data.reply || 'Resposta recebida.');
        } catch (error) {
            appendMessage('bot', 'Erro ao conectar com o servidor.');
            console.error(error);
        }

        input.value = '';
    }

    // Função para adicionar mensagens na tela
    function appendMessage(sender, text) {
        const msgContainer = document.getElementById('chatbot-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'chatbot-user' : 'chatbot-bot';
        msgDiv.textContent = text;
        msgContainer.appendChild(msgDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // Eventos de enviar
    document.getElementById('chatbot-send').onclick = sendMessage;
    document.getElementById('chatbot-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
})();
