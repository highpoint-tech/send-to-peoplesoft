#!/usr/bin/env node

const fs = require('fs');
const getToken = require('@highpoint/get-ps-token');
const path = require('path');
const program = require('commander');
const Request = require('request-promise');
const posthtml = require('posthtml');
const posthtmlPsBinding = require('posthtml-peoplesoft-binding');

const { version } = require('../package');

require('dotenv').config({ silent: true });

const {
  PS_HOSTNAME,
  PS_ENVIRONMENT,
  PS_NODE = 'SA',
  ISCRIPT_RECORD = 'WEBLIB_H_DEV',
  HTTP_PASSWORD = '',
  HTTP_USERNAME = ''
} = process.env;

program
  .version(version, '-v, --version')
  .option('-d, --dir <dir>', 'directory to send to PeopleSoft')
  .option('--with-auth', 'send HTTP credentials with request')
  .parse(process.argv);

const handleError = ({ message }) => {
  console.error(message);
  process.exit(1);
};

(async () => {
  const request = Request.defaults({
    headers: { 'User-Agent': 'request' },
    jar: await getToken(process.env),
    resolveWithFullResponse: true
  });

  const url =
    `https://${PS_HOSTNAME}/psc/${PS_ENVIRONMENT}/EMPLOYEE/${PS_NODE}/s/` +
    `${ISCRIPT_RECORD}.ISCRIPT1.FieldFormula`;

  const authOptions = {
    user: HTTP_USERNAME,
    pass: HTTP_PASSWORD
  };

  const handleResponse = fileName => response => {
    if (
      response.statusCode !== 200 ||
      parseInt(response.headers['x-status-code'], 10) !== 201
    ) {
      throw Error(`Upload failed: ${response.body}`);
    }
    console.log(`Uploaded: ${fileName}`);
  };

  fs.readdirSync(program.dir).forEach(item => {
    const extension = path.extname(item);
    const unparsedFilename = item.toUpperCase().startsWith('H_')
      ? item
      : `H_${item}`;
    switch (extension) {
      // CSS & SCSS
      case '.css':
      case '.scss': {
        const fileName = unparsedFilename.replace(extension, '');
        const styleContent = fs.readFileSync(`${program.dir}/${item}`, 'utf8');
        const options = {
          method: 'POST',
          uri: `${url}.IScript_AddStylesheet?stylesheet=${fileName}&postDataBin=y`,
          body: styleContent,
          headers: { 'content-type': 'text/css' }
        };
        if (program.withAuth) options.auth = authOptions;

        request(options)
          .then(handleResponse(item))
          .catch(handleError);
        break;
      }

      // JavaScript
      case '.js': {
        const fileName = unparsedFilename.replace(extension, '_JS');
        const scriptContent = fs.readFileSync(`${program.dir}/${item}`, 'utf8');
        const options = {
          method: 'POST',
          uri: `${url}.IScript_AddScript?script=${fileName}&postDataBin=y`,
          body: scriptContent,
          headers: { 'content-type': 'application/javascript' }
        };
        if (program.withAuth) options.auth = authOptions;

        request(options)
          .then(handleResponse(item))
          .catch(handleError);
        break;
      }

      // Twig
      case '.twig': {
        const fileName = unparsedFilename.replace(extension, '_TWIG');
        const htmlContent = fs.readFileSync(`${program.dir}/${item}`, 'utf8');
        const options = {
          method: 'POST',
          uri: `${url}.IScript_AddHTML?html=${fileName}&postDataBin=y`,
          body: htmlContent,
          headers: { 'content-type': 'text/html' }
        };
        if (program.withAuth) options.auth = authOptions;

        request(options)
          .then(handleResponse(item))
          .catch(handleError);
        break;
      }

      // html
      case '.html': {
        const fileName = unparsedFilename.replace(extension, '');
        const plainHtmlContent = fs.readFileSync(
          `${program.dir}/${item}`,
          'utf8'
        );
        const htmlContent = posthtml()
          .use(posthtmlPsBinding())
          .process(plainHtmlContent, { sync: true }).html;
        const options = {
          method: 'POST',
          uri: `${url}.IScript_AddHTML?html=${fileName}&postDataBin=y`,
          body: htmlContent,
          headers: { 'content-type': 'text/html' }
        };
        if (program.withAuth) options.auth = authOptions;

        request(options)
          .then(handleResponse(item))
          .catch(handleError);
        break;
      }

      // Everything else
      default:
      // Ignore
    }
  });
})().catch(handleError);
