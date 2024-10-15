pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'pipeline', url: 'https://github.com/lsantos08qa/teste-api-ebac.git'
                sh 'npm install'
            }
        }
        
        stage('Iniciar Servidor') {
            steps {
                sh 'nohup npm start &'
            }
        }
        
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}
