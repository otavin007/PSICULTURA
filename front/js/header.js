function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
           <header class="header">
               <div class="header-container">
                   <div class="logo">
                       <img src="fotos/logo.webp" alt="AquaBioma Logo">
                       <div class="logo-text">Aqua<span>Bioma</span></div>
                   </div>
                   <nav class="nav-menu arimo-regular">
                       <a href="#biomas">Biomas</a>
                       <a href="#sobre">Sobre</a>
                       <a href="#equipe">Equipe do Projeto</a>
                       <a href="#contato">Contato</a>
                   </nav>
               </div>
           </header>
       `;
    return header;
}

// Inserir header automaticamente ao carregar o script
document.addEventListener('DOMContentLoaded', () => {
    document.body.prepend(createHeader());
});
   