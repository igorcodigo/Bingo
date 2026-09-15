from moviepy import VideoFileClip
import os

def extrair_audio(caminho_video):
    video = VideoFileClip(caminho_video)

    nome_base = os.path.splitext(caminho_video)[0]
    caminho_audio = f"{nome_base}.mp3"

    video.audio.write_audiofile(caminho_audio)
    video.close()

    print("Áudio extraído com sucesso!")
    print("Salvo em:", caminho_audio)

extrair_audio(r"C:\Users\igor\Downloads\ESTUDOS FINAIS N701 GER DE SERVIÇOS NO CIBERESPAÇO.mp4")
