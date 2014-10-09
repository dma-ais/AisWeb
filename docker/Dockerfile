FROM tbsalling/webbasebox
RUN wget --progress=bar "https://dma.ci.cloudbees.com/job/AisWeb/lastSuccessfulBuild/artifact/*zip*/archive.zip" -O /archive.zip
RUN unzip /archive.zip -d /
RUN (cd /archive/src/main/webapp/dashboard; bower --allow-root update)
WORKDIR /archive/
RUN mvn clean install
EXPOSE 8080
CMD ["mvn", "jetty:run"]
