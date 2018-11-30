const customParseFloat = (value) => {
    value = String(value).replace(/\,/g,'.');
    return parseFloat(value);
}

export function agruparGastosPorCategoria(gastos) {
    
    const gastosAgrupadosPorCategorias = gastos.reduce( (accumulator, current) => {

        if(accumulator[current.category]){
            accumulator[current.category] += customParseFloat(current.value);
        }
        else if( customParseFloat(current.value) > 0) {
            accumulator[current.category] = customParseFloat(current.value);
        }

        return accumulator;
    }, {})

    return gastosAgrupadosPorCategorias;
}

export function extrairDadosELabels(gastos) {
    
    const gastosAgrupados = agruparGastosPorCategoria(gastos);

    let result = {
        values: [],
        labels: []
    };

    for( category in gastosAgrupados ) {
        result.values.push(gastosAgrupados[category]);
        result.labels.push(category);
    }

    return result;
}