### `hello` ![](https://img.shields.io/badge/cache-true-blue.svg) ![](https://img.shields.io/badge/status-deprecated-orange.svg)
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