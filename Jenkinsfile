pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Install Node Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

    }

    post {
        failure {
            echo '❌ Frontend CI failed'
        }
        success {
            echo '✅ Frontend CI passed'
        }
    }
}
