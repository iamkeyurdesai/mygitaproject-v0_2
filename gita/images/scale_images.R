library(magick)
library(fs)
library(tidyverse)

setwd("C:/Users/desai/myprojects/webdevelopment/gita/mygitaproject-v0_2/gita/images")

#dir_source <- "./chapter_preview/"
dir_source_tag <- "chapter_4"
dir_source <- paste0(paste0("./",dir_source_tag),"/")
mywidth <- "500"
myquality <- 75

dir_result <- paste0(dir_source, sprintf("%s_%spx/", dir_source_tag, mywidth))

if( dir_exists(dir_result) ) {
  dir_delete(dir_result) 
  dir_create(dir_result)  
} else {
  dir_create(dir_result)  
}

print(paste("working directory:", getwd()))
print(paste("source directory:", dir_source))
print(paste("result directory:", dir_result))

myimgs <- dir(dir_source, include.dirs = FALSE) 
myimgs <- myimgs[!str_detect(myimgs, "extras|size_")]  
print(paste("number of files", length(myimgs)))
myimgs_out <- myimgs %>% as_tibble() %>%
  separate(value, into = c("name", "extension"), sep = "_AdobeStock_") %>%
  separate(extension, into = c("temp", "extension"), sep = "\\.") %>%
  unite(name, extension, col = out, sep = ".") %>%
  pull(out)

original_size <- 0
scaled_size <- 0

for(i in 1:length(myimgs)) {
  print(paste0("working on ", myimgs[i]))
  
  image_read(paste0(dir_source, myimgs[i])) %>%
  image_scale(mywidth) %>%
  image_write(path = paste0(dir_result, myimgs_out[i]), quality = myquality)  
  
  original_size <- original_size + file.size(paste0(dir_source, myimgs[i]))
  scaled_size <- scaled_size + file.size(paste0(dir_result, myimgs_out[i]))
}

print(paste("original_size in MB:", original_size/10^6))
print(paste(paste0(mywidth, "px_size in MB:"), scaled_size/10^6))
