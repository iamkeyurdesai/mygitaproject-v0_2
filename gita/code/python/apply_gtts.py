import os
# os.chdir(r'C:\Users\desai\myprojects\webdevelopment\gita\mygitaproject-v2\gita')
import pandas
from gtts import gTTS
# mypath = '.\\results\\mp3_slow\\'
mypath = '.\\results\\mp3_normal\\'
myextension = '.mp3'
mywords = pandas.read_csv(".\\data\\import\\mywordsaligned_texttospeech.csv")
for ix in range(864, len(mywords.sanskrit_hk) - 1):
    print(ix)
    mytemp = mywords.sanskrit[ix]
    mytemp1 = mywords.sanskrit_iast[ix]
    # tts = gTTS(text=mytemp, lang='hi', slow=True)
    tts = gTTS(text=mytemp, lang='hi', slow=False)
    tts.save(mypath + mytemp1 + myextension)
 
