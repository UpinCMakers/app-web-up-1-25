// utils.js
export function myDate() {
    // get time
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    var horas = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();
    var seg = dataAtual.getSeconds();

    if(String(seg).length == 1) {
        
        seg = ("0" + seg)
    }
    if(String(minutos).length == 1) {

        minutos = ("0" + minutos)
    }
    if(String(horas).length == 1) {

        horas = ("0" + horas)
    }
    if(String(dia).length == 1) {

        dia = ("0" + dia)
    }
    if(String(mes).length == 1) {
        
        mes = ("0" + mes)
    }

    let day = (dia + "/" + mes + "/" + ano + "-" + horas + ":" + minutos + ":" + seg)
    return day
}
