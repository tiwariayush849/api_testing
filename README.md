# Playwright API Testing Project

A Playwright-based API testing project for a demo website using JSONPlaceholder API.

## Features

- **API Testing**: Full API testing using Playwright's APIRequestContext
- **Environment Configuration**: Uses `.env` file for configuration
- **Multiple Test Suites**: Posts, Comments, and Users API tests
- **Comprehensive Reporting**: HTML, JSON, and list reporters
- **Helper Utilities**: Common API testing utilities

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Playwright browsers (run `npm run install:browsers`)

## Installation

```bash
npm install
npm run install:browsers
```

## Configuration

Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` to set your API configuration:
- `API_BASE_URL`: Base URL for the API
- `API_TIMEOUT`: Request timeout in milliseconds
- `NODE_ENV`: Environment (development, production, test)

## Running Tests

```bash
# Run all tests
npm test

# Run only API tests
npm run test:api

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with HTML report
npm run test:report

# Run tests in watch mode
npm run test:watch
```

## Test Structure

```
tests/
  api/
    api.spec.js        # Main API test suite
utils/
  api-helpers.js       # Helper utilities
```

## Test Coverage

The API tests cover:
- **Posts API**: CRUD operations, fetching posts by user, error handling
- **Comments API**: Fetching all comments, comments by post ID
- **Users API**: Fetching users, user details, user albums

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_BASE_URL` | `https://jsonplaceholder.typicode.com` | Base URL for API requests |
| `API_TIMEOUT` | `30000` | Request timeout in milliseconds |
| `NODE_ENV` | `development` | Application environment |

## Reporting

After running tests:
- HTML report: `playwright-report/index.html`
- JSON results: `test-results.json`

## Best Practices

1. Use `test.describe` to group related tests
2. Use `test.beforeAll` and `test.afterAll` for setup/teardown
3. Always check response status with `response.ok()` or `response.status()`
4. Use environment variables for configuration
5. Keep tests independent and isolated

## License

ISC