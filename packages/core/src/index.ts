export interface FunctionConfig {
  handler: string;
  memory?: number;
  timeout?: number;
}

export interface GatewayConfig {
  cors?: boolean;
}

export interface RouteOptions {
  methods: string[];
}

export interface DatabaseConfig {
  engine: 'postgres' | 'dynamodb' | 'mysql';
  storageGb?: number;
}

export interface ServiceConfig {
  image?: string;
  cpu?: number;
  memory?: number;
  replicas?: number;
}

// Base class for all Aetheris cloud resources
export abstract class Resource {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly config: Record<string, any> = {}
  ) {}
}

export class Function extends Resource {
  constructor(id: string, config: FunctionConfig) {
    super(id, 'Function', config);
  }
}

export class Route {
  constructor(
    public readonly path: string,
    public readonly target: Function,
    public readonly options: RouteOptions
  ) {}
}

export class Gateway extends Resource {
  public readonly routes: Route[] = [];

  constructor(id: string, config: GatewayConfig = {}) {
    super(id, 'Gateway', config);
  }

  public route(path: string, target: Function, options: RouteOptions): void {
    this.routes.push(new Route(path, target, options));
  }
}

export class Database extends Resource {
  constructor(id: string, config: DatabaseConfig) {
    super(id, 'Database', config);
  }
}

export class Service extends Resource {
  constructor(id: string, config: ServiceConfig) {
    super(id, 'Service', config);
  }
}
