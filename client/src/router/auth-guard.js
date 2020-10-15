import axios from 'axios';
import store from '../store'

export default async(to, from, next) => {
    try {
        const result = await axios.get('/auth/validateAuth')
        console.log('result', result)
        if (!result.data.status) {
            // localStorage.removeItem('token')
            next({ name: 'Login' })
        }
    } catch (error) {

        /* if 'isAuth' middleware in backend doesnt sent any response then the 
           user token/session is valid and user is logged in so continue to next route */

        if (error.response.status === 404) {
            next()
        }
    }

}