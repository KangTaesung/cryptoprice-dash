import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-input/iron-input'

export class ProtoElement extends PolymerElement {
    static get is() {
        return 'proto-element';
    }

    static get properties() {
        return {
            owner: {
                type: String,
                value: ""
            }
        }
    }

    constructor() {
        super();
    }

    static get template() {
        return html`
        <p>This is <b>{{owner}}'s</b> proto-element</p>
        <iron-input bind-value="{{owner}}">
            <input value="{{value::input}}" placeholder="Type in your name...">
        </iron-input>
        `;
    }

    ready() {
        super.ready();
    }
}
customElements.define(ProtoElement.is, ProtoElement);