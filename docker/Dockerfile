FROM tbsalling/webbasebox
#RUN wget --progress=dot:mega "https://dma.ci.cloudbees.com/job/AisWeb/lastSuccessfulBuild/artifact/*zip*/archive.zip" -O /archive.zip
RUN  wget --progress=dot:mega "https://dma.ci.cloudbees.com/job/AisWeb/lastSuccessfulBuild/artifact/target/ais-web-0.1-SNAPSHOT-standalone.war" -O /ais-web.war

RUN unzip /archive.zip -d /
#RUN (cd /archive/src/main/webapp/dashboard; bower --allow-root update)
WORKDIR /archive/
#RUN mvn install
EXPOSE 8080
CMD ["java", "-jar", "/ais-web.war"]
