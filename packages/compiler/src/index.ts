import { Resource } from '@aetheris/core';

export interface InfrastructureGraph {
  resources: Array<{
    id: string;
    type: string;
    config: Record<string, any>;
    details?: any;
  }>;
}

export async function compile(entryPath: string): Promise<InfrastructureGraph> {
  try {
    // Resolve dynamic path relative to working directory or absolute path
    const module = await import(entryPath);
    const resources: Resource[] = [];
    
    // Traversal of exported properties to discover declared constructs
    for (const key of Object.keys(module)) {
      const exported = module[key];
      if (exported instanceof Resource) {
        resources.push(exported);
      } else if (exported && typeof exported === 'object' && 'default' in exported) {
        const defaultExport = (exported as any).default;
        if (defaultExport instanceof Resource) {
          resources.push(defaultExport);
        }
      }
    }

    // Capture the default export separately if not captured
    if (module.default instanceof Resource && !resources.includes(module.default)) {
      resources.push(module.default);
    }

    return {
      resources: resources.map(res => ({
        id: res.id,
        type: res.type,
        config: res.config,
        details: res.type === 'Gateway' ? (res as any).routes : undefined
      }))
    };
  } catch (error) {
    throw new Error(`Failed to compile Aetheris entry file at ${entryPath}: ${(error as Error).message}`);
  }
}
