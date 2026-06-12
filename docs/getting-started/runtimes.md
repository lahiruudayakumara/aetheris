# Supported Runtimes

Aetheris provides first-class support for multiple programming languages. Whether you are building high-performance services in Go, enterprise-grade applications in C#, or rapid prototypes in Node.js, Aetheris maps them seamlessly to cloud-native constructs.

## Supported Runtimes & Languages

Aetheris matches the official runtime specifications of AWS Lambda, Google Cloud Functions, and Azure Functions, compile-checking your handlers during build time.

| Language | Supported Runtimes | Recommended Handler Template |
| :--- | :--- | :--- |
| **TypeScript / JavaScript** | Node.js 18.x, 20.x, 22.x | `export const handler = async (event) => {}` |
| **Go** | Go 1.x, Go 2.x (via custom AL2023 bootstrap) | `func HandleRequest(ctx context.Context, event Event) (Response, error)` |
| **C# (.NET)** | .NET 6, .NET 8 (AOT supported) | `public async Task<Response> FunctionHandler(Request input, ILambdaContext context)` |
| **Python** | Python 3.9, 3.10, 3.11, 3.12 | `def handler(event, context):` |

## Writing Handlers

### TypeScript (Node.js)

```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from TypeScript runtime" }),
  };
};
```

### Go

```go
package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		Body:       `{"message": "Hello from Go runtime"}`,
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
```

### C# (.NET)

```csharp
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace AetherisApp;

public class Function
{
    public APIGatewayProxyResponse FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        return new APIGatewayProxyResponse
        {
            Body = "{\"message\": \"Hello from C# runtime\"}",
            StatusCode = 200
        };
    }
}
```

## Runtime Performance Comparison

For latency-critical services, we recommend using Go or C# with Native AOT compilation, which reduces cold-start latency down to under 15ms. For standard web applications, TypeScript/JavaScript offers the fastest iteration speeds and robust ecosystem tooling.
