pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Node Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npx vite build'
            }
        }
    }

    post {
        success {
            echo '✅ Frontend CI passed'
        }
        failure {
            echo '❌ Frontend CI failed'
        }
        always {
            cleanWs()
        }
    }
}
