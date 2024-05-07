export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REGISTER = 'REGISTER'

import AsyncStorage from '@react-native-async-storage/async-storage';

const osnovniUrl = 'http://localhost:3001/api/login'
const url = 'http://localhost:3001/api/korisnici'

export const login = (user) => {
    try {
        return async dispatch => {
            const odgovor = await fetch(osnovniUrl, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (!json.error) {
                await AsyncStorage.setItem('token', JSON.stringify(json))
                dispatch({
                    type: LOGIN,
                    payload: json
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const register = (user) => {
    try {
        return async dispatch => {
            const odgovor = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const json = await odgovor.json()
            if (!json.error) {
                await AsyncStorage.setItem('token', JSON.stringify(json))
                dispatch({
                    type: REGISTER,
                    payload: json
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const init = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        if (token !== null) {
            console.log('token fetched')
            dispatch({
                type: LOGIN,
                payload: JSON.parse(token)
            })
        }
    }
}
export const logout = () => {
    return async dispatch => {
        await AsyncStorage.removeItem('token')
        dispatch({
            type: LOGOUT,
            //payload: null
        })
    }
} 
