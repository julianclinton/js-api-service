# js-api-service

# API Gateway Service

## Install node modules
To install the required Node modules:
```bash
npm install
```

## Generating certificates
To generate the certificates:
```bash
mkdir tls
npm run certs
```
This generates `key.pem` and `cert.pem` into the `tls` folder.

## Generating service documentation
To generate the JSDoc documentation:
```bash
npm run doc
```
This generates the documentation into `jsdoc` folder.

## Testing the service
To run the unit tests:
```bash
npm run test
```

## Auditing the service for vulnerabilities
To audit the modules used as dependencies by the production code for "high" level vulnerabilities:
```bash
npm run audit
```
If any are found, these should be addressable by running:
```bash
npm audit fix
```
and then re-running the audit scan to confirm.

## Running the service
To run the service in debug/dev mode:
```bash
npm run dev
```
This will run on port 3001. You can check this with:
```bash
curl -k https://localhost:3001/api/info
```
and:
```bash
curl -k https://localhost:3001/api/health
```

To run the service in production mode on Windows:
```bash
npm run prod:win
```
To run the service in production mode on *nix:
```bash
npm run prod:nix
```
These will both run on port 3001. You can check this using Git BASH (but not Windows PowerShell) with:
```bash
curl -k https://localhost:3001/api/info
```

## Using Docker

### Building a Docker image
```bash
docker build . -t js-api-gateway
```

### Running a Docker image
```bash
docker run -p 3001:3001 -d js-api-gateway
```

If starting the image for the first then to run over the local `jsnet`:
```bash
docker run --net jsnet --name jsapigateway -d js-api-gateway
```

To restart the image:
```bash
docker start jsapigateway
```

To stop the image:
```bash
docker stop jsapigateway
```
