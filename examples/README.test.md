![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-greeter [![NPM version](https://img.shields.io/npm/v/moleculer-greeter.svg)](https://www.npmjs.com/package/moleculer-greeter)

Service mixin to store entities in database.

## Features

## Install

```bash
$ npm install moleculer-greeter --save
```

## Usage

<!-- AUTO-CONTENT-START:USAGE -->
<!-- AUTO-CONTENT-END:USAGE -->

<!-- AUTO-CONTENT-TEMPLATE:USAGE
{{#each examples}}
{{{this}}}
{{/each}}
-->

## Settings

<!-- AUTO-CONTENT-START:SETTINGS -->
<!-- AUTO-CONTENT-END:SETTINGS -->

<!-- AUTO-CONTENT-TEMPLATE:SETTINGS
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#this}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/this}}
-->

## Actions

<!-- AUTO-CONTENT-START:ACTIONS -->
<!-- AUTO-CONTENT-END:ACTIONS -->

<!-- AUTO-CONTENT-TEMPLATE:ACTIONS
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

-->

## Methods

<!-- AUTO-CONTENT-START:METHODS -->
<!-- AUTO-CONTENT-END:METHODS -->

<!-- AUTO-CONTENT-TEMPLATE:METHODS
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

-->

# Test
```
$ npm test
```

In development with watching

```
$ npm run ci
```

# License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

# Contact
Copyright (c) 2016-2017 Ice Services

[![@ice-services](https://img.shields.io/badge/github-ice--services-green.svg)](https://github.com/ice-services) [![@MoleculerJS](https://img.shields.io/badge/twitter-MoleculerJS-blue.svg)](https://twitter.com/MoleculerJS)
