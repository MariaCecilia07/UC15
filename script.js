let tarefas = [];

let totalTarefas = 0;
let totalConcluidas = 0;


function adicionarTarefa() {
    let nome = document.getElementById("tarefa").value.trim();

    let materia = document.getElementById("materia").value.trim();

    let prioridade = document.getElementById("prioridade").value;

    let mensagem = document.getElementById("mensagem");

    if(nome === "" || materia === "" || prioridade ==="") {
        mensagem.textContent = "Preencha todos os campos!";

        mensagem.style.color = "blue";

        return:
    }

    if (duplicado) {
        mensagem.textContent = "Essa tarefa já foi cadastrada"
        mensagem. style.color = "blue"
        return;
    }

    let novaTarefa = {
        nome: nome,
        materia: materia,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    totalTarefas++;
    mensagem.textContent = "Tarefa cadastrada com sucesso!"
    mensagem.style.color = "grey"

    ataualizarContadores();
    exibirTarefas();
    limparCampos();
}

function exibirTarefas () {
     let lista = document.getElementById
     lista.textContent = "";

     tarefas.forEach(function(tarefa,indice) {
        let card = document.createElement("div")
        card.className = "tarefa";

        let titulo = document.createElement ("h3")

        let status = document.createElement("p")

        status.textContent = tarefa.concluida
        ? "Status:Concluída"
        : "Status: Pendente";

        card.appendChild(titulo);
        card.appendChild(materia);
        card.appendChild(prioridade);
        card.appendChild(status);

        destacarPrioridade( card, tarefa.prioridade);

        if (tarefa.concluida) {
            card.classList.add("concluida");
        } else{
            let botao = document.createElement ("button");
            botao.textContent = "Concluir tarefa";

            botao.onclick = function () {
                concluirTarefa(indice);
            };
            card.appendChild(botao);
            card.
        }
     }
    );
}

function destacarPrioridade(card, prioridade) {
    if (prioridade === "Alta") {
        card.style.borderLeft = "5px solid red";
    } else if (prioridade === "Média") {
        card.style.borderLeft = "5px solid orange";
    } else if (prioridade === "Baixa") {
        card.style.borderLeft = "5px solid blue";
    }
}

function concluirTarefa(indice) {
    let tarefa = tarefas[indice];
    if (tarefa.concluida) {
        return;
    }

    tarefa.concluida = true;
    totalConcluidas++;

    let mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Tarefa concluída com sucesso!";
    mensagem.style.color = "grey";

    atualizarContadores();
    exibirTarefas();
}

function atualizar Contadores() {
    document.getElementById("contador").textContent =
    "Tarefas cadastradas:" + totalTarefas;
    document.getElementById("contadorConcluidas").textContent =
     "Tarefas concluídas:" + totalConcluidas;
}

function limparCampos(){
    document.getElementById("tarefa").value = "";
    document.getElementById ("materia").value = "";
    document.getElementById ("prioridade").value = "";
}


function alternarModo (){
    document.body.classList.toggle("modo-concentracao");
}






