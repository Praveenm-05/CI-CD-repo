pipeline {
    agent any

    environment {
        PROJECT_NAME = 'project'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Praveenm-05/project.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building ${env.PROJECT_NAME}..."
                // Add your build commands here
            }
        }

        stage('Test') {
            steps {
                echo "Running tests for ${env.PROJECT_NAME}..."
                // Add your test commands here
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying ${env.PROJECT_NAME}..."
                // Add your deployment commands here
            }
        }
    }

    post {
        always {
            echo "Cleaning up after ${env.PROJECT_NAME}..."
            // Add your cleanup commands here
        }
    }
}
