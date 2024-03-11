pipeline {
    agent any
    environment {
        // It's good practice to keep sensitive or specific data like Docker images, remote hosts, and credentials out of the script for security and flexibility.
        REMOTE_HOST     = 'ubuntu@54.161.216.239' // Replace with your actual username and remote IP.
        SSH_CREDENTIALS = 'vockey' // Use the ID of the Jenkins stored SSH credentials.
        IP              = sh(script: 'dig +short myip.opendns.com @resolver1.opendns.com', returnStdout: true).trim()
        BASE_URL        = "http://54.161.216.239"
    }
    
    stages {
         stage('Clear Environment') {
            steps {
                // Uses the SSH Agent plugin to setup SSH credentials.
                sshagent([SSH_CREDENTIALS]) {
                    // These commands manage Docker containers on the remote server.
                    // It stops and removes all containers, then removes all images, before running a new container.
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'rm -rf kro-store'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker stop \$(docker ps -a -q) || true'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker rm \$(docker ps -a -q) || true'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker rmi \$(docker images -q) || true'"
                }
            }
        }
        
        stage('Clone Git on Remote Server') {
            steps {
                // Uses the SSH Agent plugin to setup SSH credentials.
                sshagent([SSH_CREDENTIALS]) {
                    // These commands manage Docker containers on the remote server.
                    // It stops and removes all containers, then removes all images, before running a new container.
                        sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'git clone https://github.com/RomeyKung/kro-store.git'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd kro-store && echo BASE_URL=${BASE_URL} > .env'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd kro-store/kro-backend && echo OMISE_PUBLIC_KEY=pkey_test_5yy91xv84zjnnitvdw0 > .env'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd kro-store/kro-backend && echo OMISE_SECRET_KEY=skey_test_5wmco0oh1cfnliaoszv >> .env'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd kro-store/kro-backend && echo SECRET_KEY=s_kroKey_back_i2tpohbojgagageq3u4ihryh >> .env'"

                }
            }
        }
        
        stage('Build on Remote Server') {
            steps {
                // Uses the SSH Agent plugin to setup SSH credentials.
                sshagent([SSH_CREDENTIALS]) {
                    // These commands manage Docker containers on the remote server.
                    // It stops and removes all containers, then removes all images, before running a new container.

                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'cd kro-store && docker-compose up -d --build'"

                }
            }
        }

    }
}
