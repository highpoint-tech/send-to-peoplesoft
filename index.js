#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Request = require('request-promise');
const { version } = require('./package');

require('dotenv').config({ silent: true });

const {
  HTTP_PASSWORD,
  HTTP_USERNAME,
  ISCRIPT_ENVIRONMENT,
  ISCRIPT_HOSTNAME,
  ISCRIPT_NODE
} = process.env;

const program = require('commander');
program
  .version(version, '-v, --version')
  .option('-d, --dir <dir>', 'directory to send to PeopleSoft')
  .option('--with-auth', 'send HTTP credentials with request')
  .parse(process.argv);

const jar = Request.jar();
const request = Request.defaults({
  headers: { 'User-Agent': 'request' },
  jar,
  resolveWithFullResponse: true
});

const url =
  `https://${ISCRIPT_HOSTNAME}/psc/${ISCRIPT_ENVIRONMENT}/EMPLOYEE/${ISCRIPT_NODE}/s/` +
  'WEBLIB_H_DEV.ISCRIPT1.FieldFormula';

const authOptions = {
  user: HTTP_USERNAME,
  pass: HTTP_PASSWORD
};

fs.readdirSync(program.dir).forEach(item => {
  const extension = path.extname(item);

  switch (extension) {
    // CSS & SCSS
    case '.css':
    case '.scss': {
      const fileName = item.replace(extension, '').toUpperCase();
      const styleContent = fs.readFileSync(`${program.dir}/${item}`, 'utf8');
      const options = {
        method: 'POST',
        uri: `${url}.IScript_AddStylesheet?stylesheet=${fileName}&postDataBin=y`,
        body: styleContent,
        headers: { 'content-type': 'text/css' }
      };
      if (program.withAuth) options.auth = authOptions;

      request(options)
        .then(resp => {
          if (resp.statusCode !== 200 && resp.statusCode !== 201) {
            throw Error('Upload failed');
          }
        })
        .catch(err => {
          console.log(err.message);
        });
      break;
    }

    // JavaScript
    case '.js': {
      const fileName = item.replace(extension, '_js').toUpperCase();
      const scriptContent = fs.readFileSync(`${program.dir}/${item}`, 'utf8');
      const options = {
        method: 'POST',
        uri: `${url}.IScript_AddScript?script=${fileName}&postDataBin=y`,
        body: scriptContent,
        headers: { 'content-type': 'application/javascript' }
      };
      if (program.withAuth) options.auth = authOptions;

      request(options)
        .then(resp => {
          if (resp.statusCode !== 200 && resp.statusCode !== 201) {
            throw Error('Upload failed');
          }
        })
        .catch(err => {
          console.log(err.message);
        });
      break;
    }

    // Everything else
    default:
    // Ignore
  }
});
