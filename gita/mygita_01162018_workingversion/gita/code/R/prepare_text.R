  library(rvest)
  library(tidyverse)
  library(glue)
  library(stringr)
  library(janitor)
  library(plotly)
  library(jsonlite)
  
  
  setwd("/mnt/results/code/fun/gita/")
  library(V8)
  ctx <- v8(global="window")
  ctx$source("./code/JS/sanscript.js")
  
  # read in text
  # this is the full text obtained from https://sanskritdocuments.org/doc_giitaa/bhagvadnew.html?lang=sa
  mytemp_full <- read_csv("./data/import/gita_sanskrit.txt", col_names = FALSE) %>%
    remove_empty_rows() 
  myheader <- mytemp_full %>% slice(1:3)  # this is the header
  # detect the end line of a verse using the tag ||
  mytemp_full <- mytemp_full %>% 
    slice(-c(1:3)) %>%  # remove the header first
    mutate(end = str_detect(X1, "॥"))
  # merge all the lines upto || in a single item
  mytemp_verse <- NULL
  myverses <- NULL
  for (i in 1 : nrow(mytemp_full)) {
    mytemp_verse <- paste(mytemp_verse, mytemp_full$X1[i], sep = " ") 
    if (mytemp_full$end[i]) { 
      myverses <- c(myverses, mytemp_verse)
      mytemp_verse <- NULL
    } 
  }
  # separate out the verse index
  mytext <- tibble(verse_dev = myverses) %>%
    separate(verse_dev, into = c("verse_dev", "index_dev"), sep = "॥") 
  # separate out the chapter summary verses and the dhyanam verse
  mysummary <- mytext %>%
    filter(!str_detect(index_dev, "-"))
  
  # dhyanam verse
  mydhyanam <- mysummary %>% slice(19) %>% select(verse_dev) 
  # summary verses
  mysummary <- mysummary %>% slice(-19) %>% rename(end_dev = verse_dev) %>%
    mutate(start_dev = na.omit(str_extract(mytext$verse_dev, "अथ.*योगः"))) %>%
    separate(start_dev, into = c("start_dev", "title_dev"), sep = "।") %>%
    mutate(start_dev = str_trim(start_dev), end_dev = str_trim(end_dev), title_dev = str_trim(title_dev)) %>%
    mutate(index_dev = str_trim(index_dev))
  mysummary$index_itrans <- mysummary$index_dev %>% map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "itrans"))
    
  # core verses
  mymain <- mytext %>%
    filter(str_detect(index_dev, "-")) %>%  # remove the summary verses
    mutate(verse_dev = str_replace(verse_dev, "अथ.*योगः", "")) %>%  # remove additional info
    mutate(verse_dev = str_replace_all(verse_dev, "- ", "")) %>%  # verses with - are to be joined
    separate(index_dev, into = c("chapix_dev", "verseix_dev"), sep ="-") %>%  # chapter and verse number
    separate(verse_dev, into = c("a", "b", "c"), sep ="।") %>%  # breakdown the verse into three parts
    mutate(stanza1_dev = if_else(is.na(c), a, b), stanza2_dev = if_else(is.na(c), b, c)) %>%  # assign stanzas
    mutate(speaker_dev = if_else(!is.na(c), a, as.character(NA))) %>%  # assign speaker and fill up NAs
    select(-a, -b, -c) %>%
    mutate(stanza1_dev = str_trim(stanza1_dev), stanza2_dev = str_trim(stanza2_dev), speaker_dev = str_trim(speaker_dev))
  # repeat the speaker using NAs
  for (i in 2 : nrow(mymain)) {
    mymain$speaker_dev[i] <- if_else(!is.na(mymain$speaker_dev[i]), mymain$speaker_dev[i], mymain$speaker_dev[i - 1])
  }
  mymain$chapix_itrans <- mymain$chapix_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "itrans")) %>%
    as.integer()
  mymain$verseix_itrans <- mymain$verseix_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "itrans")) %>%
    as.integer()
  mymain$stanza1_itrans <- mymain$stanza1_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "itrans"))
  mymain$stanza2_itrans <- mymain$stanza2_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "itrans"))
  
  
  mymain %>% 
    filter(!str_detect(stanza1_dev, " ") | !str_detect(stanza2_dev, " ")) %>%
    View()
  
  mymain %>% 
    mutate(nchar = (nchar(stanza1_dev, type = "width") + nchar(stanza2_dev, type = "width"))) %>% 
    arrange(desc(nchar)) %>% 
    View()
  
  itrans_vowel <- c("a", "A", "i", "I", "u", "U", "RRi", "RRI", "LLi", "LLI", "e", "ai", "o", "au")
  mypattern <- collapse(itrans_vowel, sep = "|")
  str_count(mymain$stanza1_itrans, mypattern)

  mymain$stanza1_slp1 <- mymain$stanza1_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "slp1"))
  mymain$stanza2_slp1 <- mymain$stanza2_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "slp1"))
  mymain$speaker_slp1 <- mymain$speaker_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "slp1"))
  mymain$chapix_slp1 <- mymain$chapix_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "slp1"))
  mymain$verseix_slp1 <- mymain$verseix_dev %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "slp1"))
  
  slp1_vowel <- c("a", "A", "i", "I", "u", "U", "f", "F", "x", "X", "e", "E", "o", "O")
  mypattern <- collapse(slp1_vowel, sep = "|")
  mycount1 <- str_count(mymain$stanza1_slp1, mypattern)
  mycount2 <- str_count(mymain$stanza2_slp1, mypattern)
  
  mymatch1 <- str_locate_all(mymain$stanza1_slp1, mypattern)
  mymatch2 <- str_locate_all(mymain$stanza2_slp1, mypattern)
  
  mymain_slp1 <- mymain %>%
    select(stanza1_slp1, stanza2_slp1, speaker_slp1, chapix_slp1, verseix_slp1) %>%
    mutate(count1 = mycount1, count2 = mycount2) %>%
    mutate(chhanda = ifelse(count1 > 19, "Trishtubh", "Anushtubh")) %>%
    mutate(match1 = mymatch1, match2 = mymatch2) %>% 
    rowwise() %>%
    mutate(fusionix1 = ifelse(chhanda == "Trishtubh", unlist(match1)[ceiling(count1 / 2)] + 1, unlist(match1)[ceiling(count1 / 2)] + 1), 
           fusionix2 = ifelse(chhanda == "Trishtubh", unlist(match2)[ceiling(count2 / 2)] + 1, unlist(match2)[ceiling(count2 / 2)] + 1))
  
  mymain_slp1$fusionix1[str_detect(mymain_slp1$stanza1_slp1, "AScaryavatpaSyati kaScidenam")] = 28
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "parastasmAttu BAvo'nyo'vyakto'vyaktAtsanAtanaH")] = "parastasmAttu BAvo'nyo avyakto'vyaktAtsanAtanaH"
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "taM vidyAd duHKasaMyogaviyogaM yogasaMjYitam")] = "taM vidyAd duHKasaMyoga viyogaM yogasaMjYitam"
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "devadvijaguruprAjYapUjanaM SOcamArjavam")] = "devadvijaguruprAjYa pUjanaM SOcamArjavam"
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "atra SUrA mahezvAsA BImArjunasamA yuDi")] = "atra SUrA mahezvAsAH BImArjunasamA yuDi"
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "yuDAmanyuSca vikrAnta uttamOjASca vIryavAn")] = "yuDAmanyuSca vikrAntaH uttamOjASca vIryavAn"
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "anye ca bahavaH SUrA madarTe tyaktajIvitAH")] = "anye ca bahavaH SUrAH madarTe tyaktajIvitAH"
  mymain_slp1$stanza1_slp1[str_detect(mymain_slp1$stanza1_slp1, "antavanta ime dehA nityasyoktAH SarIriRaH")] = "antavanta ime dehAH nityasyoktAH SarIriRaH"
  
  
  mymain_slp1 <- mymain_slp1  %>%
    # rowwise() %>%
    mutate(foot1a = str_sub(stanza1_slp1, end = fusionix1),
           foot1b = str_sub(stanza1_slp1, start = fusionix1 + 1),
           foot2a = str_sub(stanza2_slp1, end = fusionix2),
           foot2b = str_sub(stanza2_slp1, start = fusionix2 + 1))
  
  # I prefer to work in Devanagari
  mymain_slp1$foot1a_dev <- mymain_slp1$foot1a %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$foot1b_dev <- mymain_slp1$foot1b %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$foot2a_dev <- mymain_slp1$foot2a %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$foot2b_dev <- mymain_slp1$foot2b %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  
  mymain_slp1 <- mymain_slp1 %>%
    mutate(foot1a = str_trim(foot1a), foot2a = str_trim(foot2a)) %>% 
    mutate(foot1a_sub = str_sub(foot1a, end = str_length(foot1a) - 1), 
           foot2a_sub = str_sub(foot2a, end = str_length(foot2a) - 1)) %>%
    mutate(foot1a_end = str_sub(foot1a, -1), foot2a_end = str_sub(foot2a, -1)) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "m", "M"), foot2a_end = str_replace(foot2a_end, "m", "M")) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "o", "aH"), foot2a_end = str_replace(foot2a_end, "o", "aH")) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "r", "H"), foot2a_end = str_replace(foot2a_end, "r", "H")) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "d", "t"), foot2a_end = str_replace(foot2a_end, "d", "t")) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "j", "t"), foot2a_end = str_replace(foot2a_end, "j", "t")) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "l", "t"), foot2a_end = str_replace(foot2a_end, "l", "t")) %>%
    mutate(foot1a_end = str_replace(foot1a_end, "s", "H"), foot2a_end = str_replace(foot2a_end, "s", "H")) %>%
    mutate(foot1a = str_c(foot1a_sub, foot1a_end), foot2a = str_c(foot2a_sub, foot2a_end))
  
  # Convert to finalize Devanagari
  mymain_slp1$foot1a_dev <- mymain_slp1$foot1a %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$foot1b_dev <- mymain_slp1$foot1b %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$foot2a_dev <- mymain_slp1$foot2a %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$foot2b_dev <- mymain_slp1$foot2b %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  mymain_slp1$speaker_dev <- mymain_slp1$speaker_slp1 %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "slp1", "devanagari"))
  
  # keep the important columns and write it to JSON
  mymain_slp1_dev <- mymain_slp1 %>%
    select(chapix_slp1, verseix_slp1, chhanda, count1, count2, speaker_dev, foot1a_dev, foot1b_dev, foot2a_dev, foot2b_dev) %>%
    rename(chapterInd = chapix_slp1, verseInd = verseix_slp1, chhandaH = chhanda)
    
  mymain_json <- mymain_slp1_dev %>% 
    toJSON(dataframe = "columns", pretty = TRUE)
  
  mymain_json %>% 
    write_lines("./data/export/gitabyfoot.json")
  
  # keep the important columns and write it to JSON in slp1 to see if compression can be better
  mymain_slp1_slp1 <- mymain_slp1 %>%
    select(chapix_slp1, verseix_slp1, chhanda, count1, count2, speaker_slp1, foot1a, foot1b, foot2a, foot2b) %>%
    rename(chapterInd = chapix_slp1, verseInd = verseix_slp1, chhandaH = chhanda) %>%
    rename(foot1a_slp1 = foot1a, foot1b_slp1 = foot1b, foot2a_slp1 = foot2a, foot2b_slp1 = foot2b)
  
  mymain_json <- mymain_slp1_slp1 %>% 
    toJSON(dataframe = "columns", pretty = TRUE)
  
  mymain_json %>% 
    write_lines("./data/export/gitabyfoot_slp1.json")
  
  mytempstring <- c("श्रीभगवानुवाच","अर्जुन उवाच","धृतराष्ट्र उवाच","सञ्जय उवाच")
  mytempstring <- paste(mytempstring, collapse = "|")
  # words from https://sanskritdocuments.org/doc_giitaa/bgwords.html?lang=sa
  mywords <- read_tsv("./data/import/gita_words.txt", col_names = FALSE) %>%
    select(X1) %>%
    filter(!str_detect(X1, mytempstring)) %>%
    filter(str_detect(X1, "=")) %>%
    separate(X1, c("sanskrit", "english"), "=") %>%
    mutate(sanskrit = str_trim(sanskrit), english = str_trim(english))
  # work on the slp1 script
  mywords$slp1 <- mywords$sanskrit %>% 
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "slp1"))
  # count the number of syllabales in each word
  mywords$nvowels <- str_count(mywords$slp1, mypattern)
  # go through every single word and decide which verse and which foot it belongs
  # based on the number of sum of syllabels
  # use the anushtubh vs tristubh calculations
  mywords_original <- mywords
  mytmpfun <- function(mywords, mymain_slp1_dev, mymain_slp1_slp1, mysize){
    mywords$verse <- NA
    mywords$foot <- NA
    mywords$chapter <- NA
    mywords$chapter_verse <- NA
    j <- 1  # which verse
    mytempsum_foot <- 0
    k <- 1  # which foot
    mymapbeg = FALSE
    mymapend = FALSE
    mymaptrue = FALSE
    mysize = mysize
    myinputfun <- function() {
      myinput <- readline(prompt="Assign (ENTER=TRUE/f=FALSE): ")
      if (myinput=="") { 
        mymaptrue = TRUE 
      } else if (myinput=="f") {
        mymaptrue = FALSE
      } else {
        mymaptrue = myinputfun()
      }
      return(mymaptrue)
    }
    for(i in 1 : nrow(mywords)){
      
      myconsider <- mywords$nvowels[i] < 3
      if ((mytempsum_foot == 0) & (j > 1) & myconsider) {  # last foot was completed so check the present word if it still belogns to it
        if (k == 1) {  # work with the previous verse
          mytemp <- mywords$slp1[i]
          
          mytemp_verse_prev <- str_sub(mymain_slp1_slp1$foot2b_slp1[j-1], -mysize)
          mytemp_last <- str_sub(mytemp, -mysize)
          mymapend = str_detect(str_to_lower(mytemp_verse_prev), str_to_lower(coll(mytemp_last)))  # end
          
          mytemp_verse_curr <- str_sub(mymain_slp1_slp1$foot1a_slp1[j], end = mysize)
          mytemp_first <- str_sub(mytemp, end = mysize)
          mymapbeg = str_detect(str_to_lower(mytemp_verse_curr), str_to_lower(coll(mytemp_first)))  # begining 
          if (mymapend & !mymapbeg) mymaptrue = TRUE
        }
        if (k == 2) {  # work with the current verse
          
          mytemp <- mywords$slp1[i]
          
          mytemp_verse_prev <- str_sub(mymain_slp1_slp1$foot1a_slp1[j], -mysize)
          mytemp_last <- str_sub(mytemp, -mysize)
          mymapend = str_detect(str_to_lower(mytemp_verse_prev), str_to_lower(coll(mytemp_last)))  # end
          
          mytemp_verse_curr <- str_sub(mymain_slp1_slp1$foot1b_slp1[j], end = mysize)
          mytemp_first <- str_sub(mytemp, end = mysize)
          mymapbeg = str_detect(str_to_lower(mytemp_verse_curr), str_to_lower(coll(mytemp_first)))  # begining 
          if (mymapend & !mymapbeg) mymaptrue = TRUE
          
        }
        if (k == 3) {  # work with the current verse
          mytemp <- mywords$slp1[i]
          
          mytemp_verse_prev <- str_sub(mymain_slp1_slp1$foot1b_slp1[j], -mysize)
          mytemp_last <- str_sub(mytemp, -mysize)
          mymapend = str_detect(str_to_lower(mytemp_verse_prev), str_to_lower(coll(mytemp_last)))  # end
          
          mytemp_verse_curr <- str_sub(mymain_slp1_slp1$foot2a_slp1[j], end = mysize)
          mytemp_first <- str_sub(mytemp, end = mysize)
          mymapbeg = str_detect(str_to_lower(mytemp_verse_curr), str_to_lower(coll(mytemp_first)))  # begining 
          if (mymapend & !mymapbeg) mymaptrue = TRUE
        }
        if (k == 4) {  # work with the current verse
          mytemp <- mywords$slp1[i]
          
          mytemp_verse_prev <- str_sub(mymain_slp1_slp1$foot2a_slp1[j], -mysize)
          mytemp_last <- str_sub(mytemp, -mysize)
          mymapend = str_detect(str_to_lower(mytemp_verse_prev), str_to_lower(coll(mytemp_last)))  # end
          
          mytemp_verse_curr <- str_sub(mymain_slp1_slp1$foot2b_slp1[j], end = mysize)
          mytemp_first <- str_sub(mytemp, end = mysize)
          mymapbeg = str_detect(str_to_lower(mytemp_verse_curr), str_to_lower(coll(mytemp_first)))  # begining 
          if (mymapend & !mymapbeg) mymaptrue = TRUE
        }
      }
      
      if (mymaptrue) {
        print(mywords$sanskrit[i])
        if (k == 1){
          cat("\n")
          print(sprintf("i=%d, j-1=%d, j=%d, k=%d", i, j-1, j, k))
          print(mymain$stanza1_dev[j - 1])
          print(mymain$stanza2_dev[j - 1])
          print(mymain$stanza1_dev[j])
          print(mymain$stanza2_dev[j])
          cat("\n")
          mymaptrue <- myinputfun()
        } else {
          cat("\n")
          print(sprintf("i=%d, j=%d, k=%d", i, j, k))
          print(mymain$stanza1_dev[j])
          print(mymain$stanza2_dev[j])
          cat("\n")
          mymaptrue <- myinputfun()
        }
      }  # visual inspectiona to revise mymaptrue
      
      if (mymaptrue) { 
        mywords$foot[i] <- ifelse(k == 1, 4, k - 1)
        mywords$verse[i] <- ifelse(k == 1, j - 1, j)
        mymaptrue = FALSE
        next 
      }  # reassign if true based on visual inspection
        
        mytempsum_foot <- mytempsum_foot + mywords$nvowels[i]
        
        
        if (mymain_slp1_slp1$chhandaH[j] == "Anushtubh") {
          footsyllabaels <- ifelse(j == 59 & (k %in% c(1)), 10, 8)
          if (mytempsum_foot >= footsyllabaels) {
            mywords$foot[i] <- k
            mytempsum_foot <- 0
            k <- k + 1  # increment the foot
          }
          if (k > 4) {
            mywords$verse[i] <- j
            mywords$chapter[i] <- mymain_slp1_slp1$chapterInd[j]
            mywords$chapter_verse[i] <- mymain_slp1_slp1$verseInd[j]
            #print(sprintf("j=%d, k=%d", j, k))
            j <- j + 1  # increment the verse
            k <- 1  # reset the foot
          }
        } else if (mymain_slp1_slp1$chhandaH[j] == "Trishtubh") {
          footsyllabaels <- ifelse(j == 76 & (k %in% c(2, 4)), 13, 11)
          if (mytempsum_foot >= footsyllabaels) {
            mywords$foot[i] <- k
            mytempsum_foot <- 0
            k <- k + 1  # increment the foot
          }
          if (k > 4) {
            mywords$verse[i] <- j
            mywords$chapter[i] <- mymain_slp1_slp1$chapterInd[j]
            mywords$chapter_verse[i] <- mymain_slp1_slp1$verseInd[j]
            #print(sprintf("j=%d, k=%d", j, k))
            j <- j + 1  # increment the verse
            k <- 1  # reset the foot
          }
        }
    }
    return(mywords)
  }
  
  mywords <- mytmpfun(mywords_original, mymain_slp1_dev, mymain_slp1_slp1, 4)
  mywords_backup <- mywords
  # repeat the entries using NAs
  for (i in (nrow(mywords) - 1) : 1) {
    mywords$verse[i] <- if_else(!is.na(mywords$verse[i]), mywords$verse[i], mywords$verse[i + 1])
    mywords$foot[i] <- if_else(!is.na(mywords$foot[i]), mywords$foot[i], mywords$foot[i + 1])
  }
  mywords$chapter <- as.numeric(mymain_slp1_slp1$chapterInd[mywords$verse])
  mywords$chapter_verse <- as.numeric(mymain_slp1_slp1$verseInd[mywords$verse])
  
  # I will tackle 59 and 76 to 79 at the very top of the for loop
  # remember that some cases are not workable easily such as yah becoming yO. for example verse 486 and 570 
  # 337, 301, 263, 228, 212, 137, 87, 70, is not routinely workable either: manual inspection necessary due to complex sandhi rule
  # haha: what a joke. the toughest case is anyway atmanaAtmanam! (see 253)
  # also remember that I did several changes in gita_words.txt as 
  # ~10 words were wrongly handled
  # yah was in english instead of devanagari
  # chasmi should have been cha asmi (two words)
  # prithak prithak was only prithak
  # chintyah was in english instead of devanagari
  # and maybe a few more modifications I made
  # in total 5 hours of time was spent on tracking down these errors
  # kim was in english instead of dev in chapter 16
  # chapter 15 verse 7 was wrong because of three repeated mama 
  
  
  # manual fixing: 1 
  myix = which(mywords$foot == 1 & mywords$chapter == 11 & mywords$chapter_verse == 11)[1]
  mywords[myix, c("verse", "foot", "chapter", "chapter_verse")] <- c(424, 4, 11, 10)  
  
  # manual fixing: 2a and 2b 
  # haha: what a joke. the toughest case is anyway atmanaAtmanam! (see 253)
  myix = which(mywords$foot == 4 & mywords$chapter == 6 & mywords$chapter_verse == 20)[1]
  mywords[myix, c("verse", "foot", "chapter", "chapter_verse")] <- c(253, 3, 6, 20)  
  myix = which(mywords$foot == 1 & mywords$chapter == 6 & mywords$chapter_verse == 21)[1]
  mywords[myix, c("verse", "foot", "chapter", "chapter_verse")] <- c(253, 4, 6, 20)  
  
  # manual fixing: 3a 3b 3c
  myix = which(mywords$foot == 2 & mywords$chapter == 4 & mywords$chapter_verse == 3)[1]
  mywords[myix, c("verse", "foot", "chapter", "chapter_verse")] <- c(165, 1, 4, 3)  
  myix = which(mywords$foot == 4 & mywords$chapter == 4 & mywords$chapter_verse == 3)[1]
  mywords[myix, c("verse", "foot", "chapter", "chapter_verse")] <- c(165, 3, 4, 3)  
  myix = which(mywords$foot == 1 & mywords$chapter == 4 & mywords$chapter_verse == 4)[1]
  mywords[myix, c("verse", "foot", "chapter", "chapter_verse")] <- c(165, 3, 4, 3)  
  # end of manual fixing #
  
  mymaptrue = NULL
  for(i in 1:701) {
    mytemp <- mywords$slp1[mywords$verse == i]
    mytemp_first <- mytemp[1]
    mytemp_last <- mytemp[length(mytemp)]
    
    mytemp_first_verse <- str_sub(mymain_slp1_slp1$foot1a_slp1[i], end = min(str_length(mytemp_first), 2))
    mytemp_last_verse <- str_sub(mymain_slp1_slp1$foot2b_slp1[i], -min(str_length(mytemp_last), 2))
    
    mytemp_first <- str_sub(mytemp_first, end = min(str_length(mytemp_first), 2))
    mytemp_last <- str_sub(mytemp_last, -min(str_length(mytemp_last), 2))
    
    mymapfirst = str_detect(str_to_lower(mytemp_first_verse), str_to_lower(coll(mytemp_first)))  # beginning
    mymaplast = str_detect(str_to_lower(mytemp_last_verse), str_to_lower(coll(mytemp_last)))  # end
    mymaptrue = rbind(mymaptrue, c(mymapfirst, mymaplast))
  }
  mymaptrue <- as_tibble(mymaptrue) %>% rename(first = V1, last = V2) %>% mutate(mapped_correct = first & last)
  
  save(mywords, mywords_backup, mywords_original, mymaptrue, file = "./data/export/interactive_backup_working_01142018.Rdata")
  
  
  # store words plus foot in sanskrit plus english traslation plus chapter and verse id plus speaker info plus chhandah
  mytemp1 <- mywords %>% select(verse, sanskrit, english, foot) %>% nest(-verse) %>% rename(bdata = data)
  mytemp2 <- mymain_slp1_dev %>% select(contains("foot")) 
  mytemp2$idx <- 1:nrow(mytemp2)
  mytemp2 <- mytemp2 %>% gather(key, foot, -idx) %>% 
    select(-key) %>% nest(-idx) %>% rename(vdata = data)
  
  mywords_json <- mymain_slp1_dev %>% 
    bind_cols(mytemp1 %>% select(bdata)) %>%
    bind_cols(mytemp2 %>% select(vdata)) %>%
    toJSON(dataframe = "columns", pretty = TRUE)
  
  mywords_json %>% 
    write_lines("./data/export/gitabyfootandwords_sanskrit.json")
  
  
  # store words plus foot in slp1 plus english traslation plus chapter and verse id plus speaker info plus chhandah
  mytemp1 <- mywords %>% select(verse, slp1, english, foot) %>% nest(-verse) %>% rename(bdata = data)
  mytemp2 <- mymain_slp1_slp1 %>% select(contains("foot")) 
  mytemp2$idx <- 1:nrow(mytemp2)
  mytemp2 <- mytemp2 %>% gather(key, foot, -idx) %>% 
    select(-key) %>% nest(-idx) %>% rename(vdata = data)
  
  mywords_json <- mymain_slp1_slp1 %>% 
    bind_cols(mytemp1 %>% select(bdata)) %>%
    bind_cols(mytemp2 %>% select(vdata)) %>%
    toJSON(dataframe = "columns", pretty = TRUE)
  
  mywords_json %>% 
    write_lines("./data/export/gitabyfootandwords_slp1.json")
  
  
  # this is for making word clouds
  mywords %>%
    write_csv("./data/export/gita_words_cleanedup.csv")
  mykeep <- mywords %>%
    select(sanskrit) %>%
    table() %>%
    as_tibble() %>%
    rename(word = ".") %>%
    filter(n < 32, n > 3) %>%
    mutate(nc = nchar(word)) %>%
    filter(nc >3) %>%
    select(word) 
    
  mywords %>%
    select(sanskrit) %>%
    filter(sanskrit %in% mykeep$word) %>%
    write_csv("./data/export/gita_words_cleanedup_sanskrit.csv", col_names = FALSE)
  
  mywords %>%
    select(sanskrit) %>%
    filter(sanskrit %in% mykeep$word) %>%
    table() %>% 
    as_tibble() %>%
    rename(a = "n", b = ".") %>%
    select(a, b) %>%
    #arrange(desc(a)) %>%
    write_delim("./data/export/gita_words_cleanedup_sanskrit_freq.tsv", col_names = FALSE)
  
  mywords %>%
    select(sanskrit) %>%
    filter(sanskrit %in% mykeep$word) %>%
    pull(sanskrit) %>%
    map_chr(function(x) ctx$call("Sanscript.t", x, "devanagari", "itrans")) %>%
    as_tibble() %>%
    write_csv("./data/export/gita_words_cleanedup_itrans.csv", col_names = FALSE)
  
  
  
  mywords %>%
    distinct(sanskrit) %>%
    write_csv("./data/export/gita_words_unique.csv")
  
  