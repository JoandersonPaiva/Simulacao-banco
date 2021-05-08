const login = [
    {usuario: 'Davi' , senha:'248886', id:'8080',ag:'es',saldo:'10000'} ,
    {usuario: 'Helena' , senha:'022166', id:'2020',ag:'pt',saldo:'10000'} ,
    {usuario: 'Maria' , senha:'214250', id:'3030',ag:'ar',saldo:'10000'} ,
    {usuario: 'Miguel' , senha:'321644', id:'4040',ag:'us',saldo:'10000'} ,
    {usuario: 'Pedro' , senha:'154237', id:'5050',ag:'it',saldo:'10000'}
]
const id3030 = [
    {depositos:[
        10,20,30,40
    ],
    transferencias:[
        15,20,50,60
    ]}
]
const id8080 = [
    {depositos:[
        10,20,30,40
    ],
    transferencias:[
        15,20,50,60
    ]}
]
const id2020 = [
    {depositos:[
        10,20,30,40
    ],
    transferencias:[
        15,20,50,60
    ]}
]
const id4040 = [
    {depositos:[
        10,20,30,40
    ],
    transferencias:[
        15,20,50,60
    ]}
]
const id5050 = [
    {depositos:[
        10,20,30,40
    ],
    transferencias:[
        15,20,50,60
    ]}
]

const addTransaction = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const cssClass = transaction.amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')
    
}
addTransaction()

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
        }      
    }
}