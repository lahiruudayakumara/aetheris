# Introduction to Aetheris

Aetheris is a next-generation, cloud-native infrastructure framework built to simplify the design, deployment, and scaling of distributed applications. By bridging the gap between infrastructure configuration and application logic, Aetheris allows developers to define scalable cloud architectures using type-safe programming paradigms.

## Key Features

- **Declarative Infrastructure**: Define and deploy microservices, pub/sub topics, databases, and api gateways directly in your codebase.
- **Multi-Language Handlers**: Fully supports TypeScript, JavaScript, C#, Go, and all AWS Lambda supported languages for your function handlers.
- **Complete Cloud-Native Feature Parity**: Includes all essential cloud infrastructure features, such as offline emulation, event triggers, environment mapping, automatic IAM scoping, and rapid zero-downtime deployment pipelines.
- **Auto-Scaling by Design**: Built-in mechanisms to automatically scale resources based on real-time traffic and demand patterns.
- **Zero-Trust Security**: Unified identity and access management (IAM) defined alongside code, with minimal privilege defaults.
- **Multi-Cloud Support**: Write once, deploy to AWS, Google Cloud, or Azure without modifying your application logic.

## Why Aetheris?

Traditional cloud-native development requires juggling Terraform, Kubernetes manifests, and application code across multiple repositories. Aetheris unifies these concerns under a single type-safe framework. 

```typescript
import { Service, Gateway, Database } from '@aetheris/core';

// Create a persistent PostgreSQL database
const db = new Database('users-db', { engine: 'postgres' });

// Create a user service that connects to the database
const userService = new Service('user-service', {
  source: './src/users',
  env: { DATABASE_URL: db.connectionString },
});

// Expose the service via an API Gateway
const gateway = new Gateway('api-gateway');
gateway.route('/users', userService);
```

With Aetheris, compiler checks ensure that your service actually has the correct permissions and connection details for the database before you deploy.
