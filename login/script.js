/*const login = [
    {usuario: 'Davi' , senha:'248886', id:'8080'} ,
    {usuario: 'Helena' , senha:'022166', id:'2020'} ,
    {usuario: 'Maria' , senha:'214250', id:'3030'} ,
    {usuario: 'Miguel' , senha:'321644', id:'4040'} ,
    {usuario: 'Pedro' , senha:'154237', id:'5050'}
]*/
const localStorageOparacoes = JSON.parse(localStorage
    .getItem('login'))
let login = localStorage
    .getItem('login') !== null ? localStorageOparacoes:
    [
        {usuario: 'Davi' , senha:'248886', id:'8080'} ,
        {usuario: 'Helena' , senha:'022166', id:'2020'} ,
        {usuario: 'Maria' , senha:'214250', id:'3030'} ,
        {usuario: 'Miguel' , senha:'321644', id:'4040'} ,
        {usuario: 'Pedro' , senha:'154237', id:'5050'}
    ]

const atualizarLocalStorage = () => {
    localStorage.setItem('login', JSON.stringify(login))
}

const form = document.querySelector('#form')
const usuario = document.querySelector('#usuario')
const password = document.querySelector('#senha')

form.addEventListener('submit', event =>{
    event.preventDefault()

    const nome = usuario.value
    const senha = password.value

    const conta = logins => logins.usuario === nome

    const resultado = login.filter(conta)


    function verificar() {
        console.log(resultado)
        if (resultado.length < 1){
            return window.alert('Negado')
        }else{
            if(resultado[0].senha === senha ) {
                window.location.href = "conta/conta.html"+ "?Nome=" + resultado[0].usuario + "&ID=" + resultado[0].id
            }else{
                return window.alert('Negado')
            }
        }
    }
    verificar()
    
})

const urlParams = new URLSearchParams(window.location.search)
const getId = urlParams.get("ID")
const contaId = logins => logins.id === getId
const resultado = login
    .filter(contaId)
const movimentoResultado =  login.indexOf(resultado[0])
const limpar = () => {
    if(resultado.length === 1){
        login.splice(movimentoResultado, 1)
        atualizarLocalStorage()
    }
}

limpar()




