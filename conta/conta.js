const login = [
    {usuario: 'Davi' , senha:'248886', id:'8080',ag:'es',amountPos:[],amountNeg:[],saldo:"000"} ,
    {usuario: 'Helena' , senha:'022166', id:'2020',ag:'pt',amountPos:[],amountNeg:[],saldo:"000"} ,
    {usuario: 'Maria' , senha:'214250', id:'3030',ag:'ar',amountPos:[],amountNeg:[],saldo:"800"} ,
    {usuario: 'Miguel' , senha:'321644', id:'4040',ag:'us',amountPos:[],amountNeg:[],saldo:"000"} ,
    {usuario: 'Pedro' , senha:'154237', id:'5050',ag:'it',amountPos:[],amountNeg:[],saldo:"000"}
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

const sair = () => window.location.href = "../index.html" 

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

const addTransactionN = () => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("menos")
    const ultimo = resultado[0].amountNeg[resultado[0].amountNeg.length-1]          
    li.innerHTML = `<p class="minus"> Transferencia</p><p>R$ ${ultimo}</p>`
    ulTransactions.append(li,hr)
}

const addTransactionP = () => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("mais")
    const ultimo = resultado[0].amountPos[resultado[0].amountPos.length-1]
    li.innerHTML = `<p class="plus"> Depósito</p><p>R$ ${ultimo}</p>`
    ulTransactions.append(li,hr)
}
/*=======================================================================================*/ 
const addValorPos = valor => login[movimentoResultado].amountPos.push(valor) 
const addValorNeg = valor => login[movimentoResultado].amountNeg.push(valor) 
const add= valor => operacoes[movimentoResultado].transacoes.push(valor).value

const total = (acumulador , inicial) => Number(acumulador) + Number(inicial)
let saldo = operacoes[movimentoResultado2].saldo
const transferir = () => {
    const valorTransferencia = document.querySelector("#valorTranf").value
    const contaATransferir =  document.querySelector("#transcConta").value  
    const tranferencia = logins => logins.id === contaATransferir  
    const destino = login
        .filter(tranferencia)
    const MovimentoDestino = login.indexOf(destino[0])
    
    if(destino.length < 1 || contaATransferir === resultado[0].id || valorTransferencia ===''){
        window.alert('Conta inválida')
    }else {
        if(window.confirm(`Transferir R$ ${valorTransferencia} para ${destino[0].usuario}?`)) {
            atualizarLocalStorage()
            addValorNeg(-valorTransferencia)
            addTransactionN()  
            add(-valorTransferencia) 
            document.querySelector("#valorTranf").value = '' 
            document.querySelector("#transcConta").value = ''
            let totalNeg = operacoes[movimentoResultado].transacoes
                .reduce(total, 0)
            document.querySelector(".saidaValor").innerHTML = `R$ ${-totalNeg}`
            const saldoTotal = Number(saldo) + Number(-valorTransferencia)
            operacoes[movimentoResultado2].saldo = saldoTotal
            saldo = saldoTotal
            document.querySelector(".saldoValor").innerHTML = `R$ ${operacoes[movimentoResultado2].saldo}`
        }      
    }
}

const emprestimo = () => {
    const valorEmprestimo = document.querySelector("#valorEmpr").value
    if(valorEmprestimo === ''){
        window.alert('Valor Inválido')
    }else{
        if(window.confirm(`Confirma o empréstimo de R$ ${valorEmprestimo}?`)){
            atualizarLocalStorage()
            addValorPos(+valorEmprestimo)
            addTransactionP()
            add(+valorEmprestimo)
            document.querySelector("#valorEmpr").value = ''
            const totalPos = operacoes[movimentoResultado].transacoes
                .reduce(total, 0)
            document.querySelector(".entradaValor").innerHTML = `R$ ${+totalPos}`
            const saldoTotal = Number(saldo) + Number(+valorEmprestimo)
            operacoes[movimentoResultado2].saldo = saldoTotal
            saldo = saldoTotal
            document.querySelector(".saldoValor").innerHTML = `R$ ${operacoes[movimentoResultado2].saldo}`
        }
    
    }
}