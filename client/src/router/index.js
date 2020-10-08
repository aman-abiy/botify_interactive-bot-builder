import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Services from '../views/Services'
import Usecases from '../views/Usecases'
import Dashboard from '../views/Dashboard'

// auth-guard
import authGuard from './auth-guard.js'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import ('../views/Signup.vue')
    },
    {
        path: '/services',
        name: 'Services',
        component: () =>
            import ('../views/Services.vue')
    },
    {
        path: '/usecases',
        name: 'Usecases',
        component: () =>
            import ('../views/Usecases.vue')
    },

    // After auth

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: authGuard
    },
    {
        path: '/myBots',
        component: () =>
            import ('../views/MyBots/Parent.vue'),
        beforeEnter: authGuard,
        children: [{
            path: '/',
            name: 'MyBots',
            component: () =>
                import ('../views/MyBots/MyBots.vue'),
            beforeEnter: authGuard
        }, {
            path: 'botDetail/:botId',
            beforeEnter: authGuard,
            component: () =>
                import ('../views/MyBots/BotDetail/Parent.vue'),
            children: [{
                path: '/',
                name: 'BotDetail',
                component: () =>
                    import ('../views/MyBots/BotDetail/BotDetail.vue'),
                beforeEnter: authGuard
            }, {
                path: 'chats',
                name: 'Chats',
                component: () =>
                    import ('../views/MyBots/BotDetail/Chats.vue'),
                beforeEnter: authGuard
            }, ]
        }]
    },

    {
        path: '/create',
        name: 'Create',
        component: () =>
            import ('../views/Create.vue'),
        beforeEnter: authGuard
    },
    {
        path: '/publish',
        name: 'Publish',
        component: () =>
            import ('../views/Publish.vue'),
        beforeEnter: authGuard
    },

    // BOT

    {
        path: '/bot/:id',
        name: 'Bot',
        component: () =>
            import ('../views/Bot.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router