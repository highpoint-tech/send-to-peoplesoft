# Send to PeopleSoft

Sends a directory of assets (CSS, JS, and SCSS) to PeopleSoft.

## Installation

`yarn add -D @highpoint/send-to-peoplesoft`

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

| Variable            | Required | Example                   |
| ------------------- | -------- | ------------------------- |
| PS_HOSTNAME         | True     | example.com               |
| PS_ENVIRONMENT      | True     | csdev92                   |
| PS_NODE             | True     | SA                        |
| PS_USERNAME         | True     | user                      |
| PS_PASSWORD         | True     | password                  |
| ISCRIPT_RECORD      | False    | WEBLIB_H_DEV              |
| HTTP_USERNAME       | False    | user                      |
| HTTP_PASSWORD       | False    | password                  |
