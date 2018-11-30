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

export const Meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function agruparGastosPorMes(gastos) {
    const gastosAgrupadosPorMes = gastos.reduce( (accumulator, gasto) => {

        if(gasto.date) {

            const gastoDate = new Date(gasto.date);
            if(gastoDate.getFullYear() == new Date().getFullYear()){

                let mesIndex = gastoDate.getMonth()
                let mesLabel = Meses[mesIndex];
        
                if(accumulator[mesLabel]){
                    accumulator[mesLabel] += customParseFloat(gasto.value);
                }
                else if( customParseFloat(gasto.value) > 0) {
                    accumulator[mesLabel] = customParseFloat(gasto.value);
                }
            }

        }
       
        return accumulator;
    }, {})

    return gastosAgrupadosPorMes;
}