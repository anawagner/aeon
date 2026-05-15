class Badge extends HTMLElement {
  #span;

  connectedCallback() {
    if (!this.#span) {
      this.#span = document.createElement('span');
      this.#span.className = 'a-badge-label';
    }
    this.insertBefore(this.#span, this.firstChild);
    this.update();
  }

  update() {
    if (this.#span) this.#span.textContent = this.getAttribute('content');
  }

  static get observedAttributes() {
    return ['contnet'];
  }

  attributeChangedCallback() {
    this.update();
  }

  set content(value) {
    if (this.getAttribute('conent') !== value) {
      this.setAttribute('content', value);
    }
  }

  get content() {
    return this.getAttribute('content');
  }
}

export const registerBadge = () => customElements.define('a-badge', Badge);
