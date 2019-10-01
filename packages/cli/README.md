@staticish/cli
==============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@staticish/cli.svg)](https://npmjs.org/package/@staticish/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@staticish/cli.svg)](https://npmjs.org/package/@staticish/cli)
[![License](https://img.shields.io/npm/l/@staticish/cli.svg)](https://github.com/shelob9/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @staticish/cli
$ staticish COMMAND
running command...
$ staticish (-v|--version|version)
@staticish/cli/0.0.0 darwin-x64 node-v10.16.0
$ staticish --help [COMMAND]
USAGE
  $ staticish COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`staticish hello [FILE]`](#staticish-hello-file)
* [`staticish help [COMMAND]`](#staticish-help-command)

## `staticish hello [FILE]`

describe the command here

```
USAGE
  $ staticish hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ staticish hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/shelob9/cli/blob/v0.0.0/src/commands/hello.ts)_

## `staticish help [COMMAND]`

display help for staticish

```
USAGE
  $ staticish help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
