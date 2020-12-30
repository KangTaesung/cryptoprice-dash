import { LitElement, html } from '@polymer/lit-element';

class AddItem extends LitElement {
    static get properties() {
        return {
            todoList: Array,
            todoItem: String
        }
    }

    constructor(){
        super();
        this.todoItem = '';
    }

    inputKeypress(e) {
        if(e.keyCode == 13) {
            this.onAddItem();
        } else {
            this.todoItem = e.target.value;
        }
    }

    onAddItem() {
        if (this.todoItem.length > 0) {
            let storedTodoList = JSON.parse(localStorage.getItem('todo-list'));
        storedTodoList = storedTodoList === null ? [] : storedTodoList;

        storedTodoList.push({
            id: new Date().valueOf(),
                item: this.todoItem,
                done: false
        });

        localStorage.setItem('todo-list', JSON.stringify(storedTodoList));

        this.dispatchEvent(new CustomEvent('addItem', 
            {
                bubbles: true, 
                composed: true, 
                detail: {
                    todoList: storedTodoList
                }
            }));

        }
    }

    render() {
        return html`
        <div>
            <input value=${this.todoItem}
            @keyup="${this.inputKeypress}">
            <button @click="${this.onAddItem}">Add Item</button>
        </div>
        `;
    }

}

customElements.define('add-item', AddItem)