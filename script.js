//Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};
let player = ''; //Player 'X ou 'O'
let warning = ''; //Aviso do vencedor
let playing = false; //Operador booleano para prosseguir ou parar o jogo

reset();//Já inicia resetando


//Events
document.querySelector('.reset').addEventListener('click', reset); //Comando para olhar a ação em reset

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
}); //Irá percorrer em cada item e irá adicionar um evento de clique em cada um
    //Veja que é utilizado o querySelectorAll o qual irá filtar todos com a tag .item

// Funções
function itemClick(e){ //Função que irá informar o item selecionado 
    let item = e.target.getAttribute('data-item'); //Armazena em item a informação da div clickada (Utiliza o target)
    if(playing && square[item] === ''){
        square[item] = player; //Item irá receber X ou O
        renderSquare(); //Renderiza o tabuleiro
        togglePlayer(); //Muda o jogador
    }
}


function reset(){ //Função que irá sempre resetar o jogo
    warning = ''; //Warning é zerado

    let random = Math.floor(Math.random() * 2); //Função aleatória 0 ou 1 - Irá sortear o jogador inicial
    
    random === 0 ? player = 'x' : 'o'
    
    //Outra forma
    //player = (random === 0)? 'x' : 'o';

    for(let i in square){ //Coloca todos os itens como vazios
        square[i] = '';
    }
    playing = true; //Inicia o jogo

    renderSquare(); //Função para preencher o quadro
    renderInfo(); //Função para preencher as informações
}
function renderSquare(){ //Função para preencher o quadro inicialmente
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}
function renderInfo(){ //Função que irá atualizar as informações abaixo do tabuleiro
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;  
   
}
function togglePlayer(){ //Funcão que irá alternar os players
    if(player === 'x'){
        player = 'o';
    } else {
        player = 'x'; 
    }
    renderInfo();
    //Outra forma
    //player = (player === 'x') ? 'o' : 'x';
}
function checkGame(){ //Função que irá checar o jogo em todas as jogadas
    if(checkWinnerFor('x')){
        warning = 'O jogador "x" venceu';
        playing = false;
        console.log(warning);
    } else if(checkWinnerFor('o')){
        warning = 'O jogador "o" venceu';
        playing = false;
        console.log(warning);
    } else if(isFull()){
        warning = 'Deu empate';
        playing = false;
        console.log(warning)
    }
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in pos){ //Função que irá verificar as possibilidades de ganho para cada jogador X ou Y a qual será iniciada por checkGame()
        let pArray = pos[w].split(','); //Transforma as possibilidades em array do tipo - a1, a2, a3
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon){
            return true;
        }
    }
    return false;
    
}
function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}
