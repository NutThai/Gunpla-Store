pipeline {
    agent any
    environment {
        // It's good practice to keep sensitive or specific data like Docker images, remote hosts, and credentials out of the script for security and flexibility.
        REMOTE_HOST     = 'ubuntu@54.161.216.239' // Replace with your actual username and remote IP.
        SSH_CREDENTIALS = 'vockey' // Use the ID of the Jenkins stored SSH credentials.
        BASE_URL        = "http://54.161.216.239"
    } 

    stages {
         stage('Clear Environment') {
            steps {
                // Uses the SSH Agent plugin to setup SSH credentials.
                sshagent([SSH_CREDENTIALS]) {
                    // These commands manage Docker containers on the remote server.
                    // It stops and removes all containers, then removes all images, before running a new container.
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'rm -rf Gunpla-Store'"
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
                        sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'git clone https://github.com/NutThai/Gunpla-Store'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd Gunpla-Store && echo BASE_URL=${BASE_URL} > .env'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd Gunpla-Store/Gunpla-Shop_backend/cmd/myapps/ && echo OMISE_PUBLIC_KEY=pkey_test_5yyex97jk6w30bf2yhe > .env'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd Gunpla-Store/Gunpla-Shop_backend/cmd/myapps/ && echo OMISE_SECRET_KEY=skey_test_5yyex98g6g5mzezann7 >> .env'"
                        sh "ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} 'cd Gunpla-Store/Gunpla-Shop_backend/cmd/myapps/ && echo SECRET_KEY=oak >> .env'"

                }
            }
        }
        
        stage('Build on Remote Server') {
            steps {
                // Uses the SSH Agent plugin to setup SSH credentials.
                sshagent([SSH_CREDENTIALS]) {
                    // These commands manage Docker containers on the remote server.
                    // It stops and removes all containers, then removes all images, before running a new container.
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'cd Gunpla-Store && docker-compose up -d --build'"

                }
            }
        }

    }
}
