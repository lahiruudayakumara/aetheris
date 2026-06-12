# CLI Reference

The Aetheris CLI (`aetheris`) is your primary tool for managing projects, developing locally, and deploying infrastructure.

## Commands

### `init`

Create a new Aetheris project from a template.

```bash
aetheris init <project-name> [--template <template-name>]
```

- `<project-name>`: Name of your project directory.
- `--template`: Choose standard templates (e.g. `typescript`, `javascript`, `microservices`).

### `dev`

Start the local development server and resource emulation.

```bash
aetheris dev [--port <number>] [--docker-compose <path>]
```

### `deploy`

Deploy the current application to the configured cloud provider.

```bash
aetheris deploy --stage <stage-name> [--yes]
```

- `--stage`: The target environment (e.g. `dev`, `staging`, `prod`).
- `--yes`: Skip confirmation prompts.

### `destroy`

Tear down all deployed resources in the cloud.

```bash
aetheris destroy --stage <stage-name> [--yes]
```
