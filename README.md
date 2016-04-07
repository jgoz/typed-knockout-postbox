# Typed Knockout Postbox
The type definition for [`knockout-postbox`](https://github.com/rniemeyer/knockout-postbox)

## Installation

**External module (recommended):**
```sh
$ npm install knockout knockout-postbox
$ typings install knockout github:jgoz/typed-knockout-postbox#v0.5.2
```

**Global module:**
```sh
$ npm install knockout knockout-postbox
$ typings install --ambient global!knockout github:jgoz/typed-knockout-postbox/global/typings.json#v0.5.2
```

## Usage

**External module:**

Due to TypeScript restrictions, it is not possible to augment root modules, so `ko.postbox` will not be available in TypeScript sources. The recommendation is to import `knockout-postbox` directly.

```ts
import * as ko from "knockout":
import * as postbox from "knockout-postbox";

const o = ko.observable(1).subscribeTo("topic");

postbox.publish("topic", 2);

o(); // -> 2
```

**Global module:**

```ts
import * as ko from "knockout";
import "knockout-postbox";

const o = ko.observable(1).subscribeTo("topic");

ko.postbox.publish("topic", 2);

o(); // -> 2
```

## LICENSE
MIT

## Contributing

```sh
# Fork this repo
npm install

npm run watch

# add tests, make changes, pass tests ... then [ctrl+c]
npm run publish
```

## Updating
Update `typings.json/version` to match the source version you are typing against.
e.g. if you are creating typings for `chai@3.5.0`, then:
```js
// typings.json
{
  "version": "3.5.0"
  // ...
}
```
