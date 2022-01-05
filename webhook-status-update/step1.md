# Webhook Status Update Demo

This playground registered a custom resource `tests.resource.tld` with a corresponsing `MutatingWebhookConfiguration`.  
The webhook tries to patch the `status` resource on creation.

## 1. Wait for the script to be finished
Wait until the script in the right terminal is finished.  
It builds the docker image and deploys the K8s resources.

## 2. Create a test resource
Run the following command to create the demo resource.

```bash
kubectl apply -f resources/test.yaml
```

## 3. Verify the status of the resources
Run the following command to describe the resource.

```bash
kubectl describe test test-resource
```

You won't see any status in the resource.

## 4. Manually patch the resource with cURL
Run the following command.

```bash
curl http://localhost:8001/apis/resource.tld/v1/namespaces/default/tests/test-resource/status -d '{"status": {"message": "Hello World from curl"}}' -H 'Content-Type: application/merge-patch+json' -X PATCH
```

## 5. Verify the status of the resources
Run the following command to describe the resource.

```bash
kubectl describe test test-resource
```

You will now see the updated status from the hook, which has overwritten the cURL patch.