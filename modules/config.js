export const Masacre = {};

/* stormbringer.sexos = {
    masculino: "stormbringer.sexos.masculino",
    femenino: "stormbringer.sexos.femenino",
    otro: "stormbringer.sexos.otro"
}

stormbringer.tiposHabilidad = {
    ataque: "stormbringer.tiposHabilidad.ataque",
    agilidad: "stormbringer.tiposHabilidad.agilidad",
    manipulacion: "stormbringer.tiposHabilidad.manipulacion",
    percepcion: "stormbringer.tiposHabilidad.percepcion",
    discreccion: "stormbringer.tiposHabilidad.discreccion",
    conocimiento: "stormbringer.tiposHabilidad.conocimiento",
    comunicacion: "stormbringer.tiposHabilidad.comunicacion",
}

stormbringer.tiposArma = {
    espada: "stormbringer.tiposArma.espadas",
    hacha: "stormbringer.tiposArma.hachas",
    garrote: "stormbringer.tiposArma.garrote",
    lanza: "stormbringer.tiposArma.lanzas",
    pelea: "stormbringer.tiposArma.pelea",
    escudo: "stormbringer.tiposArma.escudo",
    proyectiles: "stormbringer.tiposArma.proyectiles",
    arrojadizas: "stormbringer.tiposArma.arrojadizas"
}

stormbringer.atributos = {
    "fuerza": "stormbringer.atributos.fuerza",
    "constitucion": "stormbringer.atributos.constitucion",
    "tamaño": "stormbringer.atributos.tamaño",
    "inteligencia": "stormbringer.atributos.inteligencia",
    "poder": "stormbringer.atributos.poder",
    "destreza": "stormbringer.atributos.destreza",
    "carisma": "stormbringer.atributos.carisma"
}

stormbringer.habilidades = {
    "pelea": "stormbringer.habilidades.pelea",
    "espada": "stormbringer.habilidades.espada",
    "hacha": "stormbringer.habilidades.hacha",
    "lanza": "stormbringer.habilidades.lanza",
    "maza": "stormbringer.habilidades.maza",
    "escudo": "stormbringer.habilidades.escudo",
    "proyectiles": "stormbringer.habilidades.proyectiles",
    "garrote": "stormbringer.habilidades.garrote",
    "arrojadizas": "stormbringer.habilidades.arrojadizas",
    "equitacion": "stormbringer.habilidades.equitacion",
    "evitar": "stormbringer.habilidades.evitar",
    "hacerVolteretas": "stormbringer.habilidades.hacerVolteretas",
    "nadar": "stormbringer.habilidades.nadar",
    "saltar": "stormbringer.habilidades.saltar",
    "trepar": "stormbringer.habilidades.trepar",
    "volar": "stormbringer.habilidades.volar",
    "cantar": "stormbringer.habilidades.cantar",
    "credito": "stormbringer.habilidades.credito",
    "elocuencia": "stormbringer.habilidades.elocuencia",
    "persuadir": "stormbringer.habilidades.persuadir",
    "artesanado": "stormbringer.habilidades.artesanado",
    "cartografia": "stormbringer.habilidades.cartografia",
    "plantas": "stormbringer.habilidades.plantas",
    "venenos": "stormbringer.habilidades.venenos",
    "evaluarTesoro": "stormbringer.habilidades.evaluarTesoro",
    "lenguaComun": "stormbringer.habilidades.lenguaComun",
    "bajoMelnibones": "stormbringer.habilidades.bajoMelnibones",
    "altoMelnibones": "stormbringer.habilidades.altoMelnibones",
    "memorizar": "stormbringer.habilidades.memorizar",
    "millonEsferas": "stormbringer.habilidades.millonEsferas",
    "musicaLeyendas": "stormbringer.habilidades.musicaLeyendas",
    "navegar": "stormbringer.habilidades.navegar",
    "primerosAuxilios": "stormbringer.habilidades.primerosAuxilios",
    "disimular": "stormbringer.habilidades.disimular",
    "emboscada": "stormbringer.habilidades.emboscada",
    "esconderse": "stormbringer.habilidades.esconderse",
    "movimientoSilencioso": "stormbringer.habilidades.movimientoSilencioso",
    "robarBolsas": "stormbringer.habilidades.robarBolsas",
    "forzarCerraduras": "stormbringer.habilidades.forzarCerraduras",
    "nudos": "stormbringer.habilidades.nudos",
    "juegosManos": "stormbringer.habilidades.juegosManos",
    "malabares": "stormbringer.habilidades.malabares",
    "trampas": "stormbringer.habilidades.trampas",
    "buscar": "stormbringer.habilidades.buscar",
    "degustar": "stormbringer.habilidades.degustar",
    "equilibrio": "stormbringer.habilidades.equilibrio",
    "escuchar": "stormbringer.habilidades.escuchar",
    "olfatear": "stormbringer.habilidades.olfatear",
    "seguirRastros": "stormbringer.habilidades.seguirRastros",
    "ver": "stormbringer.habilidades.ver"
}

stormbringer.nacionalidades = {
    "anakhazan": "stormbringer.nacionalidades.anakhazan",
    "argimiliar": "stormbringer.nacionalidades.argimiliar", 
    "baslknishvalnioss": "stormbringer.nacionalidades.baslknishvalnioss", 
    "cesh": "stormbringer.nacionalidades.cesh", 
    "changshai": "stormbringer.nacionalidades.changshai", 
    "desiertolagrimas": "stormbringer.nacionalidades.desiertolagrimas",
    "dharijor": "stormbringer.nacionalidades.dharijor", 
    "dorel": "stormbringer.nacionalidades.dorel", 
    "eshmir": "stormbringer.nacionalidades.eshmir", 
    "filkhar": "stormbringer.nacionalidades.filkhar", 
    "ilmiora": "stormbringer.nacionalidades.ilmiora", 
    "ciudadespurpura": "stormbringer.nacionalidades.ciudadespurpura", 
    "jharkor": "stormbringer.nacionalidades.jharkor", 
    "lormyr": "stormbringer.nacionalidades.lormyr", 
    "maidahk": "stormbringer.nacionalidades.maidahk", 
    "melnibone": "stormbringer.nacionalidades.melnibone", 
    "semimelnibone": "stormbringer.nacionalidades.semimelnibone", 
    "myyrrhn": "stormbringer.nacionalidades.myyrrhn", 
    "nadsokor": "stormbringer.nacionalidades.nadsokor", 
    "oin": "stormbringer.nacionalidades.oin", 
    "okara": "stormbringer.nacionalidades.okara", 
    "org": "stormbringer.nacionalidades.org", 
    "pantang": "stormbringer.nacionalidades.pantang", 
    "phum": "stormbringer.nacionalidades.phum", 
    "pikarayd": "stormbringer.nacionalidades.pikarayd", 
    "quarzhasaat": "stormbringer.nacionalidades.quarzhasaat", 
    "saleem": "stormbringer.nacionalidades.saleem", 
    "seredoma": "stormbringer.nacionalidades.seredoma", 
    "shazaar": "stormbringer.nacionalidades.shazaar", 
    "tarkesh": "stormbringer.nacionalidades.tarkesh", 
    "valederia": "stormbringer.nacionalidades.valederia", 
    "vilmir": "stormbringer.nacionalidades.vilmir", 
    "yu": "stormbringer.nacionalidades.yu"
}

stormbringer.profesiones = {
    "guerrero": "stormbringer.profesiones.guerrero",
    "mercader": "stormbringer.profesiones.mercader",
    "negociante": "stormbringer.profesiones.negociante",
    "comerciante": "stormbringer.profesiones.comerciante",
    "marino": "stormbringer.profesiones.marino",
    "cazador": "stormbringer.profesiones.cazador",
    "campesino": "stormbringer.profesiones.campesino",
    "sacerdote": "stormbringer.profesiones.sacerdote",
    "noble": "stormbringer.profesiones.noble",
    "ladron": "stormbringer.profesiones.ladron",
    "mendigo": "stormbringer.profesiones.mendigo",
    "artesano": "stormbringer.profesiones.artesano",
    "segundo": "stormbringer.profesiones.segundo",
    "capitan": "stormbringer.profesiones.capitan"
} */