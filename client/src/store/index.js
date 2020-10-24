import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate";
import { json2excel, excel2json } from 'js2excel';
import { Parser } from 'json2csv';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //auth
        token: localStorage.getItem('token') || null,
        email: null,
        authErrorMessage: null,
        verificationErrorMessage: null,
        forgotPasswordMessage: null,
        //chats
        response: null,
        allResponse: null,
        last30Days: null,
        //queries
        query: null,
        botQuery: null,
        activeQueries: null,
        allQueries: null,
        COMPONENT_LEVEL_DATA: null,
        // for transfering bot title from create.vue to publish.vue
        botTitle: null,
    },
    getters: {
        token: state => state.token,
        email: state => state.email,
        authErrorMessage: state => state.authErrorMessage,
        verificationErrorMessage: state => state.verificationErrorMessage,
        forgotPasswordMessage: state => state.forgotPasswordMessage,
        response: state => state.response,
        allResponse: state => state.allResponse,
        query: state => state.query,
        botQuery: state => state.botQuery,
        activeQueries: state => state.activeQueries,
        allQueries: state => state.allQueries,
        last30Days: state => state.last30Days,
        COMPONENT_LEVEL_DATA: state => state.COMPONENT_LEVEL_DATA,
        botTitle: state => state.botTitle,
    },
    mutations: {
        setToken: (state, payload) => { state.token = payload },
        setEmail: (state, payload) => { state.email = payload },
        setAuthErrorMessage: (state, payload) => { state.authErrorMessage = payload },
        setVerificationErrorMessage: (state, payload) => { state.verificationErrorMessage = payload },
        setForgotPasswordMessage: (state, payload) => { state.forgotPasswordMessage = payload },
        //chats
        setResponse: (state, payload) => { state.response = payload },
        setAllResponses: (state, payload) => { state.allResponse = payload },
        setLast30Days: (state, payload) => { state.last30Days = payload },
        //queries
        setQuery: (state, payload) => { state.query = payload },
        setBotQuery: (state, payload) => { state.botQuery = payload },
        setActiveQueries: (state, payload) => { state.activeQueries = payload },
        setAllQueries: (state, payload) => { state.allQueries = payload },
        set_COMPONENT_LEVEL_DATA: (state, payload) => { state.COMPONENT_LEVEL_DATA = payload },
        setBotTitle: (state, payload) => { state.botTitle = payload }
    },
    actions: {
        signup: async({ commit }, payload) => {
            try {
                const result = await axios.post('/auth/signup', { email: payload.email, password: payload.password });
                if ((result.data.status && !result.data.verified) || (!result.data.status && !result.data.verified)) {
                    commit('setEmail', result.data.email)
                    router.push({ name: 'Verify-Account' })
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
        verify: async({ commit }, payload) => {
            const result = await axios.get(`/auth/verify/${payload}`);
            if (result.data.status) {
                localStorage.setItem('token', result.data.token)
                commit('setToken', result.data.token)
                commit('setEmail', result.data.email)
                router.push({ name: 'Dashboard' })
            }
            commit('setVerificationErrorMessage', result.data.msg)
        },
        resendVerification: async({ commit }, payload) => {
            const result = await axios.get(`/auth/resendVerification/${payload}`);
            if (result.data.status) {
                console.log('verification resent')
            }
            commit('setVerificationErrorMessage', result.data.msg)
        },
        requestPasswordResetLink: async({ commit }, payload) => {
            const result = await axios.get(`/auth/sendPasswordResetLink/${payload}`);
            if (result.data.status) {
                console.log('Link sent')
                commit('setForgotPasswordMessage', result.data.msg)
            }
            console.log('Link not sent')

            commit('setForgotPasswordMessage', result.data.msg)
        },
        resetPassword: async({ commit }, payload) => {
            const result = await axios.post(`/auth/resetPassword/${payload.token}`, { password: payload.password });
            if (result.data.status) {
                router.push({ name: 'Login' })
            }
            commit('setAuthErrorMessage', result.data.msg)
        },

        // RESPONSE
        // get single response
        getResponse: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/response/get/${payload}`);
                commit('setResponse', result.data.data)
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

        addResponse: async({ commit }, payload) => {
            try {
                const result = await axios.post(`/response/add/${payload.queryId}`, payload.data);
                if (result.data.status) {
                    console.log('RESPONSE ADDED SUCCESSFULLY')
                }
            } catch (error) {
                console.log(error)
            }
        },

        // BOTS
        // get single Bot
        getQuery: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/query/get/${payload}`);
                if (result.data.status) {
                    commit('setQuery', result.data);
                }
                // show error message
            } catch (error) {
                console.log(error)
            }
        },
        // get query for actual BOT chatting
        getBotQuery: async({ commit }, payload) => {
            try {
                const result = await axios.get(`/query/get/${payload}`);
                if (result.data.status) {
                    commit('setBotQuery', result.data.data);
                }
                // show error message
            } catch (error) {
                console.log(error)
            }
        },
        // get Active Queries
        getActiveQueries: async({ commit }) => {
            try {
                const result = await axios.get(`/query/getActive`);
                if (result.data.status) {
                    commit('setActiveQueries', result.data.data);
                }
                // show error
                console.log(result.data.data)
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
        },

        addQuery: async({ commit }, payload) => {
            try {
                const result = await axios.post('/query/add', payload);
                console.log(result.data.status)
                if (result.data.status) {
                    router.push({ name: 'BotDetail', params: { 'botId': result.data.data.id } }).catch((err) => {
                        console.log('error');
                        router.push({ name: 'BotDetail', params: { 'botId': result.data.data.id } })
                        commit('set_COMPONENT_LEVEL_DATA', null)
                    });
                    commit('set_COMPONENT_LEVEL_DATA', null)
                }
                // show error message
                router.push({ name: 'Publish' })
                console.log("QUERRY ADD RESULT +>", result)
            } catch (error) {
                console.log(error)
            }
        },

        deleteQuery: async({ commit }, payload) => {
            try {
                const result = await axios.delete(`/query/delete/${payload}`);
                if (result.data.status) {
                    router.go(0)
                }
                //show error message
                router.push({ name: 'MyBots' })
            } catch (error) {
                console.log(error)
            }
        },

        downloadResponses: async({ commit }, payload) => {
            try {
                const result = await axios({ method: 'get', url: `/response/download/${payload.fmt}/${payload.queryId}` });
                console.log(result.data.data)
                if (result.data.status) {
                    if (payload.fmt === 'excel') {
                        try {
                            json2excel({
                                data: result.data.data,
                                name: 'user-info-data'
                                    // formateDate: 'yyyy/mm/dd'
                            });
                        } catch (e) {
                            console.error('export error');
                        }
                    }
                    //to download in json format
                    if (payload.fmt === 'json') {
                        const result = await axios({ method: 'get', url: `/response/download/${payload.fmt}/${payload.queryId}`, responseType: 'blob' });

                        var fileURL = window.URL.createObjectURL(new Blob([result.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', `${Date.now().toString()}.json`);
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    }

                    if (payload.fmt === 'csv') {
                        const fields = result.data.data.map((value, index) => value[index] ? value[index].query : '');
                        const opts = { fields };

                        try {
                            const parser = new Parser(opts);
                            const csv = parser.parse(result.data.data);
                            var fileURL = window.URL.createObjectURL(new Blob([csv]));
                            var fileLink = document.createElement('a');

                            fileLink.href = fileURL;
                            fileLink.setAttribute('download', `${Date.now().toString()}.csv`);
                            document.body.appendChild(fileLink);

                            fileLink.click();
                            console.log(csv);
                        } catch (err) {
                            console.error(err);
                        }
                    }



                }
                //show error message
                // router.push({ name: 'MyBots' })
            } catch (error) {
                console.log(error)
            }
        },
    },
    plugins: [createPersistedState()],
    modules: {}
})