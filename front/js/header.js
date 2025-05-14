function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
           <header class="header">
               <div class="header-container">
                   <div class="logo">
                       <img src="fotos/logocorreto.png" alt="AquaBioma Logo">
                       <div class="logo-text mochiy-pop-p-one-regular">Aqua<span>Bioma</span></div>
                   </div>
                   <nav class="nav-menu mochiy-pop-p-one-regular">
                       <a href="index.html">Mapa</a>
                       <a href="sobre.html">Sobre o Projeto</a>
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
   