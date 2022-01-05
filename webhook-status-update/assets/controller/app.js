const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const https = require('https');

const handleWebhook = (webhookRequest) => {
    const patch = []

    patch.push({
        "op": "add",
        "path": "/status",
        "value": {
            "message": `Hello World from hook: ${new Date().toISOString()}`
        }
    });

    return {
        kind: 'AdmissionReview',
        apiVersion: 'admission.k8s.io/v1',
        response: {
            uid: webhookRequest.request.uid,
            allowed: true,
            patchType: 'JSONPatch',
            patch: Buffer.from(JSON.stringify(patch), 'utf8').toString('base64')
        }
    }
}

const app = express();
app.use(bodyParser.json());
app.post('/webhook', (req, res) => {
    res.status(200).send(handleWebhook(req.body));
})
app.use((req, res) => {
    res.status(404).send('Not found');
})

const key  = fs.readFileSync('server.key', 'utf8');
const cert = fs.readFileSync('server.crt', 'utf8');
const server = https.createServer({
    key: key,
    cert: cert
}, app);

server.listen(process.env.PORT || 8443, '0.0.0.0', () => {
    console.log('Server is running');
});