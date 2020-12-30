import {PolymerElement, html} from '@polymer/polymer/polymer-element';

export class CryptopriceDash extends PolymerElement {
    static get is() {
        return 'cryptoprice-dash';
    }

    constructor() {
        super();
    }

    static get template() {
        return html`
        <h2>Hello world!</h2>
        `;
    }
}

customElements.define(CryptopriceDash.is, CryptopriceDash);