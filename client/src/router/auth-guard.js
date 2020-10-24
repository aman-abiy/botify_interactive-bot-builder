import axios from 'axios';
import router from '../router'

export default {
    ifNotAuthDeny(to, from, next) {
        if (!localStorage.getItem('token')) {
            console.log('not set')
            router.push({ name: 'Login' })
        }
        next();
    },

    ifAuthDeny(to, from, next) {
        if (localStorage.getItem('token')) {
            router.push(from.fullPath)
        }
        next();
    }
}