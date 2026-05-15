/**
 * Avatar component
 * Usage:
 * <a-avatar src="path/to/image.jpg" alt="User Avatar" size="lg"></a-avatar>
 */
class Avatar extends HTMLElement {
  connectedCallback() {
    if (!this.querySelector('img')) {
      this.append(document.createElement('img'));
    }
    this.update();
  }

  static get observedAttributes() {
    return ['src', 'alt'];
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const img = this.querySelector('img');
    if (img) {
      img.src = this.getAttribute('src') || '';
      img.alt = this.getAttribute('alt') || 'avatar';
    }
  }
}

export const registerAvatar = () => {
  customElements.define('a-avatar', Avatar);
};
