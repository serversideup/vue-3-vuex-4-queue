<template>
    <div>
        <h2>Active</h2>
        <div>{{ active.id }}</div>

        <div style="display: flex; margin-top: 20px; align-items: start; justify-content: space-between; width: 75%; margin: auto">
            <div>
                <h2>Pending</h2>
                <div v-for="( job, index ) in pending"
                    v-bind:key="'pending-'+index">
                        {{ job }}

                        <button v-on:click="cancelJob( index )">Cancel Job</button>
                </div>
            </div>
            <div>
                <h2>Completed</h2>
                <div v-for="( job, index ) in completed"
                    v-bind:key="'completed-'+index">
                        {{ job }}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('queue', {
            pending: 'pending',
            active: 'active',
            completed: 'completed'
        })
    },

    watch: {
        active(){
            this.processJob();
        }
    },

    methods: {
        processJob(){
            if( this.active.handler ){
                this.active.handler();
            }
        },

        cancelJob( index ){
            this.$store.dispatch('queue/cancelJob', index );
        }
    }
}

</script>