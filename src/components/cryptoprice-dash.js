import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status';
import '@polymer/iron-ajax/iron-ajax.js';

export class CryptopriceDash extends PolymerElement {
    static get is() {
        return 'cryptoprice-dash';
    }

    static get properties() {
        return {
            currencies: {
                type: Array,
                value: [
                    {
                        code: 'BTC',
                        name: 'Bitcoin'
                    },
                    {
                        code: 'ETH',
                        name: 'Ethereum'
                    },
                    {
                        code: 'LTC',
                        name: 'Litecoin'
                    }
                ]
            }
        }
    }

    ready() {
        super.ready();
        afterNextRender(this, function() {
            this.getCurrencyData(this.currencies);
        });
    }

    getCurrencyData(currencies) {
        let ajax = this.$.coinbase;
        currencies.forEach(element => {
            ajax.url = 'https://api.coinbase.com/v2/prices/' + element.code + '-USD/spot';
            ajax.generateRequest();
        });
    }

    handleResponse(response) {
        console.log(response);
    }

    constructor() {
        super();
    }

    static get template() {
        return html`
        <h2>Hello world!</h2>
        <iron-ajax id="coinbase" handle-as="json" on-response="handleResponse">
        </iron-ajax>
        `;
    }
}

customElements.define(CryptopriceDash.is, CryptopriceDash);