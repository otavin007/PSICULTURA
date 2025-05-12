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
                       <a href="index.html">Mapa</a>
                       <a href="sobre.html">Biomas</a>
                       <a href="equipe.html">Equipe do Projeto</a>
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
   