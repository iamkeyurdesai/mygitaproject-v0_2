import os
os.chdir(r'C:\Users\desai\myprojects\webdevelopment\gita\mygitaproject-v0\gita')
import pandas
from gtts import gTTS
# mypath = '.\\results\\mp3_slow\\'
mypath = '.\\results\\mp3_normal\\'
myextension = '.mp3'
mywords = pandas.read_csv(".\\data\\export\\gita_words_unique.csv")
for ix in range(0, len(mywords.sanskrit) - 1):
    print(ix)
    mytemp = mywords.sanskrit[ix]
    # tts = gTTS(text=mytemp, lang='hi', slow=True)
    tts = gTTS(text=mytemp, lang='hi', slow=False)
    tts.save(mypath + mytemp + myextension)
 
