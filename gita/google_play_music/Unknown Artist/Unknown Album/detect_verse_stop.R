setwd("C:/Users/desai/myprojects/webdevelopment/gita/mygitaproject-v0_2/gita/google_play_music/Unknown Artist/Unknown Album")
library(tuneR)
library(seewave)
library(tidyverse)

# i = 1
# mysound <- readMP3(sprintf("00 - Bhagavad-gita%02d.mp3.mp3", i))
# myrate <- mysound@samp.rate
# mygram <- spectro(mysound, f = myrate, scale = FALSE, plot = FALSE)
# 
# 
# mytime <- 36.76
# myix <- mytime / (512 / myrate)
# myix <- round(myix)
# mydetect <- mygram$amp[, myix]
# 
# myspec <- NULL
# myspec$x <- seq(0, length(mygram$freq) - 1, 1) * (myrate / 512)
# myspec$y <- mydetect
# myspec <- as_tibble(as.data.frame(myspec))
# 
# # myg <- ggplot(myspec, aes(x, y)) +
# #   geom_point()
# # ggplotly(myg)
# 
# 
# f_thr <- c(725, 925)
# n_thr <- f_thr / myrate * 512
# n_thr <- c(floor(n_thr[1]), ceiling(n_thr[2]))
# mypattern <- mydetect[n_thr[1]:n_thr[2]]

mytimeall <- c(36.76, 97.93, 57.10, 39.15, 39.85)
mycorall_thr <- c(0.99, 0.99, 0.98, 0.99, 0.98)
mydist_all <- c(10, 10, 10, 10, 10)

for(i in 5:5) {
# if(i==14 | i==17) next  
mysound <- readMP3(sprintf("00 - Bhagavad-gita%02d.mp3.mp3", i))
mysound@left[is.na(mysound@left)] = 0
mysound@right[is.na(mysound@right)] = 0
myrate <- mysound@samp.rate
mygram <- spectro(mysound, f = myrate, scale = FALSE, plot = FALSE)
print(sprintf("done chapter %02d...", i))

# mygram_org <- mygram

mytime <- mytimeall[i]
myix <- mytime / (512 / myrate)
myix <- round(myix)
mydetect <- mygram$amp[, myix]



f_thr <- c(725, 925)
n_thr <- f_thr / myrate * 512
n_thr <- c(floor(n_thr[1]), ceiling(n_thr[2]))


mycor <- cor(mygram$amp[n_thr[1]:n_thr[2], ], mydetect[n_thr[1]:n_thr[2]])

mycor_decide <- (mycor > mycorall_thr[i]) * mycor

mydata <- NULL
mydata$x <- (1:length(mygram$time)) * (512 / myrate)
mydata$y <- mycor_decide
mydata$z <- mycor
mydata <- as_tibble(as.data.frame(mydata))
for(j in nrow(mydata):50) {
  mydata$y[j] = ifelse(sum(mydata$y[(j-49) : (j-1)] > 0) > 0, 0, mydata$y[j])
}

mylabels <- NULL
mylabels$start <- mydata$x[which(mydata$y > 0)]
mylabels$end <- mylabels$start
mylabels <- as_tibble(as.data.frame(mylabels))
mylabels$keep = TRUE
for(jj in nrow(mylabels):2){
  if( (mylabels$start[jj] - mylabels$start[jj-1]) < mydist_all[i]) mylabels$keep[jj] = FALSE
}
mylabels = mylabels[mylabels$keep, ] %>% select(-keep)
mylabels$index <- 1:nrow(mylabels)
write_tsv(mylabels, path = sprintf("./chap%02d_labels.txt", i), col_names = FALSE)
}


















mydata <- NULL
mydata$x <- (1:length(mygram$time)) * (512 / myrate)
mydata$y <- mygram$amp[20, ]
mydata <- as_tibble(as.data.frame(mydata))
mydata <- mydata %>%
  mutate(z = (y > -2) * y, z_lgc = y > -2, z_lgc_keep = z_lgc)
for(j in nrow(mydata):2) {
  mydata$z_lgc_keep[j] = ifelse(mydata$z_lgc[j-1], FALSE, mydata$z_lgc_keep[j])
}
myg <- ggplot(mydata, aes(x, z_lgc_keep)) +
  geom_point()
ggplotly(myg)



mydomin <- as_tibble(dfreq(mysound, myrate))
mydomin1 <- mydomin %>% 
  mutate(y = ifelse(is.na(y), 0, y)) %>%
  mutate(z = abs(y - 0.8) < 0.02) %>%
  mutate(y_thr = y * z)

myg <- mydomin1 %>%
  ggplot(aes(x, y_thr)) +
  geom_point()
ggplotly(myg)
