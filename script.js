// Dados das cartelas modificados para 9 números
const CARTELAS_DATA = {
  "cartelas":[{"id":1,"numeros":[1,14,15,27,29,32,39,48,52]},{"id":2,"numeros":[3,10,22,24,29,48,53,61,75]},{"id":3,"numeros":[19,29,32,33,41,47,56,66,67]},{"id":4,"numeros":[5,24,41,43,49,52,56,67,75]},{"id":5,"numeros":[7,10,16,20,28,37,40,62,75]},{"id":6,"numeros":[10,15,29,40,44,45,69,71,74]},{"id":7,"numeros":[17,18,31,33,37,49,58,62,67]},{"id":8,"numeros":[27,40,42,53,55,60,64,66,71]},{"id":9,"numeros":[11,12,30,40,61,63,68,73,74]},{"id":10,"numeros":[2,20,30,40,41,53,62,70,73]},{"id":11,"numeros":[2,8,11,17,46,55,65,67,68]},{"id":12,"numeros":[12,20,23,41,44,46,47,48,67]},{"id":13,"numeros":[17,24,30,35,47,57,67,68,69]},{"id":14,"numeros":[3,19,27,31,37,44,48,59,70]},{"id":15,"numeros":[3,5,6,14,22,36,52,55,68]},{"id":16,"numeros":[8,19,24,27,35,38,39,67,71]},{"id":17,"numeros":[7,8,37,47,48,53,67,70,73]},{"id":18,"numeros":[4,20,33,43,44,51,61,63,73]},{"id":19,"numeros":[1,18,35,39,44,48,49,69,74]},{"id":20,"numeros":[16,17,19,30,37,44,46,66,67]},{"id":21,"numeros":[14,16,18,19,27,41,44,71,73]},{"id":22,"numeros":[5,14,15,20,21,22,32,42,52]},{"id":23,"numeros":[1,12,17,20,27,28,31,47,51]},{"id":24,"numeros":[17,21,34,38,39,50,56,59,72]},{"id":25,"numeros":[3,4,22,24,38,61,64,67,75]},{"id":26,"numeros":[18,25,29,30,36,45,57,71,75]},{"id":27,"numeros":[1,4,14,28,35,39,59,62,72]},{"id":28,"numeros":[1,5,12,20,24,25,36,49,68]},{"id":29,"numeros":[13,16,18,19,23,40,56,74,75]},{"id":30,"numeros":[2,5,16,28,41,47,59,66,75]},{"id":31,"numeros":[3,22,30,33,47,51,54,62,66]},{"id":32,"numeros":[17,22,25,32,35,36,46,59,71]},{"id":33,"numeros":[1,2,10,18,39,43,50,52,68]},{"id":34,"numeros":[24,25,34,36,40,61,64,65,69]},{"id":35,"numeros":[3,20,26,37,52,58,64,66,74]},{"id":36,"numeros":[2,13,25,40,58,60,61,63,68]},{"id":37,"numeros":[15,17,24,27,37,39,56,59,67]},{"id":38,"numeros":[20,25,33,42,43,48,50,51,65]},{"id":39,"numeros":[4,10,14,15,17,21,37,56,64]},{"id":40,"numeros":[1,8,11,16,18,20,37,40,72]},{"id":41,"numeros":[4,12,24,30,32,58,65,70,75]},{"id":42,"numeros":[6,12,23,24,28,30,31,41,47]},{"id":43,"numeros":[4,12,13,15,24,29,36,56,59]},{"id":44,"numeros":[7,11,17,28,33,54,66,67,68]},{"id":45,"numeros":[24,26,27,45,61,67,70,71,75]},{"id":46,"numeros":[1,10,21,24,25,26,47,49,65]},{"id":47,"numeros":[30,31,33,34,45,59,60,68,70]},{"id":48,"numeros":[14,32,37,42,49,51,54,62,66]},{"id":49,"numeros":[9,23,37,44,45,47,55,61,65]},{"id":50,"numeros":[2,8,20,35,53,58,66,67,69]},{"id":51,"numeros":[7,9,18,22,37,39,56,65,66]},{"id":52,"numeros":[2,18,19,42,48,54,56,58,63]},{"id":53,"numeros":[7,12,14,20,33,57,58,61,64]},{"id":54,"numeros":[7,17,19,34,37,44,52,53,66]},{"id":55,"numeros":[2,7,17,21,46,47,61,66,73]},{"id":56,"numeros":[6,10,21,48,53,63,69,72,73]},{"id":57,"numeros":[7,8,14,18,29,52,62,66,71]},{"id":58,"numeros":[13,17,36,55,58,59,62,69,71]},{"id":59,"numeros":[9,16,29,31,34,46,50,66,74]},{"id":60,"numeros":[9,13,25,30,35,41,55,57,74]
    }
  ]
};

let cartelas = [];
let numerosSorteados = new Set();
let cartelasVencedoras = new Set(); // Novo: conjunto para rastrear cartelas que já venceram
let cartelasData = CARTELAS_DATA.cartelas;

