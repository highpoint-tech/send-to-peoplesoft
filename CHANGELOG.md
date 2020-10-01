# v1.0.0
* Upgrade authentication method in @highpoint/get-ps-token for new oci environments

# v0.5.0
* Add support for uploading *.html files

# v0.4.1
* Upgrade to latest `@highpoint/get-ps-token`.

# v0.4.0
Breaking changes:

* Exit with error status on failed upload

# v0.3.2
* Handle invalid usernames/passwords

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
