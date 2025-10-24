CI/CD Pipeline for Node.js App with Jenkins, Docker & AWS EC2

Project Overview:
This project demonstrates a complete DevOps workflow for a Node.js web application. The pipeline automates code integration, testing, Docker image creation, and deployment using GitHub, Jenkins, Docker, and AWS EC2. The deployed application includes a simple HTML/CSS UI accessible in a browser.

Technologies Used:

Node.js – Backend server

HTML & CSS – Frontend UI

Docker – Containerization

Jenkins – CI/CD automation

AWS EC2 – Cloud server for deployment

GitHub – Source code management

Project Objectives:

Automate build, test, and deployment of Node.js applications

Deploy Dockerized applications on AWS EC2

Provide a simple UI to show the app is running

Demonstrate CI/CD concepts for real-world DevOps workflow

Architecture Diagram:
Developer → GitHub → Jenkins → Docker → AWS EC2 → Browser UI
Explanation: Developer pushes code to GitHub, Jenkins detects the change and runs the pipeline, Docker builds the container image, Jenkins deploys it on AWS EC2, and the browser shows the HTML/CSS web page.

Project Structure:
cicd-demo/

app.js

package.json

Dockerfile

Jenkinsfile

index.html

style.css

Code Explanation:
app.js – Runs the Node.js web server, serves index.html for / requests and style.css for styling, listens on port 80.
index.html – Web page with heading, version info, and a button.
style.css – Styles the page: background color, fonts, container box, buttons.
Dockerfile – Builds a Docker image with Node.js and app files, exposes port 80, starts the app.
Jenkinsfile – Automates CI/CD: Checkout latest code, build Docker image, run tests, deploy container to AWS EC2.

Pipeline Workflow:

Code Push → GitHub
Build Stage → Docker image is created
Test Stage → Ensure app runs correctly
Deploy Stage → Container runs on AWS EC2
Browser UI → Updated app is live

Testing CI/CD:

Make a change in index.html or app.js
Push to GitHub → Jenkins automatically redeploys
Refresh browser → changes are live








