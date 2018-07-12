<template>
    <div class="divTableRow">
        <div class="divTableCell">{{ game.id | gameday }}</div>
        <div class="divTableCell">{{ game.time }}</div>
        <div class="divTableCell">{{ game.vname | caps }} @ {{ game.hname | caps }}</div>
        <div class="divTableCell">{{ game.vname | caps }}</div>
        <div class="divTableCell">{{ game.hname | caps }}</div>
        <div class="divTableCell">
          <select v-model="game" :key="game.id">
            <option v-for="opponent in opponents" :key=opponent>{{ opponent | caps }}</option>
          </select>
        </div>
        <div class="divTableCell">cell7_1</div>
        <div class="divTableCell">cell8_1</div>
        <div class="divTableCell">cell9_1</div>
        <div class="divTableCell">cell10_1</div>
        <div class="divTableCell">cell11_1</div>
        <div class="divTableCell">cell12_1</div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'nfl-matchup',
  props: {
    game: {}
  },
  data () {
    return {
      fav: '',
      spread: ''
    }
  },
  computed: {
    opponents: function () {
      return [this.game.hname, this.game.vname]
    }
  },
  filters: {
    gameday: function (date) {
      return moment(('' + date).substring(0, ('' + date).length - 2), 'YYYYMMDD').format('ddd, MMM D, YYYY')
    },
    caps: function (text) {
      return text.toUpperCase()
    }
  }
}
</script>
