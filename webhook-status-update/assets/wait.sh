#!/bin/bash

# wait for minikube startup
sleep 10
minikube_status=$(minikube status)
while [[ $minikube_status =~ "Stopped" ]] || [[ $minikube_status =~ "Error" ]] || [[ $minikube_status =~ "Starting" ]]; do
    sleep 1
    minikube_status=$(minikube status)
    echo $minikube_status
done