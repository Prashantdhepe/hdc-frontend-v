//1. when docker is not used its only trigger the jenkins after code commit

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

// 2. when docker is used to build the image after code commit
// pipeline {
//     agent any

//     options {
//         timestamps()
//     }

//     environment {
//         IMAGE_NAME = "hdc-frontend"
//     }

//     stages {

//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     bat """
//                         docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
//                         docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
//                     """
//                 }
//             }
//         }

//     }

//     post {
//         success {
//             echo "✅ Docker image built successfully: ${IMAGE_NAME}:${BUILD_NUMBER}"
//         }
//         failure {
//             echo "❌ Docker image build failed"
//         }
//     }
// }

//3. when docker image is build and push to docker hub after code commit

pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        IMAGE_NAME = "prashantdhepe/hdc-frontend"
        DOCKER_CREDS = credentials('dockerhub_creds')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                """
            }
        }

        // stage('Docker Login') {
        //     steps {
        //         bat """
        //             echo "${DOCKER_CREDS_PSW}" | docker login -u "${DOCKER_CREDS_USR}" --password-stdin
        //         """
        //     }
        // }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_credential',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to Registry') {
            steps {
                bat """
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker push ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            echo "✅ Docker image pushed: ${IMAGE_NAME}:${BUILD_NUMBER}"
        }
        always {
            bat 'docker logout'
        }
    }
}

