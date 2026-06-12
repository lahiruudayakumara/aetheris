# Quickstart Guide

Get your first Aetheris application up and running in less than 5 minutes.

## 1. Create a New Project

Use the `aetheris init` command to bootstrap a new project template:

```bash
aetheris init my-first-app
cd my-first-app
```

This generates the following project directory structure:

```text
my-first-app/
├── aetheris.config.json  # Framework configuration
├── package.json          # Node.js dependencies
├── tsconfig.json         # TypeScript compiler configuration
└── src/
    ├── index.ts          # Infrastructure definition
    └── api/
        └── handler.ts    # Application API logic
```

## 2. Define Infrastructure and Routes

Open `src/index.ts` and examine the code. You will see an API Gateway routing to a simple event-driven function handler:

```typescript
import { Gateway, Function } from '@aetheris/core';

// Create an event-driven function handler
const helloFunction = new Function('hello-func', {
  handler: 'src/api/handler.hello',
  memory: 256,
});

// Configure API Gateway
const gateway = new Gateway('main-gateway');
gateway.route('/hello', helloFunction, { methods: ['GET'] });

export default gateway;
```

## 3. Run Locally

Start the local development server to test your changes in an emulated environment:

```bash
aetheris dev
```

This will spin up a local gateway at `http://localhost:3000`. You can request the endpoint:

```bash
curl http://localhost:3000/hello
```

Response:

```json
{
  "message": "Hello from Aetheris!"
}
```
