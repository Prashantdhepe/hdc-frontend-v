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

pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    environment {
        DEPLOY_DIR = '/var/www/hdc/Frontend'
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
                sh 'npm run build'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                    rsync -av --delete dist/ $DEPLOY_DIR/
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Frontend CI/CD passed and deployed successfully'
        }
        failure {
            echo '❌ Frontend CI/CD failed'
        }
        always {
            cleanWs()
        }
    }
}
