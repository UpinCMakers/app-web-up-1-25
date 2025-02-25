function getHoraAtualGMT() {
    const agora = new Date();

    const horas = String(agora.getUTCHours()).padStart(2, '0');
    const minutos = String(agora.getUTCMinutes()).padStart(2, '0');
    //const segundos = String(agora.getUTCSeconds()).padStart(2, '0');

    const dataHoraGMT = `${horas}:${minutos}`;

    return dataHoraGMT;
}

function getDataAtualGMT() {
    const agora = new Date();

    const ano = agora.getUTCFullYear();
    const mes = String(agora.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(agora.getUTCDate()).padStart(2, '0');

    const dataGMT = `${dia}/${mes}/${ano}`;

    return dataGMT;
}

module.exports = {
    getHoraAtualGMT,
    getDataAtualGMT
};
