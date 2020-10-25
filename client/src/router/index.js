import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Dashboard from '../views/Dashboard'
import store from '../store'

// auth-guard
import authGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Auth/Login.vue'),
        beforeEnter: authGuard.ifAuthDeny
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import ('../views/Auth/Signup.vue'),
        beforeEnter: authGuard.ifAuthDeny
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () =>
            import ('../views/Auth/ForgotPassword.vue')
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () =>
            import ('../views/Auth/ResetPassword.vue')
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
        // beforeEnter: authGuard.ifNotAuthDeny
    },
    {
        path: '/myBots',
        component: () =>
            import ('../views/MyBots/Parent.vue'),
        beforeEnter: authGuard.ifNotAuthDeny,
        children: [{
            path: '/',
            name: 'MyBots',
            component: () =>
                import ('../views/MyBots/MyBots.vue'),
            beforeEnter: authGuard.ifNotAuthDeny
        }, {
            path: 'botDetail/:botId',
            beforeEnter: authGuard.ifNotAuthDeny,
            component: () =>
                import ('../views/MyBots/BotDetail/Parent.vue'),
            children: [{
                path: '/',
                name: 'BotDetail',
                component: () =>
                    import ('../views/MyBots/BotDetail/BotDetail.vue'),
                beforeEnter: authGuard.ifNotAuthDeny
            }, {
                path: 'chats',
                name: 'Chats',
                component: () =>
                    import ('../views/MyBots/BotDetail/Chats.vue'),
                beforeEnter: authGuard.ifNotAuthDeny
            }, ]
        }]
    },

    {
        path: '/verify-account',
        name: 'Verify-Account',
        component: () =>
            import ('../views/Verify/VerifyAccount.vue'),
        // beforeEnter: authGuard.ifNotAuthDeny
    },
    {
        path: '/verify/:token',
        name: 'Verify',
        component: () =>
            import ('../views/Verify/Verify.vue'),
        // beforeEnter: authGuard.ifNotAuthDeny
    },
    {
        path: '/create',
        name: 'Create',
        component: () =>
            import ('../views/Create.vue'),
        beforeEnter: authGuard.ifNotAuthDeny
    },
    {
        path: '/publish',
        name: 'Publish',
        component: () =>
            import ('../views/Publish.vue'),
        beforeEnter: authGuard.ifNotAuthDeny
    },
    {
        path: '/account',
        name: 'Account',
        component: () =>
            import ('../views/Account.vue')
    },

    // BOT

    {
        path: '/bot/:id',
        name: 'Bot',
        component: () =>
            import ('../views/Bot.vue')
    },

    // 404

    {
        path: '*',
        name: '404',
        component: () =>
            import ('../views/404.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

export default router