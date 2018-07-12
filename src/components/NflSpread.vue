<template>
<input :ref="'input'" v-model='value' style='height:100%;width:100%;'/>
<!-- <v-text-field
	:ref='value' 
	v-model='value'
	label="Regular"
	placeholder="Placeholder"
></v-text-field> -->
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'nfl-spread',
  data () {
		return {
			value: 0,
			cancelBeforeStart: true
		}
  },
  methods: {
		getValue () {
			return this.value
		},
		isCancelBeforeStart () {
			return this.cancelBeforeStart
		},
		isCancelAfterEnd () {
			return /^[+-][1-9]{1,2}(?:\.[0,5]{1})/.test(this.value)
		}
  },
  created () {
		this.value = this.params.value
		this.cancelBeforeStart = '+-.1234567890'.indexOf(this.params.charPress) < 0
  },
  mounted () {
		Vue.nextTick(() => {
			if (this.$refs.input) {
			this.$refs.input.focus()
			}
		})
  }
})
</script>
