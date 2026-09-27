#!/usr/bin/env python3
"""
Caller slim do commit_diff.

So localiza o central_commit_diff e chama o commit_diff.py via subprocess,
passando a pasta deste arquivo como ponto de partida da busca pelo .git.

NAO contem NENHUMA logica de venv/bootstrap: o proprio commit_diff.py cuida
disso (cria/usa a .venv). Assim este arquivo pode ser copiado igual para
qualquer projeto e NUNCA precisa ser reatualizado quando a logica muda.

Uso:
    python <este_arquivo>.py [--somente-analisar]
"""
import subprocess
import sys
import platform
from pathlib import Path


# --- localizacao do central_commit_diff (unico ponto a editar por maquina) ----
# A busca combina cada RAIZ com cada SUBCAMINHO e vale a primeira pasta que
# tiver um commit_diff.py dentro. O lugar principal e dentro da arvore
# Todos_Os_Projetos; os outros sao copias antigas, mantidas como alternativa.
RAIZES = {
    'windows': (
        Path(r'C:\Users\igor1\OneDrive\Desktop'),
        Path(r'C:\Users\igor\OneDrive\Desktop'),
        Path(r'C:\Users\igor1\Desktop'),
        Path(r'C:\Users\igor\Desktop'),
    ),
    'outros': (
        Path('/home/igor/Desktop'),
    ),
}

# Onde o central_commit_diff pode estar, a partir de cada raiz acima.
# Dentro do minhas_automacoes a pasta se chama `0_central_commit_diff` (o
# prefixo `0_` existe so no disco; no GitHub o repositorio e central_commit_diff).
SUBCAMINHOS = (
    # Lugar principal: o submódulo dentro da árvore de projetos (é onde fica o .env).
    Path('Todos_Os_Projetos/Itens_Para_Auxilio_Dos_Outros_Projetos/Ferramentas_De_Programacao/coding_tools/central_commit_diff'),
    Path('central_commit_diff'),
    Path('minhas_automacoes/0_central_commit_diff'),
    Path('codigos pc principal sincronizar (2)/minhas_automacoes/0_central_commit_diff'),
)


def raizes_de_busca():
    """Raizes a inspecionar, na ordem de preferencia e sem repetir.

    As fixas do SO atual vem primeiro; depois o Desktop do usuario logado,
    para o caso de a maquina nao ser nenhuma das duas conhecidas.
    """
    eh_windows = platform.system().lower() == 'windows'
    fixas = RAIZES['windows'] if eh_windows else RAIZES['outros']
    casa = Path.home()
    ordem = [*fixas, casa / 'Desktop', casa / 'OneDrive' / 'Desktop']

    unicas = []
    for raiz in ordem:
        if raiz not in unicas:
            unicas.append(raiz)
    return unicas


def localizar_central():
    """(pasta do central_commit_diff, caminhos tentados). Pasta e None se nao achar."""
    tentados = []
    for raiz in raizes_de_busca():
        for sub in SUBCAMINHOS:
            candidato = raiz / sub
            tentados.append(candidato)
            if (candidato / 'commit_diff.py').exists():
                return candidato, tentados
    return None, tentados


def main():
    central, tentados = localizar_central()
    if central is None:
        print('❌ commit_diff.py nao encontrado. Procurei em:')
        for caminho in tentados:
            print(f'   - {caminho / "commit_diff.py"}')
        print('   Ajuste RAIZES/SUBCAMINHOS (onde o central_commit_diff foi clonado).')
        return 1

    commit_diff = central / 'commit_diff.py'
    start_from = str(Path(__file__).resolve().parent)
    cmd = [sys.executable, str(commit_diff), '--start-from', start_from, *sys.argv[1:]]
    return subprocess.run(cmd).returncode


if __name__ == '__main__':
    sys.exit(main())
