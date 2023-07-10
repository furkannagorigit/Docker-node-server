# select node as the base image
FROM node

# set the current working directory
# you can use any directory here
# if the directory does not exist, image will create the directory first
WORKDIR /src

# copy everything from 
# . (first param): current directory (of local machine) to 
# . (second param): current working directory of image (/src -> WORKDIR on line 5)
COPY . .

# expose port 9999 as the express server will listen on 9999
EXPOSE 9999

# run the express application
CMD node index.js