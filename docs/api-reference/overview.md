# API Reference

This document covers the core classes and structures exported by the `@aetheris/core` package.

## Gateway

The `Gateway` class defines an HTTP or WebSocket entry point for routing client requests. It configures public routing interfaces, SSL parameters, rate limiting, and request validation.

```typescript
class Gateway {
  constructor(name: string, config?: GatewayConfig);
  
  /**
   * Route an incoming HTTP path to a specific service or event-driven function.
   */
  route(path: string, target: Service | Function, options?: RouteOptions): void;
}
```

### GatewayConfig

```typescript
interface GatewayConfig {
  cors?: boolean | CorsOptions;
  rateLimit?: {
    requestsPerMinute: number;
    burstLimit?: number;
  };
  domainName?: string;
  certificateArn?: string;
}
```

---

## Function

The `Function` class represents an event-driven function handler. Functions automatically scale to zero when idle and scale up dynamically to meet request load.

```typescript
class Function {
  constructor(name: string, config: FunctionConfig);
}
```

### FunctionConfig

```typescript
interface FunctionConfig {
  /**
   * Path to the function handler entrypoint (e.g. 'src/api/handler.hello')
   */
  handler: string;
  
  /**
   * Target runtime language
   * Supported: 'nodejs18.x' | 'nodejs20.x' | 'go1.x' | 'dotnet8' | 'python3.11'
   */
  runtime: 'nodejs18.x' | 'nodejs20.x' | 'go1.x' | 'dotnet8' | 'python3.11';
  
  /**
   * Allocated memory size in Megabytes (default: 128)
   */
  memory?: number;
  
  /**
   * Execution timeout duration in seconds (default: 6)
   */
  timeout?: number;
  
  /**
   * Key-value environment variables injected at runtime
   */
  env?: Record<string, string>;
}
```

---

## Database

The `Database` class provisions relational or non-relational database instances. Aetheris handles authentication, automatic connection rotation, and backup schedules natively.

```typescript
class Database {
  constructor(name: string, config: DatabaseConfig);
  
  /**
   * Returns a type-safe connection string injected with credentials at deployment.
   */
  get connectionString(): string;
}
```

### DatabaseConfig

```typescript
interface DatabaseConfig {
  engine: 'postgres' | 'mysql' | 'dynamodb' | 'mongodb';
  version?: string;
  storageGb?: number;
  multiAz?: boolean;
}
```
