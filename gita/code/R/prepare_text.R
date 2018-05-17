  library(rvest)
  library(tidyverse)
  library(glue)
  library(stringr)
  library(janitor)
  library(plotly)
  
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
  slp1_vowel <- c("a", "A", "i", "I", "u", "U", "f", "F", "x", "X", "e", "E", "o", "O")
  mypattern <- collapse(slp1_vowel, sep = "|")
  mycount1 <- str_count(mymain$stanza1_slp1, mypattern)
  mycount2 <- str_count(mymain$stanza2_slp1, mypattern)
  
  mymatch <- str_locate_all(mymain$stanza1_slp1, mypattern)
  
  
  # words from https://sanskritdocuments.org/doc_giitaa/bgwords.html?lang=sa
  mywords <- read_tsv("./data/import/gita_words.txt", col_names = FALSE) %>%
    select(X1) %>%
    filter(!str_detect(X1, "वाच")) %>%
    filter(str_detect(X1, "=")) %>%
    separate(X1, c("sanskrit", "english"), "=") %>%
    mutate(sanskrit = str_trim(sanskrit), english = str_trim(english))
  