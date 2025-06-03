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
    chatWindow.style.display = 'none';
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
            background: #f8f6d7; /* Cor de fundo clara */
            border: 3px solid #014421;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: none; /* Escondido por padrão, mostrado pelo JS */
            flex-direction: column;
            overflow: hidden;
            z-index: 9999;
        }

        #chatbot-header {
            background: #014421; /* Verde escuro */
            color: white;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            /* Certifique-se que a fonte está carregada se usá-la aqui */
            font-family: "Mochiy Pop P One", sans-serif;
        }
        #chatbot-logo { height: 45px; margin-right: 20px; }
        #chatbot-title { font-weight: bold; flex-grow: 1; }
        #chatbot-close { cursor: pointer; font-size: 20px; padding: 0 5px; }

        #chatbot-messages {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            gap: 15px; /* Aumente o gap para dar mais espaço entre as bolhas com peixes */
            padding-bottom: 25px; /* Adicione padding inferior para a última mensagem */
        }

        #chatbot-input-container {
            display: flex;
            background: #014421; /* Verde escuro */
            border-top: 3px solid #014421;
            border-radius: 40px;
            margin: 10px;
            align-items: center;
            padding: 0 10px; /* Padding dentro do input container */
        }
        #chatbot-input {
            flex: 1;
            border: none;
            padding: 10px 0; /* Ajuste o padding aqui, padding lateral no container */
            background: transparent;
            color: white;
            outline: none;
            font-size: 14px;
            margin-right: 5px; /* Espaço entre input e botão */
        }
        #chatbot-input::placeholder {
             color: rgba(255, 255, 255, 0.7); /* Placeholder mais claro */
        }

        #chatbot-send {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0; /* Remova padding do botão */
        }
        #chatbot-send img {
            width: 35px;
            height: 35px;
            filter: invert(100%); /* Imagem branca no fundo escuro */
        }

        /* Estilo base para as bolhas de mensagem */
        .chatbot-message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
            position: relative; /* Pai com position: relative para o peixe absoluto */
            border: 4px solid; /* Borda colorida */
            background-color: #fefae0; /* Fundo amarelado */
            overflow: visible; /* Garante que o peixe absoluto fora do padding seja visível */
            display: block; /* Use block para ocupar a largura máxima permitida pelo max-width */
        }

        /* Estilo para mensagens do usuário */
        .chatbot-message.user {
            align-self: flex-end; /* Alinha a bolha inteira à direita */
            border-color: #a8d5a2; /* Borda verde clara */
            padding-right: 40px; /* Adiciona padding para dar espaço ao peixe na direita */
            max-width: 60%; /* Define a largura máxima da mensagem */
        }

        /* Estilo para mensagens do bot */
        .chatbot-message.bot {
            align-self: flex-start; /* Alinha a bolha inteira à esquerda */
            border-color: #84b6f4; /* Borda azul clara */
            padding-left: 40px; /* Adiciona padding para dar espaço ao peixe na esquerda */
            max-width: 60%; /* Define a largura máxima da mensagem */
        }

        /* Estilo para o ícone do peixe */
        .fish-icon {
            width: 30px; /* Tamanho do peixe */
            height: auto; /* Mantém proporção */
            position: absolute; /* Posicionamento absoluto */
            bottom: 3px; /* Distância da parte inferior da bolha */
        }

        /* Posicionamento do peixe para mensagens do usuário (canto inferior direito) */
        .chatbot-message.user .fish-icon {
            right: 3px; /* Distância da parte direita da bolha */
            left: auto; /* Garante que não haja left definido */
        }

        /* Posicionamento do peixe para mensagens do bot (canto inferior esquerdo) */
        .chatbot-message.bot .fish-icon {
            left: 3px; /* Distância da parte esquerda da bolha */
            right: auto; /* Garante que não haja right definido */
        }

        .message-text {
            /* O texto flui normalmente dentro da bolha. */
            /* flex: 1; -- Não necessário com position: absolute no peixe */
        }

        /* Estilo para o spinner de carregamento */
        .loading-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid #ccc;
            border-top: 3px solid #014421; /* Cor da parte que gira */
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block; /* Mostra o spinner */
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Lógica para abrir / fechar a janela do chat
    chatButton.onclick = () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        // Se abrir, role para o fim das mensagens
        if (chatWindow.style.display === 'flex') {
            const msgContainer = document.getElementById('chatbot-messages');
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }
    };
    chatWindow.querySelector('#chatbot-close').onclick = () => {
        chatWindow.style.display = 'none';
    };

    // Função assíncrona para enviar mensagem e receber resposta
    async function sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim(); // Remove espaços em branco extras
        if (message === '') return; // Não envia mensagens vazias

        // Adiciona a mensagem do usuário
        appendMessage('user', message);
        input.value = ''; // Limpa o input

        // Adiciona um spinner de carregamento enquanto espera a resposta
        const msgContainer = document.getElementById('chatbot-messages');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chatbot-bot'; // Usa a classe do bot para alinhar à esquerda
        loadingDiv.innerHTML = '<span class="loading-spinner"></span>';
        msgContainer.appendChild(loadingDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight; // Rola para o fim

        try {
            // URL do seu webhook - substitua se necessário
            const response = await fetch('https://j1vx08fk-5678.brs.devtunnels.ms/webhook/854101d5-f9fa-4af2-aa3c-b7b24ed67556', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    APIkey: 'teste', // Sua chave de API
                    keyUUID: uuid, // UUID da sessão
                    Message: message // A mensagem do usuário
                })
            });

            const data = await response.json();

            // Remove o spinner antes de adicionar a resposta
            loadingDiv.remove();

            // Adiciona a resposta do bot
            // Use data.output se for onde a resposta está, caso contrário use data inteira ou uma mensagem padrão
            appendMessage('bot', data.output || JSON.stringify(data) || 'Resposta recebida.');

        } catch (error) {
            // Em caso de erro, remove o spinner e mostra uma mensagem de erro
            loadingDiv.remove();
            appendMessage('bot', 'Erro ao conectar com o servidor ou receber resposta.');
            console.error('Erro ao enviar mensagem:', error);
        }
    }

    // Função para adicionar uma mensagem ao chat
    function appendMessage(sender, text) {
        const msgContainer = document.getElementById('chatbot-messages');
        const msgDiv = document.createElement('div');
        // Adiciona a classe 'user' ou 'bot' à div principal da mensagem
        msgDiv.className = sender === 'user' ? 'chatbot-message user' : 'chatbot-message bot';

        // Cria a div para o texto
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text'; // Classe para estilizar o texto
        textDiv.textContent = text; // Define o conteúdo do texto

        // Cria o elemento de imagem para o peixe
        const fishImg = document.createElement('img');
        // Define a fonte da imagem com base no remetente
        fishImg.src = sender === 'user' ? 'fotos/chat/pergunta.png' : 'fotos/chat/resposta.png';
        fishImg.className = 'fish-icon'; // Classe para estilizar o ícone do peixe
        fishImg.alt = sender === 'user' ? 'Ícone de pergunta' : 'Ícone de resposta'; // Alt text acessível

        // Adiciona o texto e o ícone à div da mensagem.
        // A ordem de adição aqui não afeta a posição visual final do peixe,
        // pois ele tem position: absolute.
        msgDiv.appendChild(textDiv);
        msgDiv.appendChild(fishImg);

        // Adiciona a div da mensagem completa ao contêiner de mensagens
        msgContainer.appendChild(msgDiv);

        // Rola automaticamente para a última mensagem
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // Adicionar listeners para enviar mensagem (clique no botão e Enter no input)
    document.getElementById('chatbot-send').onclick = sendMessage;
    document.getElementById('chatbot-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede a quebra de linha padrão em alguns navegadores
            sendMessage();
        }
    });

    // Opcional: Adicionar uma mensagem de boas-vindas ao carregar
    // setTimeout(() => {
    //     appendMessage('bot', 'Oi! 👋 Vejo que você está testando... Tudo certo por aí? Se precisar de ajuda com alguma coisa sobre peixes, piscicultura ou biomas, é só me falar! 😊');
    // }, 500); // Pequeno delay para parecer que o bot "digita"
});