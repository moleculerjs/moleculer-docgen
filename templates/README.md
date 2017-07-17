# GreeterService
Greeter test service

## Install

``` bash
npm install moleculer-greeter --save
```

## Usage
```js
const broker = new ServiceBroker();
broker.createService(GreeterService);
```

## Settings

| Property | Type | Default | Description |
| -------- | ---- | -------- | ----------- |
| `anonName` | `String` | `"Captain"` | Use this name if `name` param is not available. |
| `limit` | `Number` | **required** | Limit of rows |


## Actions

### `hello` ![](https://img.shields.io/badge/cache-true-green.svg) ![](https://img.shields.io/badge/status-deprecated-red.svg)
_<sup>Since: 0.0.1</sup>_

Hello action. Response the `Hello Moleculer` string.

#### Parameters
| Property | Type | Optional | Description |
| -------- | ---- | -------- | ----------- |
| `idField` | `String` | No | Name of ID field. Default: `_id` |

#### Result
Returns with a `String`.

#### Examples
```js
broker.call("greeter.welcome", { name: "John" }).then(console.log);

/* Result:
	"Welcome, John"
*/
```

## Methods

### `add`
This is an add function. Adds two number.

#### Syntax
```js
const res = this.add(a, b);
```

#### Parameters
| Property | Type | Description |
| -------- | ---- | ----------- |
| `a` | `Number` |  |
| `b` | `Number` |  |

#### Result
Returns with a `Number`.

#### Examples
```js
broker.call("greeter.welcome", { name: "John" }).then(console.log);
```
