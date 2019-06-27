import os
os.chdir(r'C:\Users\desai\myprojects\webdevelopment\gita\mygitaproject-v0_2\gita')
import pandas
from gtts import gTTS
# mypath = '.\\results\\mp3_slow\\'
mypath = '.\\results\\mp3_alphabet\\'
myextension = '.mp3'
mywords = pandas.read_csv(".\\data\\import\\sanskrit_alphabet_texttospeech.csv")
for ix in range(0, len(mywords.sanskrit)):
    print(ix)
    mytemp = mywords.sanskrit[ix]
    # mytemp1 = mywords.sanskrit_iast[ix]
    tts = gTTS(text=mytemp, lang='hi', slow=True)
    #tts = gTTS(text=mytemp, lang='hi', slow=False)
    tts.save(mypath + mytemp + myextension)