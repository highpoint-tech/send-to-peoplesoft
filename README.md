# Send to PeopleSoft

Sends a directory of assets (CSS, JS, and SCSS) to PeopleSoft.

## Installation

`yarn add -D send-to-peoplesoft`

## Usage

In your package.json file's `scripts` section, add a script similar to this:

`"send-to-peoplesoft": "send-to-peoplesoft -d ./dist`

This will send all asset files in the `./dist` directory to your PeopleSoft
environment.

To function correctly, you must populate a `.env` file with the values found
below. Use `.env-sample` as a starting point.

If you protect your PeopleSoft environment with HTTP Basic Authentication,
then also include `--with-auth` in the command.

## Environment

Copy `.env-sample` to `.env` and fill in the required fields.

| Variable            | Example                   |
| ------------------- | ------------------------- |
| ISCRIPT_HOSTNAME    | example.com               |
| ISCRIPT_ENVIRONMENT | csdev92                   |
| ISCRIPT_NODE        | SA                        |
| HTTP_USERNAME       | user                      |
| HTTP_PASSWORD       | password                  |
