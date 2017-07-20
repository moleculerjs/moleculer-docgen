![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-greeter [![NPM version](https://img.shields.io/npm/v/moleculer-greeter.svg)](https://www.npmjs.com/package/moleculer-greeter)

Service mixin to store entities in database.

# Features

# Install

```bash
$ npm install moleculer-greeter --save
```

# Usage

<!-- AUTO-CONTENT-START:USAGE -->```jsconst broker = new ServiceBroker();broker.createService(GreeterService);```
<!-- AUTO-CONTENT-END:USAGE -->

<!-- AUTO-CONTENT-TEMPLATE:USAGE
{{#hasExamples}}
{{#each examples}}
{{{this}}}
{{/each}}
{{/hasExamples}}
-->

# Settings

<!-- AUTO-CONTENT-START:SETTINGS -->| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `anonName` | `String` | **required** | Use this name if `name` param is not available |
| `otherParam` | `Number`, `Object` | **required** | Other settings option |
| `mustOption` | `Array` | `null` | Mandatory option |
| `optional` | `Object` | `null` | Optional option |
| `nestedObj` | `Object` | **required** | Nested object |
| `nestedObj.title` | `String` | `null` | Title |
| `nestedObj.content` | `String` | `null` | Content |

<!-- AUTO-CONTENT-END:SETTINGS -->

<!-- AUTO-CONTENT-TEMPLATE:SETTINGS
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each this}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^this}}
*No settings.*
{{/this}}

-->

# Actions

<!-- AUTO-CONTENT-START:ACTIONS -->## `hello` ![Deprecated action](https://img.shields.io/badge/status-deprecated-orange.svg) 
_<sup>Since: 0.0.1</sup>_

Hello action. Response the `Hello Moleculer` string.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
*No input parameters.*

### Results
**Type:** `String`




## `welcome` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg) ![Deprecated action](https://img.shields.io/badge/status-deprecated-orange.svg) 

The `welcome` action. Response a Welcome message.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `name` | `String` | **required** | Name of user |
| `optional` | `Number` | - | Optional param |
| `isTrue` | `Boolean` | `false` | Boolean param with default value |

### Results
**Type:** `String`

Return with the named welcome message**Response example**```js"Welcome, John"```

### Examples
**Call the action**```jsconst broker = new ServiceBroker();broker.createService({    name: "greeter",    settings: {        anonName: "Unnamed" }});broker.call("greeter.welcome", { name: "John" }).then(console.log);```

<!-- AUTO-CONTENT-END:ACTIONS -->

<!-- AUTO-CONTENT-TEMPLATE:ACTIONS
{{#each this}}
## `{{name}}` {{#each badges}}{{this}} {{/each}}
{{#since}}
_<sup>Since: {{this}}</sup>_
{{/since}}

{{description}}

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each params}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^params}}
*No input parameters.*
{{/params}}

{{#returns}}
### Results
**Type:** {{type}}

{{description}}
{{/returns}}

{{#hasExamples}}
### Examples
{{#each examples}}
{{this}}
{{/each}}
{{/hasExamples}}

{{/each}}
-->

# Methods

<!-- AUTO-CONTENT-START:METHODS -->## `add` 

This is an add function. Adds two number.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `a` | `Number` | **required** |  |
| `b` | `Number` | **required** |  |

### Results
**Type:** `Number`




## `send` 

Send a message to the user

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `user` | `User` | **required** |  |
| `message` | `String` | **required** |  |

### Results
**Type:** `Boolean`




<!-- AUTO-CONTENT-END:METHODS -->

<!-- AUTO-CONTENT-TEMPLATE:METHODS
{{#each this}}
## `{{name}}` {{#each badges}}{{this}} {{/each}}
{{#since}}
_<sup>Since: {{this}}</sup>_
{{/since}}

{{description}}

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each params}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^params}}
*No input parameters.*
{{/params}}

{{#returns}}
### Results
**Type:** {{type}}

{{description}}
{{/returns}}

{{#hasExamples}}
### Examples
{{#each examples}}
{{this}}
{{/each}}
{{/hasExamples}}

{{/each}}
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
