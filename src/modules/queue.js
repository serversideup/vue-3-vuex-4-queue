export const queue = {
    namespaced: true,

    state: () => ({
        pending: [],
        completed: [],
        active: {}
    }),

    actions: {
        addJob({ commit, state, dispatch }, job ){
            commit( 'addPendingJob', job );

            if( Object.keys( state.active ).length == 0 ){
                dispatch('startNextJob');
            }
        },

        startNextJob({ commit, state }){
            if( Object.keys( state.active ).length > 0 ){
                commit( 'addCompletedJob', state.active );
            }

            if( state.pending.length > 0 ){
                commit( 'setActiveJob', state.pending[0] );
                commit( 'popCurrentJob' );
            }else{
                commit( 'setActiveJob', {} );
            }
        },

        clearPendingJobs({ commit }){
            commit( 'setPendingJobs', [] );
        },

        clearCompletedJobs({ commit }){
            commit( 'setCompletedJobs', [] );
        },

        cancelJob({ commit }, index ){
            commit( 'removeJob', index );
        }
    },

    mutations: {
        addPendingJob( state, job ){
            state.pending.push( job );
        },

        setActiveJob( state, job ){
            state.active = job;
        },
        
        popCurrentJob( state ){
            state.pending.shift();
        },

        addCompletedJob( state, job ){
            state.completed.push( job );
        },

        setPendingJobs( state, jobs ){
            state.pending = jobs;
        },

        setCompletedJobs( state, jobs ){
            state.completed = jobs;
        },

        removeJob( state, index ){
            state.pending.splice( index, 1 );
        }
    },

    getters: {
        PENDING( state ){
            return state.pending;
        },

        ACTIVE( state ){
            return state.active;
        },

        COMPLETED( state ){
            return state.completed;
        }
    }
}