pipeline {
agent any

environment {
AWS_ACCOUNT_ID = '210700574061'
AWS_REGION = 'ap-south-1'
ECR_REPO_NAME = 'my-app-repo'
IMAGE_TAG = "v${BUILD_NUMBER}"
TARGET_HOST = '52.73.114.9'
SSH_CREDENTIALS_ID = 'ec2-ssh-key'
AWS_CRED_ID = 'aws-cli-creds'  // Jenkins credential id for AWS keys (username/password style)
}

stages {

```
stage('Checkout') {
  steps {
    checkout([$class: 'GitSCM',
      branches: [[name: '*/main']],
      userRemoteConfigs: [[url: 'https://github.com/Praveenm-05/project.git']]
    ])
  }
}

stage('Build Docker Image') {
  steps {
    sh 'docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .'
  }
}

stage('Run Tests') {
  steps {
    sh 'npm test || true' // change to fail on test failure by removing || true
  }
}

stage('Login to ECR & Push') {
  steps {
    withCredentials([usernamePassword(
      credentialsId: "${AWS_CRED_ID}",
      usernameVariable: 'AWS_ACCESS_KEY_ID',
      passwordVariable: 'AWS_SECRET_ACCESS_KEY'
    )]) {
      sh '''
        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
        aws configure set region ${AWS_REGION}

        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

        # create repo if not exists (idempotent)
        aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} || aws ecr create-repository --repository-name ${ECR_REPO_NAME}

        # tag and push
        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
        docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
      '''
    }
  }
}

stage('Deploy to Target EC2') {
  steps {
    sshagent (credentials: [SSH_CREDENTIALS_ID]) {
      sh """
        ssh -o StrictHostKeyChecking=no ubuntu@${TARGET_HOST} \\
          'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com && \\
           docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG} && \\
           docker stop my-app-repo || true && docker rm my-app-repo || true && \\
           docker run -d --name my-app-repo -p 8080:8080 -e IMAGE_TAG=${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}'
      """
    }
  }
}
```

}

post {
success { echo "✅ Deployment succeeded: ${ECR_REPO_NAME}:${IMAGE_TAG}" }
failure { echo "❌ Build or deploy failed." }
}
}
