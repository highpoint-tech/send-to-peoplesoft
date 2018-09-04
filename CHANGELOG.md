# v0.3.1
* Fix file path

# v0.3.0
* Use [@highpoint/get-ps-token](https://www.npmjs.com/package/@highpoint/get-ps-token)
  to populate cookie jar.

Breaking changes:

* The following environment variables have changed names:
  * `ISCRIPT_HOSTNAME` => `PS_HOSTNAME`
  * `ISCRIPT_ENVIRONMENT` => `PS_ENVIRONMENT`
  * `ISCRIPT_NODE` => `PS_NODE`
  
* The following environments variables are now required:
  * `PS_USERNAME`
  * `PS_PASSWORD`

# v0.2.2
* Log successful uploads

# v0.2.1
* Show response body on error

# v0.2.0
* Add support for uploading *.twig files

Breaking changes:

* Library renamed from `send-to-peoplesoft` to `@highpoint/send-to-peoplesoft`

# v0.1.0
* Initial release
