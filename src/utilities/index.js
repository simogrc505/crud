// net: la somma dei net dei servizi (a cui viene sottratto eventuale discount)
// gross: la somma dei servizi + % tax
// original_net: il netto originale senza sconto
const { compose, assoc, reduce, add } = require('ramda')

const getTotalPrice = (services) => {
   return services.reduce((a, b) => +a + +b.net, 0);
}
//TODO: arrotandare secondo decimale
const append_invoices_values = (modules) => {
  for(let i = 0; i< modules.length; i++){
    let net = getTotalPrice(modules[i].services) - modules[i].discount
    modules[i].net = net.toFixed(2),
    modules[i].gross = (net + (net * modules[i].tax / 100)).toFixed(2),
    modules[i].original_net = (getTotalPrice(modules[i].services)).toFixed(2)
  }
  return modules
}

const append_invoice_values = (module) => {
  net = (getTotalPrice(module.services) - module.discount).toFixed(2)
  let a = net + (net * module.tax / 100)
  gross = parseFloat(a).toFixed(2)
  original_net = (getTotalPrice(module.services)).toFixed(2)

  const body = compose(
    assoc('net', net),
    assoc('gross', gross),
    assoc('original_net', original_net)
  )(module)
  return body
}

module.exports = {
  append_invoices_values,
  append_invoice_values
}