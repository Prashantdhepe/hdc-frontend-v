// pipeline {
//     agent any

//     options {
//         timestamps()
//         timeout(time: 20, unit: 'MINUTES')
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Verify Node') {
//             steps {
//                 sh 'node -v'
//                 sh 'npm -v'
//             }
//         }

//         stage('Install Node Dependencies') {
//             steps {
//                 sh 'npm ci'
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 sh 'npm run build'
//             }
//         }
//     }

//     post {
//         success {
//             echo '✅ Frontend CI passed'
//         }
//         failure {
//             echo '❌ Frontend CI failed'
//         }
//         always {
//             cleanWs()
//         }
//     }
// }

// pipeline {
//     agent any

//     options {
//         timestamps()
//         timeout(time: 20, unit: 'MINUTES')
//     }

//     environment {
//         APP_NAME = 'hdc-frontend'
//         DEPLOY_DIR = '/var/www/hdc/Frontend'
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Verify Node') {
//             steps {
//                 sh 'node -v'
//                 sh 'npm -v'
//             }
//         }

//         stage('Install Node Dependencies') {
//             steps {
//                 sh 'npm ci'
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 sh 'npm run build'
//             }
//         }

//         stage('Deploy Frontend') {
//             steps {
//                 sh '''
//                     rsync -av --delete dist/ $DEPLOY_DIR/
//                 '''
//             }
//         }
//     }

//     post {
//         success {
//             echo '✅ Frontend CI/CD passed and deployed successfully'
//         }
//         failure {
//             echo '❌ Frontend CI/CD failed'
//         }
//         always {
//             cleanWs()
//         }
//     }
// }//this file for when there is no docker use 

pipeline {
    agent any

    environment {
        APP_NAME = "hdc-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                  docker build -t hdc-frontend:latest .
                '''
            }
        }

    }

    post {
        success {
            echo "✅ Frontend image built successfully"
        }
        failure {
            echo "❌ Frontend build failed"
        }
    }
}



