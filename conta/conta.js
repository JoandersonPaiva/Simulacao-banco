const login = [
    {usuario: 'Davi' , senha:'248886', id:'8080',ag:'es'} ,
    {usuario: 'Helena' , senha:'022166', id:'2020',ag:'pt'} ,
    {usuario: 'Maria' , senha:'214250', id:'3030',ag:'ar'} ,
    {usuario: 'Miguel' , senha:'321644', id:'4040',ag:'us'} ,
    {usuario: 'Pedro' , senha:'154237', id:'5050',ag:'it'}
]


const localStorageOparacoes = JSON.parse(localStorage
    .getItem('operacoes'))
let operacoes = localStorage
    .getItem('operacoes') !== null ? localStorageOparacoes:
    [{id:'8080', transacoes:[], saldo:25000},
    {id:'2020', transacoes:[], saldo:25000},
    {id:'3030', transacoes:[], saldo:25000},
    {id:'4040', transacoes:[], saldo:25000},
    {id:'5050', transacoes:[], saldo:25000}]

const atualizarLocalStorage = () => {
    localStorage.setItem('operacoes', JSON.stringify(operacoes))
}

const sair = (comple=0) => window.location.href = "../index.html" + `?${comple}`

const urlParams = new URLSearchParams(window.location.search)
const getNome = urlParams.get("Nome")
const getId = urlParams.get("ID")


const contaUser = logins => logins.usuario === getNome
const contaId = logins => logins.id === getId

const resultado = login
    .filter(contaUser)
    .filter(contaId)

const resultado2 = operacoes
    .filter(contaId)

const movimentoResultado =  login.indexOf(resultado[0])
const movimentoResultado2 =  operacoes.indexOf(resultado2[0])
const pagina = document.querySelector('body')

const ulTransactions = document.querySelector(".dadosTransacoes")
const credito = document.querySelector(".entradaValor").value
const debito = document.querySelector(".saidaValor").value

document.querySelector(".cliente").innerHTML = `Olá ${resultado[0].usuario}`
document.querySelector(".dadoContaA").innerHTML = `${resultado[0].ag}`
document.querySelector(".dadoContaB").innerHTML = `${resultado[0].id}`
document.querySelector(".saldoValor").innerHTML = `R$ ${operacoes[movimentoResultado2].saldo}`

/*====================================================================================
============================== adicinar li's ==================================== */

const addTransactionN = valor => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("menos")       
    li.innerHTML = `<p class="minus"> Transferencia</p><p>R$ ${valor}</p>`
    ulTransactions.append(li,hr)
}

const addTransactionP = valor => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("mais")
    li.innerHTML = `<p class="plus"> Depósito</p><p>R$ ${valor}</p>`
    ulTransactions.append(li,hr)
}
/*=======================================================================================*/ 

const add = valor => operacoes[movimentoResultado].transacoes.push(valor)

let totalNeg = 0
let totalPos = 0

const init = () => {
    const array = operacoes[movimentoResultado].transacoes
    for(valorAtual in array){
        if(array[valorAtual] > 0){
            addTransactionP(array[valorAtual])
            totalPos += array[valorAtual]
            document.querySelector(".entradaValor").innerHTML = `R$ ${totalPos}`
        }else{
            addTransactionN(array[valorAtual])
            totalNeg += array[valorAtual]
            document.querySelector(".saidaValor").innerHTML = `R$ ${totalNeg}`

        }
    }
}
init()

const total = (acumulador , inicial) => Number(acumulador) + Number(inicial)
let saldo = operacoes[movimentoResultado2].saldo
const transferir = () => {
    const valorTransferencia = document.querySelector("#valorTranf").value
    const contaATransferir =  document.querySelector("#transcConta").value  
    const tranferencia = logins => logins.id === contaATransferir  
    const destino = login
        .filter(tranferencia)
    const destino2 = operacoes
        .filter(tranferencia)
    const movimentoDestino = operacoes.indexOf(destino2[0])
    const saldoDestino = operacoes[movimentoDestino].saldo
    const addTransfer = valor => operacoes[movimentoDestino].transacoes.push(valor)
    if(destino.length < 1 || contaATransferir === resultado[0].id || valorTransferencia ==='' || valorTransferencia <= 0){
        window.alert('Conta inválida')
    }else {
        if(window.confirm(`Transferir R$ ${valorTransferencia} para ${destino[0].usuario}?`)) {
            addTransactionN(-valorTransferencia)  
            add(-valorTransferencia) 
            addTransfer(+valorTransferencia)
            console.log(valorTransferencia)
            document.querySelector("#valorTranf").value = '' 
            document.querySelector("#transcConta").value = ''
            /*totalNeg = operacoes[movimentoResultado].transacoes
                .reduce(total, 0)*/
            totalNeg -= Number(valorTransferencia)
            document.querySelector(".saidaValor").innerHTML = `R$ ${totalNeg}`
            const saldoTotal = Number(saldo) + Number(-valorTransferencia)
            const saldoTotalDestino = Number(saldoDestino) + Number(valorTransferencia)
            operacoes[movimentoDestino].saldo = saldoTotalDestino
            operacoes[movimentoResultado2].saldo = saldoTotal
            saldo = saldoTotal
            document.querySelector(".saldoValor").innerHTML = `R$ ${operacoes[movimentoResultado2].saldo}`
            atualizarLocalStorage()
        }      
    }
}


const emprestimo = () => {
    const valorEmprestimo = document.querySelector("#valorEmpr").value
    if(valorEmprestimo === '' || valorEmprestimo <= 0){
        window.alert('Valor Inválido')
    }else{
        if(window.confirm(`Confirma o empréstimo de R$ ${valorEmprestimo}?`)){
            addTransactionP(valorEmprestimo)
            add(+valorEmprestimo)
            document.querySelector("#valorEmpr").value = ''
            /*totalPos = operacoes[movimentoResultado].transacoes
                .reduce(total, 0)*/
            totalPos += Number(+valorEmprestimo)
            document.querySelector(".entradaValor").innerHTML = `R$ ${+totalPos}`
            const saldoTotal = Number(saldo) + Number(+valorEmprestimo)
            operacoes[movimentoResultado2].saldo = saldoTotal
            saldo = saldoTotal
            document.querySelector(".saldoValor").innerHTML = `R$ ${operacoes[movimentoResultado2].saldo}`
            atualizarLocalStorage()
        }
    
    }
}

const remove = () => {
    const numConta = document.querySelector('#numConta').value
    const senhaConta = document.querySelector("#senha").value
    if(resultado[0].id === numConta && resultado[0].senha === senhaConta){
        login.splice(movimentoResultado2, 1)
        operacoes.splice(movimentoResultado2, 1)
        atualizarLocalStorage()
        sair(`ID=${resultado[0].id}`)
    }else{
        window.alert('Exclusão não autorizada!!')
        document.querySelector('#numConta').value = ''
        document.querySelector("#senha").value = ''
    }
}