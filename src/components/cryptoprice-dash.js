import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/iron-ajax/iron-ajax';
import 'chart.js/dist/Chart';
import 'moment/min/moment.min';
import '@polymer/paper-button/paper-button';

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
                        name: 'Bitcoin',
                        price: 0
                    },
                    {
                        code: 'ETH',
                        name: 'Ethereum',
                        price: 0
                    },
                    {
                        code: 'LTC',
                        name: 'Litecoin',
                        price: 0
                    }
                ]
            },
            loading: {
                type: Boolean,
                notify: true,
                value: false
            },
            myLineChart: {

            }
        }
    }

    ready() {
        super.ready();
        afterNextRender(this, function() {
            this._getCurrencyData(this.currencies);
            this._getCurrencyHistoricData(this.currencies[0].code);
        });
    }

    _getCurrencyData(currencies) {
        let ajax = this.$.coinbase;
        currencies.forEach(element => {
            ajax.url = 'https://api.coinbase.com/v2/prices/' + element.code + '-USD/spot';
            ajax.generateRequest();
        });
    }

    _getCurrencyHistoricData(currency) {
        if (currency.target !== undefined) {
            currency = currency.target.dataset.item;
        }
        let ajax = this.$.coinbase;
        ajax.url = 'https://api.coinbase.com/v2/prices/' + currency + '-USD/historic?period=week';
        ajax.generateRequest();
    }

    _handleResponse(response) {
        if (response.detail.response.data.amount != null) {
            this._computeCurrencyPrice(response.detail);
        } else {
            this._computeGraph(response.detail);
        }
    }

    _computeCurrencyPrice(data) {
        let code = data.url.substring(35, 38);
        let index = this.currencies.map((e) => {
            return e.code;
        }).indexOf(code);
        this.set('currencies.' + index + '.price', data.response.data.amount);
    }

    _computeGraph(data) {
        let code = data.url.substring(35, 38);
        let label = [];
        let price = [];
        data.response.data.prices.forEach(element => {
            label.push(this._computeDateTime(element.time));
            price.push(element.price);
        });
        this._generateLineChart(label, price, code);
    }

    _computeDateTime(dateString) {
        if(dateString) {
            return moment(dateString, "YYYY-MM-DDThh:mm:aaZ").format('M/DD/YYYY h:mm a');
        }
        return dateString;
    }

    _generateLineChart(label, price, labelName) {
        if (this.myLineChart !== undefined) this.myLineChart.destroy();
        let ctx = this.$.canvas.getContext('2d');
        this.myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: label.reverse(),
                datasets: [
                    {
                        pointRadius: 0,
                        label: labelName,
                        backgroundColor: "rgba(111, 124, 186, 0.1)",
                        borderColor: "rgba(111, 124, 186, 1)",
                        borderWidth: 2,
                        data: price.reverse()
                    }
                ]
            },
            options: {
                animation: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        });
    }

    constructor() {
        super();
    }

    static get template() {
        return html`
        <h2>Hello world!</h2>
        <iron-ajax id="coinbase" handle-as="json" on-response="_handleResponse" loading="{{loading}}"></iron-ajax>
        <paper-spinner-lite .active="[[loading]]"></paper-spinner-lite>
        <div hidden$="[[loading]]">
            <template is="dom-repeat" items="[[currencies]]">
                <paper-button noink on-click="_getCurrencyHistoricData" data-item$="[[item.code]]">
                [[item.name]] - $[[item.price]]
                </paper-button>
            </template>
        </div>
        <div hidden$="[[loading]]" style="width:100%; max-width:700px; margin:0 auto">
            <canvas height="2" width="4" id="canvas"></canvas>
        </div>
        
        `;
    }
}

customElements.define(CryptopriceDash.is, CryptopriceDash);