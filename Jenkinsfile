pipeline {
    agent any

    stages {
        stage('Install Node') {
            steps {
                sh 'node -v || true'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
