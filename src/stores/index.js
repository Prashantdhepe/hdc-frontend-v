import {createStore} from "vuex";

// Here after we will import all the required modules
import serviceModule from './services/index.js';

const store = createStore({
    modules: {
        services: serviceModule,
    },
    state: {

    },
    actions: {
        /*async saveContact({ commit }, payload)
        {
            return await axiosClient
                .post(`/contacts/store`, payload)
        }*/
    },
    getters: {},
    mutations: {}
});

export default store;
