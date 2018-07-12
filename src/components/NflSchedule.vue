<template>
  <div>
      <h1>NFL Schedule {{ year }}</h1>
      <v-container fluid class="pa-0" text-xs-center>
        <v-layout row wrap>
          <v-flex xs10 offset-xs1 class="py-2">
            <v-btn-toggle>
              <v-btn @click="search(1)" flat>1</v-btn>
              <v-btn @click="search(2)" flat>2</v-btn>
              <v-btn @click="search(3)" flat>3</v-btn>
              <v-btn @click="search(4)" flat>4</v-btn>
              <v-btn @click="search(5)" flat>5</v-btn>
              <v-btn @click="search(6)" flat>6</v-btn>
              <v-btn @click="search(7)" flat>7</v-btn>
              <v-btn @click="search(8)" flat>8</v-btn>
              <v-btn @click="search(9)" flat>9</v-btn>
              <v-btn @click="search(10)" flat>10</v-btn>
              <v-btn @click="search(11)" flat>11</v-btn>
              <v-btn @click="search(12)" flat>12</v-btn>
              <v-btn @click="search(13)" flat>13</v-btn>
              <v-btn @click="search(14)" flat>14</v-btn>
              <v-btn @click="search(15)" flat>15</v-btn>
              <v-btn @click="search(16)" flat>16</v-btn>
              <v-btn @click="search(17)" flat>17</v-btn>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-container>
      <div class="divTable blueTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="divTableHead">Date</div>
            <div class="divTableHead">Time</div>
            <div class="divTableHead">Matchup</div>
            <div class="divTableHead">Visitor</div>
            <div class="divTableHead">Home</div>
            <div class="divTableHead">Favorite</div>
            <div class="divTableHead">Spread</div>
            <div class="divTableHead">head8</div>
            <div class="divTableHead">head9</div>
            <div class="divTableHead">head10</div>
            <div class="divTableHead">head11</div>
            <div class="divTableHead">head12</div>
          </div>
        </div>
        <div v-if="games" class="divTableBody">
            <nfl-matchup v-for="game in games" :key="game.id" :game="game"/>
        </div>
      </div>
  </div>
</template>

<style>
div.blueTable {
  border: 1px solid #1c6ea4;
  background-color: #eeeeee;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
.divTable.blueTable .divTableCell,
.divTable.blueTable .divTableHead {
  border: 1px solid #aaaaaa;
  padding: 3px 2px;
}
.divTable.blueTable .divTableBody .divTableCell {
  font-size: 13px;
}
.divTable.blueTable .divTableRow:nth-child(even) {
  background: #d0e4f5;
}
.divTable.blueTable .divTableHeading {
  background: #1c6ea4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: -webkit-linear-gradient(
    top,
    #5592bb 0%,
    #327cad 66%,
    #1c6ea4 100%
  );
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  border-bottom: 2px solid #444444;
}
.divTable.blueTable .divTableHeading .divTableHead {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  border-left: 2px solid #d0e4f5;
}
.divTable.blueTable .divTableHeading .divTableHead:first-child {
  border-left: none;
}

.blueTable .tableFootStyle {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background: #d0e4f5;
  background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  background: -webkit-linear-gradient(
    top,
    #dcebf7 0%,
    #d4e6f6 66%,
    #d0e4f5 100%
  );
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  border-top: 2px solid #444444;
}
.blueTable .tableFootStyle {
  font-size: 14px;
}
.blueTable .tableFootStyle .links {
  text-align: right;
}
.blueTable .tableFootStyle .links a {
  display: inline-block;
  background: #1c6ea4;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 5px;
}
.blueTable.outerTableFooter {
  border-top: none;
}
.blueTable.outerTableFooter .tableFootStyle {
  padding: 3px 5px;
}
/* DivTable.com */
.divTable {
  display: table;
}
.divTableRow {
  display: table-row;
}
.divTableHeading {
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  display: table-cell;
}
.divTableHeading {
  display: table-header-group;
}
.divTableFoot {
  display: table-footer-group;
}
.divTableBody {
  display: table-row-group;
}
</style>

<script>
import Vue from 'vue'
import NflMatchup from '@/components/NflMatchup.vue'

export default {
  name: 'nfl-schedule',
  props: {
    year: String
  },
  components: {
    NflMatchup
  },
  data () {
    return {
      games: [],
      errMsg: ''
    }
  },
  created () {
    this.search(1)
  },
  methods: {
    search (week) {
      const api = `http://localhost:3000/games?week=` + week
      Vue.axios
        .get(api)
        .then(response => {
          this.games = response.data
        })
        .catch(error => {
          this.errMsg = 'Week not found [' + error + ']'
          this.games = []
        })
    }
  }
}
</script>
