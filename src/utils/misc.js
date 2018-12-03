const customParseFloat = (value) => {
    value = String(value).replace(/\,/g, '.');
    return parseFloat(value);
}

export function agruparGastosPorCategoria(gastos) {

    const gastosAgrupadosPorCategorias = gastos.reduce((accumulator, current) => {

        if (current.category) {
            if (accumulator[current.category]) {
                accumulator[current.category] += customParseFloat(current.value);
            }
            else if (customParseFloat(current.value) > 0) {
                accumulator[current.category] = customParseFloat(current.value);
            }
        }

        return accumulator;
    }, {})

    return gastosAgrupadosPorCategorias;
}

export function extrairDadosELabels(gastos, funcaoDeAgrupamento) {

    const gastosAgrupados = funcaoDeAgrupamento(gastos);

    let result = {
        values: [],
        labels: []
    };

    for (key in gastosAgrupados) {
        result.values.push(gastosAgrupados[key]);
        result.labels.push(key);
    }

    return result;
}

export const Meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function agruparGastosPorMes(gastos) {

    gastos = gastos.filter( gasto => gasto.date ? true: false);
    gastos.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

    const gastosAgrupadosPorMes = gastos.reduce((accumulator, gasto) => {

        const gastoDate = new Date(gasto.date);
        if (gastoDate.getFullYear() == new Date().getFullYear()) {
            let mesIndex = gastoDate.getMonth()
            let mesLabel = Meses[mesIndex];

            if (accumulator[mesLabel]) {
                accumulator[mesLabel] += customParseFloat(gasto.value);
            }
            else if (customParseFloat(gasto.value) > 0) {
                accumulator[mesLabel] = customParseFloat(gasto.value);
            }
        }

        return accumulator;
    }, {})

    return gastosAgrupadosPorMes;
}



export const formatNumberToString = number => {
    return number > 9 ? String(number) : "0" + String(number);
}

export const formatDate = dateString => {

    if(!dateString)
        return '-';

    const date = new Date(dateString);

    const formatedDate = formatNumberToString(date.getDate()) + "/" + formatNumberToString(date.getMonth()) + "/" + formatNumberToString(date.getFullYear());

    return formatedDate;
}