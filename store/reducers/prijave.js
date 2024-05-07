import { PUT_PRIJAVA, PUT_ODJAVA, PUT_DOPUSTENJE, GET_PRIJAVA, GET_PRIJAVE, SORTIRANE_PRIJAVE_DATUM, GET_PRIJAVE_EVENT } from "../actions/prijave";

const pocetnoStanje = {
    prijava: null,
    prijave: [],
    datumi: [],
    sortiranePrijave: [],
    svePrijaveEvent: [],
    dozvoleNaPrijavu: [],
    ukupnoPrijavljenih: 0,
};

const prijavaReducer = (state = pocetnoStanje, action) => {
    switch (action.type) {
        case GET_PRIJAVE:
            const datumi = action.payload.map(ev => ev.vrijeme.substring(0, 10))
            let dup = [...new Set(datumi)];
            return { ...state, prijave: action.payload, datumi: dup }
        case GET_PRIJAVA:
            return { ...state, prijava: action.payload }
        case GET_PRIJAVE_EVENT:
            const dozvole = action.payload.filter(pr => pr.dopusteno === false)
            const broj = action.payload.length
            return { ...state, svePrijaveEvent: action.payload, dozvoleNaPrijavu: dozvole, ukupnoPrijavljenih: broj }
        case PUT_PRIJAVA:
            const novaPrijava = state.prijave.concat(action.payload)
            const datum = action.payload.vrijeme.substring(0, 10)
            const dupli = state.datumi.filter(d => d === datum)
            const noviDatumi = state.datumi
            if (dupli.length = 0) {
                noviDatumi = state.datumi.concat(datum)
            }
            return { ...state, prijava: action.payload, prijave: novaPrijava, datumi: noviDatumi }
        case PUT_ODJAVA:
            const novePrijave = state.prijave.filter(pr => pr.id !== action.payload.id)
            const PrijaveNaDatum = state.prijave.filter(pr => pr.vrijeme.substring(0, 10) === action.payload.vrijeme.substring(0, 10))
            const brojPrijava = PrijaveNaDatum.length
            let datumiNovi = state.datumi
            if (brojPrijava <= 1) {
                datumiNovi = state.datumi.filter(d => d !== action.payload.vrijeme.substring(0, 10))
            }
            return { ...state, prijava: null, prijave: novePrijave, datumi: datumiNovi }
        case PUT_DOPUSTENJE:
            return state;
        case SORTIRANE_PRIJAVE_DATUM:
            const sortiranePrijave = state.prijave.filter(ev => new Date(ev.vrijeme.substring(0, 10)).getTime() === new Date(action.datum).getTime())
            return { ...state, sortiranePrijave: sortiranePrijave }
        default:
            return state;
    }
}
export default prijavaReducer;