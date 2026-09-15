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
CAMINHOS_CENTRAL = {
    'windows': Path(r'C:\Users\igor1\OneDrive\Desktop\central_commit_diff'),
    'outros':  Path('/home/igor/Desktop/central_commit_diff'),
}


def main():
    eh_windows = platform.system().lower() == 'windows'
    central = CAMINHOS_CENTRAL['windows'] if eh_windows else CAMINHOS_CENTRAL['outros']
    commit_diff = central / 'commit_diff.py'
    if not commit_diff.exists():
        print(f'❌ commit_diff.py nao encontrado em: {commit_diff}')
        print('   Ajuste CAMINHOS_CENTRAL (onde o central_commit_diff foi clonado).')
        return 1
    start_from = str(Path(__file__).resolve().parent)
    cmd = [sys.executable, str(commit_diff), '--start-from', start_from, *sys.argv[1:]]
    return subprocess.run(cmd).returncode


if __name__ == '__main__':
    sys.exit(main())
