<template>

  <v-app dark>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title active-class exact to='/'>NFL Guru</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn active-class exact dark flat to='about'>ag-Grid</v-btn>
        <v-btn active-class exact dark flat to='schedule'>Schedule</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div id='mdi'>
      <router-view/>
    </div>
    <v-bottom-nav
      :value='true'
      absolute
      height='40'
      background-color='#dedede'
    >
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-bottom-nav>
  </v-app>

</template>

<style lang='scss'>

#mdi {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:absolute;
  top: 57px;
  left: 0px;
  right: 0px;
  bottom: 48px;
  background-image:
    linear-gradient(
     #ffffff, rgb(52, 96, 214), #ffffff
    );
}
</style>
