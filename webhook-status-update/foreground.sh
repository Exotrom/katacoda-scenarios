#!/bin/bash

echo "Wait for minikube to be ready"
while [ ! -f /root/data/wait.sh ]; do sleep 1; done
cd /root/data/ && chmod +x ./wait.sh && ./wait.sh
echo "Build docker image for webhook"
cd /root/data/ && chmod +x ./build-docker.sh && ./build-docker.sh
echo "Prepare K8s resources"
cd /root/data/ && chmod +x ./apply-resources.sh && ./apply-resources.sh
echo "Start API proxy in background"
kubectl proxy& > /dev/null
echo "Done. Please continue with the guide"