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
    const ultimo = resultado[0].amountNeg[resultado[0].amountNeg.length-1]          
    li.innerHTML = `<p class="minus"> Transferencia</p><p>R$ ${ultimo}</p>`
    ulTransactions.append(li,hr)
}

const addTransactionP = () => {
    const li = document.createElement('li')
    const hr = document.createElement('hr')
    li.classList.add("mais")
    const ultimo = resultado[0].amountPos[resultado[0].amountPos.length-1]
    li.innerHTML = `<p class="plus"> Depósito</p><p> R$ ${ultimo}</p>`
    ulTransactions.append(li,hr)
}
const addValorPos = valor => resultado[0].amountPos.push(valor) 
const addValorNeg = valor => resultado[0].amountNeg.push(valor) 

const transferir = () => {
    const valorTransferencia = document.querySelector("#valorTranf").value
    const contaATransferir =  document.querySelector("#transcConta").value  
    const tranferencia = logins => logins.id === contaATransferir  
    const destino = login.filter(tranferencia)
    
    if(destino.length < 1 || contaATransferir === resultado[0].id){
        window.alert('Conta inválida')
    }else {
        if(window.confirm(`Transferir R$ ${valorTransferencia} para ${destino[0].usuario}?`)) {
            addValorNeg(valorTransferencia)
            addTransactionN()   
            document.querySelector("#valorTranf").value = '' 
            document.querySelector("#transcConta").value = ''
        }      
    }
}

const emprestimo = () => {
    const valorEmprestimo = document.querySelector("#valorEmpr").value
    if(window.confirm(`Confirma o empréstimo de R$ ${valorEmprestimo}?`))
        addValorPos(valorEmprestimo)
        addTransactionP()
        document.querySelector("#valorEmpr").value = ''
}