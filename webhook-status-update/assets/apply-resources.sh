#!/bin/bash

kubectl apply -f resources/deployment.yaml
kubectl apply -f resources/service.yaml
kubectl apply -f resources/crd.yaml
kubectl apply -f resources/hook.yaml

kubectl rollout status deployment cr-controller