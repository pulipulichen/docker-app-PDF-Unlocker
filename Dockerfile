FROM pudding/docker-app:node-18-7z-20230521

RUN apt-get update --fix-missing

RUN apt-get install -y \
    qpdf

# COPY package.json /
# RUN npm install

#CMD ["bash"]