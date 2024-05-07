export const PUT_PRIJAVA = 'PUT_PRIJAVA'
export const PUT_ODJAVA = 'PUT_ODJAVA'
export const PUT_DOPUSTENJE = 'PUT_DOPUSTENJE'
export const GET_PRIJAVA = 'GET_PRIJAVA'
export const GET_PRIJAVE = 'GET_PRIJAVE'
export const GET_PRIJAVE_EVENT = 'GET_PRIJAVE_EVENT'
export const SORTIRANE_PRIJAVE_DATUM = 'SORTIRANE_PRIJAVE_DATUM'

import AsyncStorage from '@react-native-async-storage/async-storage';
const osnovniUrl = 'http://localhost:3001/api/prijave'

export const getPrijave = () => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: GET_PRIJAVE,
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
export const putPrijava = (id) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: PUT_PRIJAVA,
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
export const getPrijava = (id) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}/${id}/${token.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json.length > 0) {
                dispatch({
                    type: GET_PRIJAVA,
                    payload: json,
                    id: id
                })
            } else {
                dispatch({
                    type: GET_PRIJAVA,
                    payload: null,
                    id: id
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const getPrijaveEvent = (id) => {
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
                    type: GET_PRIJAVE_EVENT,
                    payload: json
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const putOdjava = (id) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}/delete/${id}/${token.username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: PUT_ODJAVA,
                    payload: json,
                    username: token.username
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const putDopustenje = (id, prid, dopustenje) => {
    try {
        return async dispatch => {
            let token_data = await AsyncStorage.getItem('token')
            let token = JSON.parse(token_data)
            const odgovor = await fetch(`${osnovniUrl}/${id}/${prid}`, {
                method: 'PUT',
                body: JSON.stringify(dopustenje),
                headers: {
                    'Authorization': `bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })
            const json = await odgovor.json()
            if (json) {
                dispatch({
                    type: PUT_DOPUSTENJE,
                    id: id,
                    prid: prid,
                    dopustenje: dopustenje
                })
            } else {
                console.log('unable to fetch!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export const filterPrijaveDatum = (datum) => {
    return {
        type: SORTIRANE_PRIJAVE_DATUM,
        datum: datum
    }
}