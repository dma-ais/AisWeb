AisWeb
======

Web portal for various AIS services

## Prerequisites

* Java 8
* Maven 3

## Building

	mvn clean install
	
## Running

Multiple choices for running the web app

### Run Jetty with maven

	mvn jetty:run
	
The maven plugin scans for changes so very suited for web development. Access the app at

	http://localhost:8080/
	
The Jetty Maven plugin can also be run from Eclipse
	
### Run standalone WAR with embedded Jetty

	java -jar target/ais-web-0.1-SNAPSHOT-standalone.war
	
Access the app at

	http://localhost:8080/
	
### Run from IDE

Run `dk.dma.ais.web.app.AisWebApp` from inside Eclipse, IDEA, etc.

To make this work the following enviroment variable must be set:

	runFromIde=true

In Eclipse this can be set using VM arguments in the run configuration:

	-DrunFromIde=true

### Deploy on servlet container

Deploy WAR file on Tomcat, JBoss, Jetty, etc.  

## License ##

This project is licensed under the Apache License, Version 2.0.

