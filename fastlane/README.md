fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios code_sign
```
fastlane ios code_sign
```
Fetch certificates and provisioning profiles
### ios test
```
fastlane ios test
```
Build test
### ios staging
```
fastlane ios staging
```
Build staging
### ios production
```
fastlane ios production
```
Build production

----

## Android
### android test
```
fastlane android test
```
Build test
### android staging
```
fastlane android staging
```
Build staging
### android production
```
fastlane android production
```
Build production

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
