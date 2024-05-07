import { GET_EVENTI, GET_EVENT, POST_EVENT, PUT_EVENT, DELETE_EVENT, FILTRIRANI_EVENTI, MOJI_PROSLI_EVENTI, MOJI_BUDUCI_EVENTI } from "../actions/eventi";

const pocetnoStanje = {
    eventi: [],
    pocetniEventi: [],
    event: {},
    primjenjenfilterEventi: [],
    mojiProsliEventi: [],
    mojiBuduciEventi: []
};

const eventReducer = (state = pocetnoStanje, action) => {
    const danasnjiDatum = new Date()
    switch (action.type) {
        case GET_EVENTI:
            const pocetniPrikaz = action.payload.filter(ev => new Date(ev.vrijeme).getTime() > danasnjiDatum.getTime() && ev.korisnik.username !== action.token.username)
            return { ...state, eventi: action.payload, pocetniEventi: pocetniPrikaz }
        case GET_EVENT:
            return { ...state, event: action.payload }
        case POST_EVENT:
            const spoji = state.eventi.concat(action.payload)
            const spojiBuduce = new Date(action.payload.vrijeme).getTime() > danasnjiDatum.getTime() ? state.mojiBuduciEventi.concat(action.payload) : state.mojiBuduciEventi
            const spojiProslje = new Date(action.payload.vrijeme).getTime() < danasnjiDatum.getTime() ? state.mojiProsliEventi.concat(action.payload) : state.mojiProsliEventi
            return { ...state, eventi: spoji, mojiBuduciEventi: spojiBuduce, mojiProsliEventi: spojiProslje }
        case PUT_EVENT:
            const novi = action.payload
            const ukloniIzProslih = state.mojiProsliEventi.filter(ev => ev.id !== novi.id)
            const ukloniIzBuducih = state.mojiBuduciEventi.filter(ev => ev.id !== novi.id)
            const spojiBuduceUkl = new Date(action.payload.vrijeme).getTime() > danasnjiDatum.getTime() ? ukloniIzBuducih.concat(novi) : ukloniIzBuducih
            const spojiProsleUkl = new Date(action.payload.vrijeme).getTime() < danasnjiDatum.getTime() ? ukloniIzProslih.concat(novi) : ukloniIzProslih
            return { ...state, mojiBuduciEventi: spojiBuduceUkl, mojiProsliEventi: spojiProsleUkl }
        case DELETE_EVENT:
            const novoStanje = state.eventi.filter(ev => ev.id !== action.payload)
            const novoStanjeBuducih = state.mojiBuduciEventi.filter(ev => ev.id !== action.payload)
            const novoStanjeProslih = state.mojiProsliEventi.filter(ev => ev.id !== action.payload)
            return { ...state, eventi: novoStanje, mojiBuduciEventi: novoStanjeBuducih, mojiProsliEventi: novoStanjeProslih }
        case FILTRIRANI_EVENTI:
            const odabrani = state.pocetniEventi.filter(ev => ev.naziv.toLowerCase().includes(action.pojam.toLowerCase())
                || ev.tip.toLowerCase().includes(action.pojam.toLowerCase())
                || ev.mjesto.toLowerCase().includes(action.pojam.toLowerCase()))
            return { ...state, primjenjenfilterEventi: odabrani }
        case MOJI_PROSLI_EVENTI:
            const token = JSON.parse(action.payload)
            const prosli = state.eventi.filter(ev => ev.korisnik.username === token.username && new Date(ev.vrijeme).getTime() < danasnjiDatum.getTime())
            return { ...state, mojiProsliEventi: prosli }
        case MOJI_BUDUCI_EVENTI:
            const token_ = JSON.parse(action.payload)
            const buduci = state.eventi.filter(ev => new Date(ev.vrijeme).getTime() > danasnjiDatum.getTime() && ev.korisnik.username === token_.username)
            return { ...state, mojiBuduciEventi: buduci }
        default:
            return state;
    }
};
export default eventReducer;
