# Infrastructure

This directory contains all infrastructure-as-code configurations for the AI-Powered Discovery Engine.

## Structure

- `docker/` - Docker-specific configurations
- `kubernetes/` - Kubernetes manifests for deployment
- `github-actions/` - CI/CD workflows
- `terraform/` - Infrastructure provisioning with Terraform
- `monitoring/` - Prometheus and Grafana configurations

## Local Development

Use Docker Compose for local development:

```bash
docker-compose up -d
```

This starts:
- PostgreSQL
- MongoDB
- Redis
- Elasticsearch
- Backend API
- Frontend
- Celery Worker

## Production Deployment

### Terraform

Provision AWS EKS cluster:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Kubernetes

Deploy to Kubernetes:

```bash
kubectl apply -f kubernetes/database/
kubectl apply -f kubernetes/backend/
kubectl apply -f kubernetes/frontend/
kubectl apply -f monitoring/
```

### CI/CD

GitHub Actions automatically:
- Run tests on push/PR
- Build and push Docker images on main branch
- Deploy to Kubernetes on main branch

## Monitoring

Apply monitoring stack:

```bash
kubectl apply -f monitoring/
```

Access Grafana at http://localhost:3000 (admin/admin)
