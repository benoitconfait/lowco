# mobile app login (main account) with ATES
## (lab) integration
Lab delivered by ATES on January 22nd 2018.
### typical example (delivered by ATES)
 GET http://212.129.12.246/oauth2-demo-client/

## oAuth 2.0 documentation for login sequence
[See official oAuth 2.0 specs here.](https://tools.ietf.org/html/draft-ietf-oauth-v2-23#section-3.1)
### 1. Authorization request (and display login page)
The authorization endpoint is used to interact with the resource
owner and obtain an authorization grant.  The authorization server
MUST first verify the identity of the resource owner.

The authorization request is sent to the authorization endpoint to obtain an authorization code. Here are the parameters used in the request:

|param	|presence| value|
| ------------- |:-------------:| -----:|
|response_type | Required | Must be set to _code_ |
|client_id | Required |  The client identifier as assigned by the authorization server, when the client was registered. | 
|redirect_uri | Optional | The redirect URI registered by the client.
|scope | Optional | The possible scope of the request. (not used for R1 2018, not configured by ATES)
|state | Optional (recommended) | Any client state that needs to be passed on to the client request URI. If you generate a random string or encode the hash of some client state (e.g., a cookie) in this state variable, you can validate the response to additionally ensure that the request and response originated in the same browser. This provides protection against attacks such as cross-site request forgery [details here](https://developers.google.com/identity/protocols/OpenIDConnect?hl=fr#state-param).
|code_verifier | Optional | The code verifier if Proof Key of Code Exchange [PKCE](https://tools.ietf.org/html/rfc7636) is employed (for public OAuth clients).
|code_challenge |Required by PKCE| A unique code verifier is created for every authorization request, and its transformed value, called "code_challenge", is sent to the authorization server to obtain the authorization code. A code_verifier is a high-entropy cryptographic random string using the unreserved characters [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~", with a minimum length of 43 characters and a maximum length of 128 characters.|

#### typical example
  - GET ```http://212.129.12.246/oauth2-server/authorize?response_type=code&client_id=ates&redirect_uri=myvoo_app://login_callbackstate=myonetimerandomstring```

  - login page is displayed inside the in-app-browser and user may submit his credentials.
  The /authorize, seems to redirect to the login page so that user may give its credentials

  ### 2. Authorization response
  #### success
  In the case of a success (validate credentials+ client authorization) the in-app-browser receives a 302 redirect to the client (native) app.
The response contains the following params in querystring
|param	|presence| value|
| ------------- |:-------------:| -----:|
|code | Required | The authorization code.  |
|state | Required |  The same value as sent by the client in the state parameter, if any. The client app needs to validate it. | 
##### typical response example
  - HTTP 302 +  header ```Location:	http://localhost:3000/codecallback?code=5431F3B4055E7870F87CAB157DAADD21U01&state=myonetimerandomstring ```


### 3. Token request

The request contains the following params in querystring
|param	|presence| value|
| ------------- |:-------------:| -----:|
|client_id | Required | The client application's id.|
|client_secret | / | impossible to securely store it for public client (native apps)|
|grant_type | Required |  The same value as sent by the client in the state parameter, if any. The client app needs to validate it. |
|code | Required | The authorization code received by the authorization server. |
|redirect_uri | Required | |
|code_verifier | Required by PKCE specs. | code verifier created by the client prior to making the authorization request. Authorization server must validate it.|

### 3. Token response
```
{"access_token":"a6a0281d3a511ec850e20c0dc852b5f0",
"expires_in":3600
token_type":"Bearer",
"scope":"scopeTest",
"refresh_token":"azertyuiop"}
 ```
### Refresh token

    ?? question submitted to ATES


## resources
 - [mobile-api-security](https://hackernoon.com/mobile-api-security-techniques-part-3-1e1e092aeacd)

### PKCE
Default oAuth implementation features some potential vulnerabilities. A malicious app could obtain a authorization code and access-token and obtain user data from resource API (myvoo mobile api for instance).
To mitigate authorization code interception scenarios, the Proof Key for Code Exchange [PKCE](https://tools.ietf.org/html/rfc7636) extension was added as a requirement for OAuth2 public clients. The client generates a secret (random key) and a hash of it. It sends the hash of it to the Authorization Server (_ASrv_) in the authorization request. The _ASrv_ stores the association between the hash and the authorization code. The client receives the authorization code then http POST the code and the secret to the /token endpoint of the _ASrv_. The _ASrv_ can verify that the hash of the secret matches the value associated (previously stored) code and hash. This ensures that the client that initiated the authorization request is the same as the one who received the access_token.

