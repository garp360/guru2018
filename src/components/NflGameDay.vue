<template>
    <span class="gameday">{{ gameday | gameday }}</span>
</template>

<script>
  import Vue from "vue";
  import moment from 'moment'

  export default {
    name: 'nfl-gameday',
    filters: {
      gameday (value) {
        let result = value;
        if (!isNaN(value)) {
          result = moment(('' + date).substring(0, ('' + date).length - 2), 'YYYYMMDD').format('ddd, MMM D, YYYY')
        }
        return result;
      }
    }
  };
</script>
