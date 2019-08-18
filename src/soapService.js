// importando soap, lib para mexer com soap em node (client e server)
const soap = require('soap');

const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';

// module.exports somente exporta uma função
// Ver também ES6 modules
module.exports.getSoapClient = () => {
    // instanciar o meu client com base na url
    return soap.createClientAsync(url)
}