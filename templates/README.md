# Settings

| Property | Type | Default | Description |
| -------- | ---- | -------- | ----------- |
| `anonName` | `String` | `"Captain"` | Use this name if `name` param is not available. |
| `limit` | `Number` | **required** | Limit of rows |



# Actions

## `hello` ![](https://img.shields.io/badge/cache-true-orange.svg)
Hello action. Response the `Hello Moleculer` string.

### Parameters
| Property | Type | Optional | Description |
| -------- | ---- | -------- | ----------- |
| `idField` | `String` | No | Name of ID field. Default: `_id` |

### Result
Returns with a `String`.

### Example
```js
broker.call("greeter.welcome", { name: "John" }).then(console.log);
```


**Example**
```js
"Welcome, John"
```

# Methods

## `add`
This is an add function. Adds two number.

### Syntax
```js
const res = this.add(a, b);
```

### Parameters
| Property | Type | Description |
| -------- | ---- | ----------- |
| `a` | `Number` |  |
| `b` | `Number` |  |

### Return
Returns with a `Number`.

### Example
```js
broker.call("greeter.welcome", { name: "John" }).then(console.log);
```
