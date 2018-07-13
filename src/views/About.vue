<template>
<div id='page'>
  <div id='grid'>
    <ag-grid-vue style='height: 100%; width: 100%'
                class='ag-theme-balham'
                :gridOptions='gridOptions'
                :rowData='rowData'
                :onGridReady='onGridReady'
                :rowDataChanged='onRowDataChanged'
                :gridSizeChanged='onGridSizeChanged'
                :rowClicked='onRowClicked'
                :pagination=true
                :singleClickEdit=true>
    </ag-grid-vue>
  </div>
    <div id='bar'>
    <v-dialog v-model='dialog' persistent max-width='290'>
      <v-btn slot='activator' color='primary' dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class='headline'>Matchup</v-card-title>
        <v-card-text v-if='selection.vname && selection.hname'>{{selection.vname | caps}} @ {{selection.hname | caps}}</v-card-text>
        <v-text-field v-model="selection.spread" label='Spread' solo />
        <v-select v-model="selection.fav" v-if='opponents' :items='opponents' label='Favorite' solo />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='green darken-1' flat @click.native='dialog = false'>Disagree</v-btn>
          <v-btn color='green darken-1' flat @click.native='dialog = false;update(selection)'>Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import Vue from 'vue'
import moment from 'moment'
import NflSpread from '@/components/NflSpread'

export default {
  name: 'About',
  data () {
    return {
      dialog: false,
      rowData: null,
      gridOptions: null,
      selection: {'spread': 0, 'fav': ""},
      opponents: null,
      week: 1
    }
  },
  components: {
    AgGridVue
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
      this.gridOptions.api.sizeColumnsToFit()
    },
    onRowDataChanged () {
      Vue.nextTick ( () => {
        this.gridOptions.api.sizeColumnsToFit()
      })
    },
    onRowClicked () {
      var selectedRows = this.gridOptions.api.getSelectedRows();
      this.selection = selectedRows[0];
      var h = this.selection.hname.toUpperCase()
      var v = this.selection.vname
      this.opponents = [v,h]
      this.dialog = true
    },
    onGridSizeChanged () {
      this.gridOptions.api.sizeColumnsToFit()
    },
    load () {
      const api = `http://localhost:3000/games?week=` + this.week
      Vue.axios
        .get(api)
        .then(response => {
          this.rowData = response.data
        })
        .catch(error => {
          this.errMsg = 'Week not found [' + error + ']'
          this.rowData = []
      })
    },
    update (matchup) {
      Vue.axios
        .patch('http://localhost:3000/games/' + matchup.id, matchup) 
        .then(res => {
          this.load ()
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  created () {
    this.gridOptions = {
      rowSelection:'single'
    }
    this.gridOptions.columnDefs = [
      { headerName: 'Week', field: 'week', minWidth: 80, maxWidth: 80 },
      { headerName: 'Game Day', field: 'id', minWidth: 120, maxWidth: 170, cellRenderer: function(params) {
          return moment(('' + params.value).substring(0, ('' + params.value).length - 2), 'YYYYMMDD').format('dddd, MMM Do, YYYY')
        } 
      },
      { headerName: 'Time', field: 'time', minWidth: 80, maxWidth: 80 },
      { headerName: 'Matchup', field: 'id', minWidth: 150, maxWidth: 150, cellRenderer: function(params) {
          return params.node.data.visitor.toUpperCase() + ' @ ' + params.node.data.home.toUpperCase()
        } 
      },
      {
        headerName: 'Favorite',
        field: 'fav',
        minWidth: 100, 
        maxWidth: 100
      },
      {
        headerName: 'Spread',
        field: 'spread',
        cellEditorFramework: NflSpread,
        editable: true,
        minWidth: 70, 
        maxWidth: 100
      },
      {
        headerName: 'Home Score',
        field: 'hpts',
        cellEditorFramework: NflSpread,
        editable: true,
        minWidth: 70, 
        maxWidth: 120
      },
      {
        headerName: 'Visitor Score',
        field: 'vpts',
        cellEditorFramework: NflSpread,
        editable: true,
        minWidth: 70, 
        maxWidth: 120
      },
      {
        headerName: '',
        field: '',
        minWidth: 0
      }
    ]
    this.load ()
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

<style lang='scss'>

#page {
  position:absolute;
  top: 0px;
  left: 6px;
  right: 6px;
  bottom: 0px;
}

#grid {
  position:absolute;
  top: 52px;
  left: 6px;
  right: 6px;
  bottom: 0px;
}

#bar {
  position:absolute;
  top: 2px;
  left: 6px;
  right: 6px;
}

.ag-theme-balham .ag-cell-inline-editing select {
    height: 100% !important;
}
</style>
