// Seleciona todas as células do tabuleiro e o botão de reiniciar

const cell = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton')


// Variáveis para controlar o estado do jogo
let currentPlayer = 'x'; //Jogador atual, começando com "X"
let gameState = Array(9).fill(''); //Estado inicial do tabuleiro, todas as células vazias


// Combinações vencedoras possíveis
const winningCombinations = [
    [0, 1, 2], //Linha superior
    [3, 4, 5], //Linha do meio
    [6, 7, 8], //Linha inferior
    [0, 3, 6], //Coluna esquerda
    [1, 4, 7], //Coluna do meio
    [2, 5, 8], //Coluna direita
    [0, 4, 8], //Diagonal principal
    [2, 4, 6], //Diagonal secundária
];

// Função para Lidar com o clique em uma célula do tabuleiro
function handleCellClick(e) {
    const cell = e.target; // Célula que foi clicada
    const index = cell.getAttribute('data-index'); // Obtém o indice da célula

    if (gameState[index] === '' && !checkWinner()) {
        gameState[index] = currentPlayer; // Atualiza o estado do jogo com o símbolo do jogador atual
        cell.textContent = currentPlayer; // Atualiza o conteúdo da célula
        // Verifica se a célula está vazia e se não há um vencedor
        if (checkWinner()) {
            alert(`Jogador ${currentPlayer} venceu!`); //Exibe mensagem informando o vencedor
        } else if (gameState.every(cell => cell !== '')) {
            //Vefiicar se todas estão preenchidas
            alert('Empate!');
        } else {
            currentPlayer = currentPlayer === 'x' ? '0' : 'x'; // Alterna o jogador atual
        }
    }
}

// Função para verificar se há um vencedor

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a,b,c] = combination // obtém os indices das células na combinação
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]; // Verifica se todas as células na combinação têm o mesmo simbolo
    });
}

// Função para reiniciar o jogo

function restartGame() {
    gameState.fill(''); // Limpa o estado do jogo
    cell.forEach(cell => (cell.textContent ='')); // Limpa o conteúdo de todas as célula
    currentPlayer = 'x'; // Redefine o jogador atual para 'X'
}

// Adiciona eventos de clique a cada célula do tabuleiro
cell.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adiciona evento de clique ao botão de reiniciar
restartButton.addEventListener('click', restartGame)

