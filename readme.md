# Platform WEB UI E2E tests

##### Table of Contents

[1 - Description](#description)  
[2 - Installation](#installation)  
[3 - How to Run test scenarios](#how_to_run)  
[4 - Configure BaseUrl for particular Test Suite](#configure_base_url)  
[5 - Logger](#logger)

<a name="description"/>

## 1 - Description

- playwright v1.24: https://playwright.dev/
- Typescript: https://www.typescriptlang.org/

<a name="installation"/>

## 2 - Installation

Node version - 16.13.x (latest stable)
NPM version - 8 (with `lockfileVersion: 2`)

```sh
1. npm i
2. npm test (to run all the tests)
```

<a name="how_to_run"/>

## 3 - How to Run test scenarios

```sh
1. npm test ./tests/login.spec.ts -> to run only one spec file
2. npm test -- --headed -> enable headed mode
3. npm test -- --grep="@smoke"  -> to run Smoke test only
```

<a name="configure_base_url"/>

## 4 - Configure BaseUrl for a particular Test Suite

```sh
test.use({ baseURL: 'https://playwright.dev' })
```

<a name="logger"/>

## 5 - Logger

```sh
DEBUG=true npm test
```
