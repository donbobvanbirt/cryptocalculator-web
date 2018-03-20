<template lang="html">
    <div>
        <div class="dropdown-container">
            <div class="menu-container">
                <div>{{ selectedExchange }}</div>
                <sui-dropdown>
                    <sui-dropdown-menu>
                        <sui-dropdown-item
                            v-for="exchange in availableExchanges"
                            v-bind:key="exchange"
                            v-on:click="selectExchange(exchange)"
                        >
                            {{ exchange }}
                        </sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>

            <div class="menu-container">
                <div>{{ selectedPair }}</div>
                <sui-dropdown>
                    <sui-dropdown-menu>
                        <sui-dropdown-item
                            v-for="pair in availablePairs"
                            v-bind:key="pair"
                            v-on:click="selectPair(pair)"
                        >
                            {{ pair }}
                        </sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>
        </div>

        <div v-if="tickerData" class="ticker">
            <sui-segment>
                <sui-table basic="very">
                    <sui-table-header>
                        <sui-table-row>
                            <sui-table-header-cell></sui-table-header-cell>
                            <sui-table-header-cell>Last:</sui-table-header-cell>
                            <sui-table-header-cell>{{ tickerData.last }}</sui-table-header-cell>
                            <sui-table-header-cell></sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>
                    <sui-table-body>
                        <sui-table-row>
                            <sui-table-cell>Ask:</sui-table-cell>
                            <sui-table-cell>{{ tickerData.ask }}</sui-table-cell>
                            <sui-table-cell>Bid:</sui-table-cell>
                            <sui-table-cell>{{ tickerData.bid }}</sui-table-cell>
                        </sui-table-row>
                        <sui-table-row>
                            <sui-table-cell>High</sui-table-cell>
                            <sui-table-cell>{{ tickerData.high }}</sui-table-cell>
                            <sui-table-cell>Low</sui-table-cell>
                            <sui-table-cell>{{ tickerData.low }}</sui-table-cell>
                        </sui-table-row>
                        <sui-table-row>
                            <sui-table-cell></sui-table-cell>
                            <sui-table-cell>{{ tickerData.pair }}</sui-table-cell>
                            <sui-table-cell>{{ tickerData.exchange }}</sui-table-cell>
                            <sui-table-cell></sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </sui-segment>

        </div>

        <div class="input-container">
            <sui-input v-on:keyup="enterValOne" v-model="valOne"/>
                
            <sui-input v-model="valTwo" v-on:keyup="enterValTwo" />
        </div>

        <h2 v-if="exchangeRate">{{ exchangeRate }}</h2>
    </div>
</template>

<script>
import { isNumber } from 'lodash'
import coinTicker from 'coin-ticker'

export default {
  name: 'app',
  data: function() {
    return {
      valOne: '0',
      valTwo: '0',
      exchangeRate: '0',
      availableExchanges: coinTicker(),
      selectedExchange: 'select exchange',
      selectedPair: '',
      availablePairs: [],
      errorFetchingPairs: false,
      tickerData: null
    }
  },
  methods: {
    enterValOne: function(e) {
      const value = parseFloat(e.target.value)
      if (value && isNumber(value)) {
        this.valTwo = (value * parseFloat(this.exchangeRate)).toString()
      }
    },
    enterValTwo: function(e) {
      const value = parseFloat(e.target.value)
      if (value && isNumber(value)) {
        this.valOne = (value / parseFloat(this.exchangeRate)).toString()
      }
    },
    selectExchange: function(exchange) {
      this.selectedExchange = exchange
      coinTicker(exchange, 'pairs').then(pairs => {
        if (!pairs) {
          this.errorFetchingPairs = true
        } else {
          this.errorFetchingPairs = false
          this.availablePairs = pairs
        }
      })
    },
    selectPair: function(pair) {
      this.selectedPair = pair
      coinTicker(this.selectedExchange, pair).then(tick => {
        this.tickerData = tick
        this.exchangeRate = tick.last
        this.valOne = 1
        this.valTwo = tick.last
      })
    }
  }
}
</script>

<style lang="scss">
.input-container {
  width: 100%;
  padding-top: 35px;
  display: flex;
  justify-content: space-around;
}
.dropdown-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.ticker {
  width: 500px;
  max-width: 100%;
  margin: 25px auto;
  padding: 10px;

  .ticker-list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

