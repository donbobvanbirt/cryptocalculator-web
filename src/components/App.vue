<template lang="html">
    <div class="input-container">
        <!-- <h2 is="sui-header" icon>
            <sui-icon name="vuejs" />
            Vue Template
            <sui-header-subheader>
                A simple boilerplate built with Vue.js, Webpack 4, and Semantic UI
            </sui-header-subheader>
        </h2> -->
        <sui-input v-on:keyup="enterValOne" v-model="valOne" />
        <sui-input v-model="valTwo" v-on:keyup="enterValTwo" />
    </div>
</template>

<script>
import { isNumber } from 'lodash'

export default {
  name: 'app',
  data: function() {
    return {
      valOne: '1',
      valTwo: '2',
      exchangeRate: '2'
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
</style>

