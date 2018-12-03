const customParseFloat = (value) => {
    value = String(value).replace(/\,/g,'.');
    return parseFloat(value);
}

export function agruparGastosPorCategoria(gastos) {
    
    const gastosAgrupadosPorCategorias = gastos.reduce( (accumulator, current) => {

        if(current.category){
            if(accumulator[current.category]){
                accumulator[current.category] += customParseFloat(current.value);
            }
            else if( customParseFloat(current.value) > 0) {
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

    for( key in gastosAgrupados ) {
        result.values.push(gastosAgrupados[key]);
        result.labels.push(key);
    }

    return result;
}

export const Meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function agruparGastosPorMes(gastos) {

    console.log(gastos)
    const gastosAgrupadosPorMes = gastos.reduce( (accumulator, gasto) => {

        if(gasto.date) {

            const gastoDate = new Date(gasto.date);
            if(gastoDate.getFullYear() == new Date().getFullYear()){
                console.log(gasto)

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

    console.log(gastosAgrupadosPorMes)
    return gastosAgrupadosPorMes;
}