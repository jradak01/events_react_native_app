export const GET_EVENTI = 'GET_EVENTI'
export const GET_EVENT = 'GET_EVENT'
export const POST_EVENT = 'POST_EVENT'
export const PUT_EVENT = 'PUT_EVENT'
export const DELETE_EVENT = 'DELETE_EVENET'
export const FILTRIRANI_EVENTI = 'FILTRIRANI_EVENTI'
export const MOJI_BUDUCI_EVENTI = 'MOJI_BUDUCI_EVENTI'
export const MOJI_PROSLI_EVENTI = 'MOJI_PROSLI_EVENTI'

import AsyncStorage from '@react-native-async-storage/async-storage';
const osnovniUrl = 'http://localhost:3001/api/eventi'
//const osnovniUrl = 'http://ipadress/api/eventi' cmd -> ipconfig ->phone

export const getEvents = () => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(osnovniUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: GET_EVENTI,
                    payload: json,
                    token: token
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const getEvent = (id) => {
    try {
        return async dispatch => {
            const odgovor = await fetch(`${osnovniUrl}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: GET_EVENT,
                    payload: json,
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const postEvent = (newEvent) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(osnovniUrl, {
                method: 'POST',
                body: JSON.stringify(newEvent),
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: POST_EVENT,
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

export const putEvent = (newEvent, id) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(newEvent),
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: PUT_EVENT,
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
export const deleteEvent = (id) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (odgovor.status === 204) {
                dispatch({
                    type: DELETE_EVENT,
                    payload: id
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const filterEvent = (pojam) => {
    return {
        type: FILTRIRANI_EVENTI,
        pojam: pojam
    }
}
export const getMojeProsle = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        if (token !== null) {
            console.log('token fetched')
            dispatch({
                type: MOJI_PROSLI_EVENTI,
                payload: token
            })
        }
    }
}
export const getMojeAktualne = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        if (token !== null) {
            console.log('token fetched')
            dispatch({
                type: MOJI_BUDUCI_EVENTI,
                payload: token
            })
        }
    }
}
