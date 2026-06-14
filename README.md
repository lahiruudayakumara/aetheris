# Aetheris

![Aetheris Logo](docs/logo.png)

Build, Emulate, and Deploy Cloud-Native Applications on AWS Using Code-First Infrastructure

[![CI Status](https://img.shields.io/github/actions/workflow/status/DreamGen-Labs/aetheris/ci.yml?branch=main&style=flat-square&logo=github-actions&logoColor=white&label=CI%20Status)](https://github.com/DreamGen-Labs/aetheris/actions/workflows/ci.yml) [![Latest Release](https://img.shields.io/github/v/release/DreamGen-Labs/aetheris?style=flat-square&logo=github&logoColor=white&color=blue)](https://github.com/DreamGen-Labs/aetheris/releases) [![License](https://img.shields.io/github/license/DreamGen-Labs/aetheris?style=flat-square&logo=apache&logoColor=white&color=orange)](https://github.com/DreamGen-Labs/aetheris/blob/main/LICENSE) [![Docs Deploy Status](https://img.shields.io/github/actions/workflow/status/DreamGen-Labs/aetheris/deploy-pages.yml?branch=main&style=flat-square&logo=github-actions&logoColor=white&label=Docs)](https://github.com/DreamGen-Labs/aetheris/actions/workflows/deploy-pages.yml)

[![GitHub Stars](https://img.shields.io/github/stars/DreamGen-Labs/aetheris?style=flat-square&logo=github&color=yellow)](https://github.com/DreamGen-Labs/aetheris/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/DreamGen-Labs/aetheris?style=flat-square&logo=github&color=lightgrey)](https://github.com/DreamGen-Labs/aetheris/network/members) [![GitHub Issues](https://img.shields.io/github/issues/DreamGen-Labs/aetheris?style=flat-square&logo=github&color=red)](https://github.com/DreamGen-Labs/aetheris/issues) [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/DreamGen-Labs/aetheris?style=flat-square&logo=github&color=green)](https://github.com/DreamGen-Labs/aetheris/pulls)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) ![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=c-sharp&logoColor=white) ![AWS Supported](https://img.shields.io/badge/AWS-Supported-FF9900?style=flat-square&logo=amazon-aws&logoColor=white) ![pnpm](https://img.shields.io/badge/packageManager-pnpm-34495e?style=flat-square&logo=pnpm&logoColor=white) ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)

---

Aetheris is an open-source, next-generation cloud-native application framework that combines the developer experience of modern application frameworks with the deployment power of AWS on-demand compute and microservice architectures.

Designed to compile, emulate, and deploy infrastructure directly to **Amazon Web Services (AWS)**, Aetheris enables developers to define topologies—such as API Gateways, Lambda Functions, Databases, WebSockets, and Containerized Services—directly in their language of choice (TypeScript, Go, Python, C#). It eliminates complex YAML templates, provisioning resources natively using strongly-typed code constructs with basic automated IAM policy generation and local process simulation.

---

## ⚡ Core Architecture: How it Maps to AWS

Aetheris compiles your language-native infrastructure graphs into optimized, production-ready AWS resources:

| Aetheris Construct | AWS Target Resource | Emulation & Details |
| :--- | :--- | :--- |
| **`Gateway`** | **Amazon API Gateway** (HTTP/REST API) | Emulated locally at `http://localhost:3000` with hot-reloading |
| **`Function`** | **AWS Lambda** (Node.js, Go, Python, C# AOT) | Cross-compiles Go, C# AOT binaries, and Node/Python source trees |
| **`Database`** | **Amazon DynamoDB** or **Amazon RDS/Aurora** | Emulated locally via mock configuration files (full database engine emulation planned) |
| **`Service`** | **Amazon ECS & AWS Fargate** (Containerized) | Deploys containerized microservices behind Application Load Balancers |
| **`WebSocket`** | **Amazon API Gateway WebSocket API** | Emulated locally on port `3001` with connection routing |

---

## 🚀 Key Features

* **Code-First Infrastructure (No YAML/JSON)**: Define cloud infrastructure directly inside your application code with full IDE autocomplete, static typing, and compilation safety.
* **Automated AWS Resource Mapping**: Compiles high-level code constructs directly to target AWS constructs (API Gateway, AWS Lambda, DynamoDB, RDS, ECS Fargate, IAM policies).
* **Dual-Port Local Emulation Suite**: Run a mock HTTP API Gateway on port `3000` and a mock WebSocket Gateway on port `3001` simultaneously, simulating live AWS environments.
* **AOT Compiler & Cold-Start Optimization**: Minimize initialization delays by automatically compiling Go and C# handlers into optimized, Linux-native target binaries (`bootstrap`).
* **Multi-Language Core SDKs**: Support for TypeScript, Go, Python, and C# (.NET 8) with fully matching constructs and zero-dependency compilation.
* **Basic IAM Policy Generation**: Analyzes handler functions to generate basic AWS IAM policies (advanced automated least-privilege role synthesis is planned).
* **Unified Workspace CLI**: Simplify development with a single CLI tool (`aetheris`) managing initialization (`init`), emulation (`dev`), deployment (`deploy`), teardown (`destroy`), and component generation (`generate`).
* **Hybrid Deployment Topologies**: Deploy lightweight, on-demand functions or long-running containerized microservices (via ECS Fargate) side-by-side.
* **Hot-Reloading & Monitoring**: The local development loop monitors source code changes and triggers instant re-compilation and gateway refreshes.
* **Environment-Configurable Logging**: Production-ready logger supporting level-filtering, local-time stamps, quiet mode, and silent execution for CLI pipelines.
* **Preconfigured CI/CD Pipelines**: Includes built-in GitHub Actions configurations for code quality linting, typechecking, Pages deployment, and multi-package release packaging.
* **Multi-Language SDK Blueprint**: Define your AWS cloud architecture natively using ported, identical SDK architectures in Go, Python, C# (.NET 8), and TypeScript (full feature parity is under active development).

---

## 📁 Directory Structure

```text
├── .github/workflows/          # Automated CI/CD & GitHub Pages deploy pipelines
├── docs/                       # Developer Documentation and Website
├── examples/                   # Multi-language project templates
│   ├── monolithic/             # Monolithic API + Database setups
│   │   ├── typescript-project/ # Node.js cloud-native app
│   │   ├── go-project/         # Go Lambda + Postgres DB
│   │   ├── python-project/     # Python Lambda + MySQL DB
│   │   └── csharp-project/     # C# Lambda + DynamoDB
│   ├── microservices/          # De-coupled containerized microservice architectures
│   │   ├── typescript-project/ # TS app with ECS Fargate containers
│   │   ├── go-project/         # Go app with ECS Fargate containers
│   │   ├── python-project/     # Python app with ECS Fargate containers
│   │   └── csharp-project/     # C# app with ECS Fargate containers
│   └── websocket-client/       # Vite + React WebSocket client checker app
└── packages/                   # Core Framework Workspace Packages
    ├── cli/                    # Aetheris command-line tool (commands: dev, deploy, destroy, generate)
    ├── compiler/               # AST parsing and graph compiler
    └── core/                   # Node.js, Go, Python, and C# SDK definitions & generators
```

---

## 💻 Writing Infrastructure Code

Here is how you can write identical infrastructure topologies across different languages:

### TypeScript / Node.js

```typescript
import { Gateway, Database, Service, WebSocket } from '@aetheris/core';

const userDb = new Database('users-db', { engine: 'postgres', storageGb: 20 });
const authService = new Service('auth-service', { image: 'aetheris/auth-service:v1.2.0', replicas: 3 });

const gateway = new Gateway('main-gateway');
gateway.get('/hello', './src/api/handler.hello');

const wsServer = new WebSocket('ws-server', { port: 3001 });
export { gateway, userDb, authService, wsServer };
```

### Go (Golang)

```go
package main
import "aetheris"

func main() {
	aetheris.NewDatabase("task-db", "postgres", 10)
	aetheris.NewService("auth-service", aetheris.ServiceConfig{Image: "auth:v1.0.0", Replicas: 3})

	gateway := aetheris.NewGateway("go-gateway")
	gateway.Get("/hello-go", "./src/api/handler.go", "go")
	gateway.Register()

	aetheris.NewWebSocket("ws-server", 3001)
	aetheris.OutputTopology()
}
```

### Python

```python
import aetheris

def main():
    aetheris.NewDatabase("orders-db", "mysql", 50)
    aetheris.NewService("auth-service", {"image": "auth:v2.0", "replicas": 4})

    gateway = aetheris.Gateway("python-gateway")
    gateway.get("/hello-python", "./src/api/handler.hello")
    gateway.register()

    aetheris.NewWebSocket("ws-server", 3001)
    aetheris.output_topology()

if __name__ == "__main__":
    main()
```

### C# (.NET 8)

```csharp
using Aetheris;

class Program
{
    static void Main(string[] args)
    {
        Core.NewDatabase("items-db", "dynamodb", 5);
        Core.NewService("auth-service", new Core.ServiceConfig { Image = "auth:v1.1", Replicas = 5 });

        var gateway = new Core.Gateway("csharp-gateway");
        gateway.Get("/hello-csharp", "./src/api/Handler::Handler.FunctionHandler");
        gateway.Register();

        Core.NewWebSocket("ws-server", 3001);
        Core.OutputTopology();
    }
}
```

---

## 🛠️ Quick Start

### 1. Build Workspace Dependencies

Prepare compiler scripts and monorepo workspace dependencies:

```bash
pnpm install
pnpm run build
```

### 2. Run Monolithic or Microservice Examples

Launch the local development gateway and compilers concurrently:

* **For Monolithic Examples**:

  ```bash
  pnpm run dev:monolithic
  ```

* **For Microservices Examples**:

  ```bash
  pnpm run dev:microservices
  ```

This starts parallel development compilers with hot-reload monitoring:

* **API Gateway Port**: `http://localhost:3000`
* **API Console / Developer Hub**: `http://localhost:3000/docs`
* **WebSocket Emulation Port**: `ws://localhost:3001`

---

## 🔧 CLI Reference

The Aetheris CLI (`aetheris`) simplifies workspace management:

* `aetheris dev`: Starts the local gateway emulation and websocket mock server.
* `aetheris deploy --stage <stage>`: Builds production bundles and deploys resources to AWS using synthesized CloudFormation stacks.
* `aetheris destroy --stage <stage>`: Tears down all active AWS resources in the target stage.
* `aetheris generate <project|file|service> <name>`: Core-driven code generation command to bootstrap projects, handlers, and microservices (alias: `aetheris g`).

---

## 🗺️ Roadmap & Planned Capabilities

As Aetheris matures, we plan to expand framework capabilities, AWS service integrations, and emulation fidelity. Key focus areas include:

1. **Expanded AWS Service Coverage**:
   * Native constructs for **Amazon S3** buckets, **Amazon Cognito** user pools, **Amazon EventBridge** event buses, **Amazon SQS** queues, **Amazon SNS** topics, **AWS Step Functions**, **Amazon CloudFront** distributions, custom **VPC** topologies, **Route53** records, and **Amazon OpenSearch**.
2. **Robust Infrastructure State Management**:
   * Secure state locking, drift detection, and remote state storage backend integrations (similar to S3 state stores with DynamoDB locking).
3. **Advanced MicroVM Emulation**:
   * Transition local execution from process isolation to microVM-based isolation (e.g. Firecracker) to perfectly simulate AWS Lambda cold-starts and environment configurations.
4. **Enhanced SDK Feature Parity**:
   * Continuous improvement of the TypeScript, Go, Python, and C# SDK signatures to guarantee 100% identical deployment patterns.
   * Dynamic least-privilege IAM policy and role compilation based on static analysis of source file system and network calls.

---

## 🤝 Contributing

We welcome community contributions! Please read our [Contributor Guide](docs/introduction/index.md) to learn about submitting pull requests, opening issues, and contributing to the core SDKs.

## 📄 License

Aetheris is open-source software licensed under the [Apache 2.0 License](LICENSE).
