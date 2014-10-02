FROM tbsalling/javabox
RUN wget --progress=bar "https://dma.ci.cloudbees.com/job/AisWeb/lastSuccessfulBuild/artifact/*zip*/archive.zip" -O /archive.zip
RUN unzip /archive.zip -d /
RUN ln -s /archive/target/*standalone.war /archive/target/standalone.war
EXPOSE 8080
CMD ["java", "-jar", "/archive/target/standalone.war"]
