import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //auth
        token: localStorage.getItem('token') || null,
        email: null,
        authErrorMessage: null,
        //chats
        allResponse: null,
        last30Days: null,
        //queries
        query: null,
        allQueries: null
    },
    getters: {
        token: state => state.token,
        email: state => state.email,
        authErrorMessage: state => state.authErrorMessage,
        allResponse: state => state.allResponse,
        query: state => state.query,
        allQueries: state => state.allQueries,
        last30Days: state => state.last30Days
    },
    mutations: {
        setToken: (state, payload) => { state.token = payload },
        setEmail: (state, payload) => { state.email = payload },
        setAuthErrorMessage: (state, payload) => { state.authErrorMessage = payload },
        //chats
        setAllResponses: (state, payload) => { state.allResponse = payload },
        setLast30Days: (state, payload) => { state.last30Days = payload },
        //queries
        setQuery: (state, payload) => { state.query = payload },
        setAllQueries: (state, payload) => { state.allQueries = payload }
    },
    actions: {
        signup: async({ commit }, payload) => {
            try {
                const result = await axios.post('/auth/signup', { email: payload.email, password: payload.password });
                if (result.data.status) {
                    localStorage.setItem('token', result.data.token)
                    commit('setToken', result.data.token)
                    commit('setEmail', result.data.email)
                    router.push({ name: 'Dashboard' })
                }
                commit('setAuthErrorMessage', result.data.msg)

            } catch (error) {
                console.log(error)
            }
        },
        login: async({ commit }, payload) => {
            try {
                const result = await axios.post('/auth/login', { email: payload.email, password: payload.password });
                if (result.data.status) {
                    localStorage.setItem('token', result.data.token)
                    commit('setToken', result.data.token)
                    commit('setEmail', result.data.email)
                    router.push({ name: 'Dashboard' })
                }
                commit('setAuthErrorMessage', result.data.msg)
            } catch (error) {
                console.log(error)
            }
        },
        logout: ({ commit }) => {
            localStorage.removeItem('token')
            commit('setToken', null)
            router.push({ name: 'Index' })
        },

        // RESPONSE
        // get single response
        getResponse: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/response/get/${payload}`);
                return result.data;
            } catch (error) {
                console.log(error)
            }
        },
        // get all response only, does not combine with query
        getAllResponse: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/response/getAll/${payload}`);
                commit('setAllResponses', result.data)
            } catch (error) {
                console.log(error)
            }
        },

        // BOTS
        // get single Bot
        getQuery: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/query/get/${payload}`);
                commit('setQuery', result.data);
            } catch (error) {
                console.log(error)
            }
        },
        // get all bots
        getAllQueries: async({ commit }) => {
            try {
                const result = await axios.get(`/query/getAll`);
                commit('setAllQueries', result.data)
            } catch (error) {
                console.log(error)
            }
        },

        getLast30Days: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/response/getLast30Days/${payload}`);
                console.log(result.data)
                commit('setLast30Days', result.data)
            } catch (error) {
                console.log(error)
            }
        },

        changeQueryStatus: async({ commit }, payload) => {
            try {
                const result = await axios.put(`/query/changeStatus/${payload}`);
                commit('setQuery', result.data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    plugins: [createPersistedState()],
    modules: {}
})