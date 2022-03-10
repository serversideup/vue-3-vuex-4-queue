<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <br>

  <button @click="populateQueue()">Populate Queue</button>

  <br>

  <button @click="clearPendingJobs()">Clear Pending Jobs</button>

  <br>

  <button @click="clearCompletedJobs()">Clear Completed Jobs</button>

  <queue-controller/>

</template>

<script>

import QueueController from './components/QueueController.vue';

export default {
  name: 'App',
  components: {
    QueueController
  },

  methods: {
    populateQueue(){
      for( let i = 0; i < 50; i++ ){
        this.$store.dispatch('queue/addJob', {
          id: i,
          handler: function( ){
            // If you run this, just to slow down so the jobs just don't
            // complete instantly.
            setTimeout(function(){
              // Your functionality here.
              this.$store.dispatch('queue/startNextJob');
            }.bind(this), 3000);
          }.bind(this)
        });
      }
    },

    clearPendingJobs(){
      this.$store.dispatch('queue/clearPendingJobs');
    },

    clearCompletedJobs(){
      this.$store.dispatch('queue/clearCompletedJobs');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
