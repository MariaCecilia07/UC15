
const form = document.getElementById("formNotas");
const resultado = document.getElementById("resultado");
const btnLimpar = document.getElementById("btnLimpar");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nota1 = document.getElementById("nota1").value;
    const nota2 = document.getElementById("nota2").value;
    const nota3 = document.getElementById("nota3").value;

    if (nome === "") {
        mostrarErro("Digite o nome do estudante.");
        return;
    }

    if (nota1 === "" || nota2 === "" || nota3 === "") {
        mostrarErro("Preencha todas as três notas.");
        return;
    }

    const n1 = Number(nota1);
    const n2 = Number(nota2);
    const n3 = Number(nota3);

    if (
        !Number.isFinite(n1) ||
        !Number.isFinite(n2) ||
        !Number.isFinite(n3) ||
        n1 < 0 || n1 > 10 ||
        n2 < 0 || n2 > 10 ||
        n3 < 0 || n3 > 10
    ) {
        mostrarErro("As notas devem estar entre 0 e 10.");
        return;
    }

    const media = (n1 + n2 + n3) / 3;
    let situacao = "";
    let classe = "";

    if (media >= 7) {
        situacao = "Aprovado(a)";
        classe = "aprovado";
    } else if (media >= 5) {
        situacao = "Recuperação";
        classe = "recuperacao";
    } else {
        situacao = "Reprovado(a)";
        classe = "reprovado";
    }

    resultado.className = "resultado " + classe;
    resultado.replaceChildren();

    const titulo = document.createElement("h2");
    titulo.textContent = "Resultado da consulta";

    const nomeTexto = document.createElement("p");
    nomeTexto.textContent = "Estudante: " + nome;

    const mediaTexto = document.createElement("p");
    mediaTexto.textContent =
        "Média: " + media.toFixed(2).replace(".", ",");

    const situacaoTexto = document.createElement("p");
    situacaoTexto.textContent = "Situação: " + situacao;

    resultado.append(
        titulo,
        nomeTexto,
        mediaTexto,
        situacaoTexto
    );

    resultado.hidden = false;
});

function mostrarErro(mensagem) {
    resultado.className = "resultado erro";
    resultado.textContent = mensagem;
    resultado.hidden = false;
}

btnLimpar.addEventListener("click", function() {
    form.reset();
    resultado.hidden = true;
    resultado.replaceChildren();
    resultado.className = "resultado";
});
