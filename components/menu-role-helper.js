export default class MenuHeader extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback() {
        const usersData = JSON.parse(sessionStorage.getItem("usersData"));
        alert("menu " + usersData.id)
        this.createHeader(usersData.fio);
    }

    async createHeader(fio) {
        const mainDiv = document.createElement('div');
        mainDiv.className = 'd-flex flex-row gap-3';
        
        const kladoshchikDiv = document.createElement('div');
        kladoshchikDiv.className = 'milligram-beige-font';
        kladoshchikDiv.style.fontSize = '25px';
        kladoshchikDiv.textContent = 'Кладовщик';
        
        const fioDiv = document.createElement('div');
        fioDiv.className = 'milligram-purple-font';
        fioDiv.style.fontSize = '25px';
        fioDiv.textContent = fio;
      
        mainDiv.appendChild(kladoshchikDiv);
        mainDiv.appendChild(fioDiv);
      
        this.appendChild(mainDiv);
    }
}

customElements.define("menu-header", MenuHeader);