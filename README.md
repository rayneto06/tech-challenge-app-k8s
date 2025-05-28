# tech-challenge-app-k8s

Node.js app + Kubernetes manifests.

## Local Docker Build

```bash
docker build -t tc-app:local .
docker run -p 3000:3000 tc-app:local
// test CI
