# Monitoring Stack

This directory contains Prometheus and Grafana configurations for monitoring the Discovery Engine.

## Components

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards

## Setup

Apply monitoring manifests:

```bash
kubectl apply -f prometheus.yaml
kubectl apply -f prometheus-deployment.yaml
kubectl apply -f prometheus-service.yaml
kubectl apply -f grafana-deployment.yaml
kubectl apply -f grafana-service.yaml
```

## Access

- Grafana: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090 (via port-forward)

## Port Forwarding

```bash
kubectl port-forward service/grafana-service 3000:3000
kubectl port-forward service/prometheus-service 9090:9090
```
