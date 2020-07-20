# Check the [Settings Branch](https://github.com/bannerbombs-klasa-plugins/klasa-textchannel-gateway/tree/settings) for an up-to-date version.

This is the repository for the original klasa-textchannel-gateway package.

# klasa-textchannel-gateway

Simple plugin to manage an efficient per-textchannel settings gateway.

## Installation

```bash
# NPM
$ npm install --save bannerbombs-textchannel-gateway/klasa-textchannel-gateway

# Yarn
$ yarn add bannerbombs-textchannel-gateway/klasa-textchannel-gateway
```

## Setup

```js
const { Client } = require('klasa');

Client.use(require('klasa-textchannel-gateway'));

// Modifying the Schema
Client.defaultTextChannelSchema
    .add('experience', 'integer', { default: 0 })
    .add('level', 'integer', { default: 0 });
```
