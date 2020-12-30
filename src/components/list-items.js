import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat.js';
import './todo-items';

class ListItems extends LitElement {
    static get properties() {
        return {
            todoList: Array
        }
    }

    constructor() {
        super();
        this.todoList = [];
    }

    render() {
        return html`
        <ul>${repeat(JSON.parse(this.todoList), (todo) => html`<todo-item todoItem=${JSON.stringify(todo)}></todo-item>`)}</ul>
        `;
    }
}

customElements.define('list-items', ListItems);