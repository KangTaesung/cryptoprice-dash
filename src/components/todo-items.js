import {LitElement, html} from '@polymer/lit-element';

class TodoItem extends LitElement {
    static get properties() {
        return {
            todoItem: Object
        }
    }

    constructor() {
        super();
        this.todoItem = {};
    }

    onRemove(id) {
        this.dispatchEvent(new CustomEvent('removeItem', 
        {
            bubbles: true, 
            composed: true, 
            detail:{
                itemId: id
            }
        }));
        
    }

    onDone(id) {
        this.dispatchEvent(new CustomEvent('changeItem',
        {
            bubbles: true,
            composed: true,
            detail: {
                itemId: id
            }
        }
        ));
        this.requestUpdate();
    }

    render() {
        return html`<li>
        <input type="checkbox" .checked="${JSON.parse(this.todoItem).done}" @click="${() => this.onDone(JSON.parse(this.todoItem).id)}">
        ${JSON.parse(this.todoItem).item}
        <button @click="${() => this.onRemove(JSON.parse(this.todoItem).id)}"></button>
        </li>
        `;
    }
}

customElements.define('todo-item', TodoItem);