const gerarCartelaHTML = (cartela, index) => {
  const divCartela = document.createElement('div');
  divCartela.className = 'cartela cartela-pequena';
  divCartela.setAttribute('data-cartela', index);

  const numeroCartela = document.createElement('div');
  numeroCartela.className = 'numero-cartela';
  numeroCartela.textContent = `Cartela #${cartela.id}`;
  divCartela.appendChild(numeroCartela);

  const gridContainer = document.createElement('div');
  gridContainer.className = 'grid-container';
  
  const numerosOrdenados = [...cartela.numeros].sort((a, b) => a - b);

  numerosOrdenados.forEach(num => {
    const divNumero = document.createElement('div');
    divNumero.className = 'numero';
    divNumero.textContent = num;
    gridContainer.appendChild(divNumero);
  });

  divCartela.appendChild(gridContainer);
  return divCartela;
};

const marcarNumero = (cartela, numero) => {
  const numeros = cartela.querySelectorAll('.numero');
  numeros.forEach(divNumero => {
    if (parseInt(divNumero.textContent) === numero) {
      divNumero.classList.add('sorteado');
    }
  });
};

const verificarCartelaCompleta = (cartela) => {
  return cartela.querySelectorAll('.numero:not(.sorteado)').length === 0;
};

const iniciarBingo = () => {
  const quantidadeInput = document.getElementById('quantidade-cartelas');
  const quantidade = parseInt(quantidadeInput.value);
  
  if (!quantidade || quantidade < 1) {
    alert('Digite uma quantidade válida de cartelas.');
    return;
  }

  if (quantidade > cartelasData.length) {
    alert(`Só existem ${cartelasData.length} cartelas disponíveis.`);
    return;
  }

  const divCartelas = document.getElementById('cartelas');
  const divNumeroSorteado = document.getElementById('numero-sorteado');
  const containerNumerosSorteados = document.getElementById('numeros-sorteados-container');
  const botaoSortear = document.getElementById('sortear');

  divCartelas.innerHTML = '';
  cartelas = [];
  numerosSorteados.clear();
  cartelasVencedoras.clear(); // Novo: limpar conjunto de cartelas vencedoras
  divNumeroSorteado.textContent = '';
  botaoSortear.disabled = false;
  
  while (containerNumerosSorteados.children.length > 1) {
    containerNumerosSorteados.removeChild(containerNumerosSorteados.lastChild);
  }

  for (let i = 0; i < quantidade; i++) {
    const cartela = cartelasData[i];
    const cartelaHTML = gerarCartelaHTML(cartela, i);
    cartelas.push({ numeros: cartela.numeros, elemento: cartelaHTML });
    divCartelas.appendChild(cartelaHTML);
  }
};

const sortearNumero = () => {
  // Verificar se ainda há números disponíveis para sorteio
  if (numerosSorteados.size >= 75) {
    alert('Todos os números já foram sorteados!');
    document.getElementById('sortear').disabled = true;
    return;
  }

  let numero;
  do {
    numero = Math.floor(Math.random() * 75) + 1;
  } while (numerosSorteados.has(numero));

  numerosSorteados.add(numero);
  
  const divNumeroSorteado = document.getElementById('numero-sorteado');
  divNumeroSorteado.textContent = `Número sorteado: ${numero}`;

  const containerNumerosSorteados = document.getElementById('numeros-sorteados-container');
  const divNumeroSorteadoLista = document.createElement('div');
  divNumeroSorteadoLista.className = 'numero-sorteado-lista';
  divNumeroSorteadoLista.textContent = numero;
  containerNumerosSorteados.appendChild(divNumeroSorteadoLista);

  // Verificar cada cartela
  cartelas.forEach(({ elemento }, index) => {
    marcarNumero(elemento, numero);
    
    // Só verifica se a cartela completou se ela ainda não foi marcada como vencedora
    if (!cartelasVencedoras.has(index) && verificarCartelaCompleta(elemento)) {
      cartelasVencedoras.add(index); // Adiciona ao conjunto de cartelas vencedoras
      
      // Adiciona classe visual para indicar que a cartela venceu
      elemento.classList.add('cartela-vencedora');
      
      // Mostra mensagem personalizada com o número da cartela
      const cartelaId = elemento.querySelector('.numero-cartela').textContent.split('#')[1];
      alert(`Bingo! A cartela #${cartelaId} foi completada! O jogo continua para as demais cartelas.`);
    }
  });
  
  // Verifica se todas as cartelas foram completadas
  if (cartelasVencedoras.size === cartelas.length) {
    alert('Todas as cartelas foram completadas! O jogo terminou!');
    document.getElementById('sortear').disabled = true;
  }
};

// Adicionar event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const botaoIniciar = document.getElementById('iniciar');
  const botaoSortear = document.getElementById('sortear');
  
  botaoIniciar.addEventListener('click', iniciarBingo);
  botaoSortear.addEventListener('click', sortearNumero);
});