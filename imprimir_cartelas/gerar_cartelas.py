import json
import random

# Função para gerar cartelas únicas de bingo
def gerar_cartelas_bingo(total_cartelas, numeros_por_cartela, limite_numeros):
    todas_cartelas = []

    while len(todas_cartelas) < total_cartelas:
        numeros_cartela = sorted(random.sample(range(1, limite_numeros + 1), numeros_por_cartela))

        # Verifica se a cartela já existe
        if numeros_cartela not in [cartela["numeros"] for cartela in todas_cartelas]:
            todas_cartelas.append({"id": len(todas_cartelas) + 1, "numeros": numeros_cartela})

    return todas_cartelas

# Parâmetros
TOTAL_CARTELAS = 60
NUMEROS_POR_CARTELA = 9
LIMITE_NUMEROS = 75

# Gerar cartelas e salvar em JSON
cartelas = gerar_cartelas_bingo(TOTAL_CARTELAS, NUMEROS_POR_CARTELA, LIMITE_NUMEROS)
resultado = {"cartelas": cartelas}

# Salva o resultado em um arquivo JSON
with open("cartelas_bingo.json", "w") as arquivo:
    json.dump(resultado, arquivo, ensure_ascii=False, separators=(",", ":"))

print("Cartelas de bingo geradas e salvas em 'cartelas_bingo.json'.")
