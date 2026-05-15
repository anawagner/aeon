class App extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello, AEON!';
  }
}

export const registerApp = () => {
  customElements.define('a-app', App);
};
