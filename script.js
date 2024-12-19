// Dados das cartelas incorporados diretamente no JavaScript
const CARTELAS_DATA = {
    "cartelas": [
      {
        "id": 1,
        "numeros": [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]
      },
      {
        "id": 2,
        "numeros": [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67, 72]
      },
      {
        "id": 3,
        "numeros": [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 68, 73]
      },
      {
        "id": 4,
        "numeros": [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74]
      },
      {
        "id": 5,
        "numeros": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
      }
    ]
  };
  
  let cartelas = [];
  let numerosSorteados = new Set();
  let cartelasData = CARTELAS_DATA.cartelas;
  
  const gerarCartelaHTML = (cartela, index) => {
    const divCartela = document.createElement('div');
    divCartela.className = 'cartela';
    divCartela.setAttribute('data-cartela', index);
  
    // Adicionar número da cartela
    const numeroCartela = document.createElement('div');
    numeroCartela.className = 'numero-cartela';
    numeroCartela.textContent = `Cartela #${cartela.id}`;
    divCartela.appendChild(numeroCartela);
  
    // Ordenar números antes de exibir
    const numerosOrdenados = [...cartela.numeros].sort((a, b) => a - b);
  
    numerosOrdenados.forEach(num => {
      const divNumero = document.createElement('div');
      divNumero.className = 'numero';
      divNumero.textContent = num;
      divCartela.appendChild(divNumero);
    });
  
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
  
  const quantidadeInput = document.getElementById('quantidade-cartelas');
  const botaoIniciar = document.getElementById('iniciar');
  const botaoSortear = document.getElementById('sortear');
  const divCartelas = document.getElementById('cartelas');
  const divNumeroSorteado = document.getElementById('numero-sorteado');
  const containerNumerosSorteados = document.getElementById('numeros-sorteados-container');
  
  botaoIniciar.addEventListener('click', () => {
    const quantidade = parseInt(quantidadeInput.value);
    if (!quantidade || quantidade < 1) {
      alert('Digite uma quantidade válida de cartelas.');
      return;
    }
  
    if (quantidade > cartelasData.length) {
      alert(`Só existem ${cartelasData.length} cartelas disponíveis.`);
      return;
    }
  
    divCartelas.innerHTML = '';
    cartelas = [];
    numerosSorteados.clear();
    divNumeroSorteado.textContent = '';
    botaoSortear.disabled = false;
    
    // Limpa os números sorteados anteriores
    while (containerNumerosSorteados.children.length > 1) {
      containerNumerosSorteados.removeChild(containerNumerosSorteados.lastChild);
    }
  
    // Pegar as primeiras 'quantidade' cartelas
    for (let i = 0; i < quantidade; i++) {
      const cartela = cartelasData[i];
      const cartelaHTML = gerarCartelaHTML(cartela, i);
      cartelas.push({ numeros: cartela.numeros, elemento: cartelaHTML });
      divCartelas.appendChild(cartelaHTML);
    }
  });
  
  botaoSortear.addEventListener('click', () => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.has(numero));
  
    numerosSorteados.add(numero);
    divNumeroSorteado.textContent = `Número sorteado: ${numero}`;
  
    // Adiciona o número sorteado à lista de números sorteados
    const divNumeroSorteadoLista = document.createElement('div');
    divNumeroSorteadoLista.className = 'numero-sorteado-lista';
    divNumeroSorteadoLista.textContent = numero;
    containerNumerosSorteados.appendChild(divNumeroSorteadoLista);
  
    cartelas.forEach(({ elemento }) => {
      marcarNumero(elemento, numero);
      if (verificarCartelaCompleta(elemento)) {
        alert('Bingo! Uma cartela foi completada!');
        botaoSortear.disabled = true;
      }
    });
  });