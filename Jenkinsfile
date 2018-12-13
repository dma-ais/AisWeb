pipeline {
    agent any

    tools {
        maven 'M3.3.9'
    }

    triggers {
        pollSCM('H H * * *')
    }

    stages {
        stage('build') {
            steps {
                withMaven() {
                    sh 'mvn -DincludeSrcJavadocs clean source:jar install'
                }
            }
        }

        stage('Docker Build on DockerHub') {
            when {
                branch 'master'
            }
            steps {
                sh 'curl --data "build=true" -X POST https://registry.hub.docker.com/u/dmadk/ais-web/trigger/62822668-4a48-11e4-857d-52795516953c/'
            }
        }

    }


    post {
        failure {
            // notify users when the Pipeline fails
            mail to: 'steen@lundogbendsen.dk',
                    subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                    body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}

