#!/usr/bin/env python3
"""
Puxa atualizacoes do repositorio deste projeto (git pull --ff-only).

Script standalone: NAO importa nada do central_commit_diff de proposito, para
poder ser copiado igual para qualquer projeto e rodar com qualquer Python.

Resolucao do repositorio-alvo: sobe a partir da pasta deste arquivo ate achar
um .git, PULANDO as pastas de scripts desta ferramenta. Este script mora em
`<projeto>/_normal_python_scripts/`, entao o alvo e sempre o repositorio logo
acima; se a propria pasta de scripts tiver um .git (acidente), passa reto.

Uso:
    python <este_arquivo>.py
"""
import subprocess
import sys
from pathlib import Path


PASTAS_DE_SCRIPTS = (
    '_normal_python_scripts',
    '_specific_project_scripts',
    '_father_folder_py_scripts',
)


def encontrar_repositorio():
    """Repositorio Git mais proximo acima deste arquivo.

    `.git` pode ser diretorio (repo normal) ou arquivo (submodulo).
    """
    atual = Path(__file__).resolve().parent
    while True:
        if (atual / '.git').exists() and atual.name not in PASTAS_DE_SCRIPTS:
            return atual
        if atual == atual.parent:
            return None
        atual = atual.parent


def branch_atual(repositorio):
    resultado = subprocess.run(
        ['git', 'symbolic-ref', '--quiet', '--short', 'HEAD'],
        cwd=repositorio, capture_output=True, text=True,
    )
    return resultado.stdout.strip() if resultado.returncode == 0 else 'main'


def main():
    repositorio = encontrar_repositorio()
    if repositorio is None:
        print('❌ Nenhum repositorio Git encontrado acima de:'
              f' {Path(__file__).resolve().parent}')
        return 1

    branch = branch_atual(repositorio)
    print(f'⬇️  git pull --ff-only origin {branch} em: {repositorio}')
    resultado = subprocess.run(
        ['git', 'pull', '--ff-only', 'origin', branch], cwd=repositorio
    )
    print('✅ Concluido!' if resultado.returncode == 0 else '❌ Erro!')
    return resultado.returncode


if __name__ == '__main__':
    sys.exit(main())
