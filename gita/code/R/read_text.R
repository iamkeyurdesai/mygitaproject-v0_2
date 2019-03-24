library(tidyverse)
library(tesseract)
setwd("C:/Users/desai/myprojects/webdevelopment/gita/mygitaproject-v0_2/gita/code/R")
if(file.exists("../../data/export/sadhak_sanjeevani_english.csv")) {
myfull <- read_csv("../../data/export/sadhak_sanjeevani_english.csv")
istart <- myfull$page[nrow(myfull)] + 1
} else {
  myfull <- NULL
  istart <- 12
}
for( i in istart:2150) {
  imgfile <- pdftools::pdf_convert("../../data/import/Sadhak-Sanjeevini-English.pdf",
                                   pages = i, dpi = 600, format = "tiff", 
                                   filenames = "./tmp.tiff")
  text <- ocr(imgfile)
  if(is.null(myfull)) {
    myfull <- tibble(page = i, text = text)
  } else {
    myfull <- bind_rows(myfull, tibble(page = i, text = text))
  }
  myfull %>% write_csv("../../data/export/sadhak_sanjeevani_english.csv")
}


write_lines(myfull %>% filter(page > 43, page < 112) %>% pull(text), 
            path = "../../data/export/sadhak_sanjeevani_english_chapter1.txt")
