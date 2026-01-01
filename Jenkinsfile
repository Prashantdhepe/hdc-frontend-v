pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Node Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build'
            }
        }

    }

    post {
        success {
            echo '✅ CI passed for Vue Frontend'
        }
        failure {
            echo '❌ CI failed for Vue Frontend'
        }
    }
}
