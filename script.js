console.log("Olá, Cecília! Seja bem-vinda!")
console.log("Olá,Gaby! Seja bem-vinda!")
console.log("Olá, Fernanda! Seja bem-vinda!")

function darBoasVindas (nome) {
    console.log(`Olá, ${nome}! Seja Bem-Vindo!`)
}

darBoasVindas("Cecília")
darBoasVindas("Gaby")
darBoasVindas("Fernanda")

function apresentar(nome,  idade){
    console.log(`Meu nome é ${nome} e tenho ${idade} anos.`);
}

apresentar("Cecília", 15)
apresentar("Gaby", 23)
apresentar("Fernanda", 16)

function estudando(nome){
    console.log(`${nome} está estudando!`)
    console.log(`${nome} Não está estudando!`)
}

estudando("Cecília")
estudando("Gaby")
estudando("Fernanda")

function somar(a,b){
    return a + b}

somar(5,3)

let resultado = somar(5,3);

console.log(resultado);

function média(a, b, c) {
    return (a + b + c) / 3;
}

let resultadoM = média(7, 6, 9);

console.log(resultadoM);


function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

let nome = prompt ("digite o nome do aluno: ")
let nota1 = Number(prompt("digite a primeira nota: "))
let nota2 = Number(prompt("digite a segunda nota: "))

let media1 = calcularMedia(nota1, nota2);

console.log(`${nome} ficou com média ${media1}`);

if(media1 >= 6){
    console.log(`${nome} está aprovado!`)}

else{
    console.log(`${nome} está reprovado!`)
}

calcularMedia(nota1, nota2)

function calcularViagem(passagem, hospedagem, alimentação, passeios) {
    return passagem + hospedagem + alimentação + passeios;
}

 let passagem = Number(prompt("Digite o valor da passagem: "))
 let hospedagem = Number(prompt("Digite o valor da hospedagem: "))
 let alimentação = Number(prompt("Digite o valor da alimentação: "))
 let passeios = Number(prompt("Digite o valor dos passeios: "))

 let total = calcularViagem(passagem, hospedagem, alimentação, passeios);

 console.log(`O valor total da viagem é: ${total}`)

 if(total <= 2000){
    console.log("A viagem está dentro do orçamento")
 }

 else{
    console.log("A viagem está fora do orçamento")
 }
 

 






