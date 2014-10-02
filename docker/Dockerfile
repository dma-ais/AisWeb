FROM tbsalling/javabox
#due to bower dependencies, we can't use the standalone war
RUN apt-get update
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g bower
RUN apt-get install -y maven
RUN wget --progress=bar "https://dma.ci.cloudbees.com/job/AisWeb/lastSuccessfulBuild/artifact/*zip*/archive.zip" -O /archive.zip
RUN unzip /archive.zip -d /
RUN (cd /archive/src/main/webapp/dashboard; bower --allow-root update)
WORKDIR /archive/
RUN mvn clean install
EXPOSE 8080
CMD ["mvn", "jetty:run"]
