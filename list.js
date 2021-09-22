
/** a função a seguir será para adicionar textos a pagina,
 *  ou seja, textos ja definidos */
let dados = [
  {'tarefa': 'Estudar script.js', 'status': 'checked'},
  {'tarefa': 'Estudar mais DOM', 'status': ''},
  {'tarefa': 'jogar menos estudar mais', 'status': 'checked'},
  {'tarefa': 'Trabalho de Redes para entregar', 'status': ''},
  {'tarefa': 'Cardapio em Script.js', 'status': ''}
];
/**
 * funções para armazenar, e nao sumir após atualizar a pagina
 */
//const getDados = () => JSON.parse (localStorage.getItem('todoList')) ?? [];
//const setDados = (dados) => localStorage.setItem('todolist', JSON.stringify(dados));

/**função para adicionar tarefas
 *  
 */
const criarItem = (tarefa, status, indice) => {
  const item = document.createElement('label');
  item.classList.add('todo_item');
  item.innerHTML = `
      <input type = "checkbox" ${status} data-indice = ${indice}>
      <div>${tarefa}</div>
      <input type="button" value="X" data-indice = ${indice}>
  `
  document.getElementById('todolist').appendChild(item);
}
/**
 * função para limpar as tarefas
 * caso algum nome seja repetido a função nao irar imprimir na tela 
 * o mesmo array.string
 */
const limparTarefa = () => {
  const todolist = document.getElementById('todolist');
  while( todolist.firstChild){
    todolist.removeChild(todolist.lastChild)
  }
}
/**
 *função para atualizar os dados na pagina 
 */
const atualizarPagina = ()=>{
  limparTarefa();
  //const dados = getDados();
  dados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}
/**
 * função para adicionar tarefas a dados ao clicar Enter
 */
const addItem = (evento) =>{
  const clickpress = evento.key;
  const text = evento.target.value;
  if(clickpress === 'Enter'){
    //const dados = getDados();
    dados.push({'tarefa': text, 'status': ''});
    //setDados(dados);
    atualizarPagina();
    evento.target.value = '';//limpa apos digitar
  }
}
/**
 * função para remover tarefa ao clicar no X
 */
const removeTarefa = (indice)=>{
  //const dados = getDados();
  dados.splice (indice, 1);
  //setDados(dados);
  atualizarPagina();
}
/**
 * função para atualizar o status de marcação das minhas tarefas
 */
const atualizarItem = (indice) =>{
  //const dados = getDados();
  dados[indice].status = dados[indice].status === '' ? 'checked' : '';
  //setDados(dados);
  atualizarPagina();
}
/**
 * função para distinguir onde foi o click, se no X na caixa ou no nome
 */
const clickItem = (evento) => {
  const element = evento.target;
  if(element.type === 'button'){
    const indice = element.dataset.indice;
    removeTarefa(indice);
  }
  else if(element.type === 'checkbox'){
    const indice = element.dataset.indice;
    atualizarItem(indice);
  }
}

document.getElementById('newdados').addEventListener('keypress', addItem);
document.getElementById('todolist').addEventListener('click', clickItem);
atualizarPagina();
