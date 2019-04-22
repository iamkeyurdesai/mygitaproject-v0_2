
mysizes <- c("512", "384", "192", "152", "144", "128", "96", "72")

for(i in 1:length(mysizes)) {
image_read("./powergita_logo.png") %>% 
  image_scale(mysizes[i]) %>% 
  image_write(path = sprintf("./icons/icon-%sx%s.png", mysizes[i], mysizes[i]))
}