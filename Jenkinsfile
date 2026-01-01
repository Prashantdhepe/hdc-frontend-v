// pipeline {
//     agent any

//     options {
//         timestamps()
//     }

//     stages {

//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Node Dependencies') {
//             steps {
//                 bat 'npm ci'
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 bat 'npm run build'
//             }
//         }

//     }

//     post {
//         success {
//             echo '✅ CI passed for Vue Frontend'
//         }
//         failure {
//             echo '❌ CI failed for Vue Frontend'
//         }
//     }
// }


pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        IMAGE_NAME = "hdc-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat """
                        docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                        docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                    """
                }
            }
        }

    }

    post {
        success {
            echo "✅ Docker image built successfully: ${IMAGE_NAME}:${BUILD_NUMBER}"
        }
        failure {
            echo "❌ Docker image build failed"
        }
    }
}
