pipeline {
  agent any
  environment {
    IMAGE_TAG = "cicd-demo:${BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/<yourusername>/cicd-demo.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t ${IMAGE_TAG} .'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm test || true'
      }
    }
    stage('Deploy') {
      steps {
        sh '''
          docker stop cicd-demo || true
          docker rm cicd-demo || true
          docker run -d --name cicd-demo -p 80:80 ${IMAGE_TAG}
        '''
      }
    }
  }
  post {
    success { echo "Pipeline finished successfully!" }
    failure { echo "Pipeline failed!" }
  }
}

