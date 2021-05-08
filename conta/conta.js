const login = [
    {usuario: 'Davi' , senha:'248886', id:'8080',ag:'es',amountPos:[],amountNeg:[],saldo:"0,00"} ,
    {usuario: 'Helena' , senha:'022166', id:'2020',ag:'pt',amountPos:[],amountNeg:[],saldo:"0,00"} ,
    {usuario: 'Maria' , senha:'214250', id:'3030',ag:'ar',amountPos:[],amountNeg:[],saldo:"0,00"} ,
    {usuario: 'Miguel' , senha:'321644', id:'4040',ag:'us',amountPos:[],amountNeg:[],saldo:"0,00"} ,
    {usuario: 'Pedro' , senha:'154237', id:'5050',ag:'it',amountPos:[],amountNeg:[],saldo:"0,00"}
]

const sair = () => window.location.href = "../index.html" 

const urlParams = new URLSearchParams(window.location.search)
const getNome = urlParams.get("Nome")
const getId = urlParams.get("ID")

const contaUser = logins => logins.usuario === getNome
const contaId = logins => logins.id === getId

const resultado = login.filter(contaUser).filter(contaId)

const pagina = document.querySelector('body')

const ulTransactions = document.querySelector(".dadosTransacoes")


document.querySelector(".cliente").innerHTML = `Olá ${resultado[0].usuario}`
document.querySelector(".dadoContaA").innerHTML = `${resultado[0].ag}`
document.querySelector(".dadoContaB").innerHTML = `${resultado[0].id}`
document.querySelector(".saldoValor").innerHTML = `R$ ${resultado[0].saldo}`

const addTransactionN = () => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("menos")
    li.innerHTML = '<p class="minus"> Transferencia</p><p>R$ 10</p>'
    ulTransactions.append(li,hr)
}

const addTransactionP = () => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("mais")
    li.innerHTML = `<p class="plus"> Depósito</p> R$ ${resultado[0].amountPos}<p></p>`
    ulTransactions.append(li,hr)
}
const addValorPos = valor => resultado[0].amountPos.push(valor) 

const transferir = () => {
    const valorTransferencia = document.querySelector("#valorTranf").value
    const contaATransferir =  document.querySelector("#transcConta").value  
    const tranferencia = logins => logins.id === contaATransferir  
    const destino = login.filter(tranferencia)
    
    if(destino.length < 1){
        window.alert('Conta inválida')
    }else {
        window.confirm(`Transferir R$ ${valorTransferencia} para ${destino[0].usuario}?`)
        if(window.confirm) {
            window.alert('feito')
            addTransactionN()
            
        }      
    }
}

const emprestimo = () => {
    const valorEmprestimo = document.querySelector("#valorEmpr").value
    addValorPos(valorEmprestimo)
    addTransactionP()
}