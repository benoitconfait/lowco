# voo mobile app technical details

Here is the login flow sequence diagram:
![alt text](mobile-login-diagram-oAuth-pkce.png "login sequence diagram (no PKCE)")

Here is the diagram source code ([websequencediagrams](https://www.websequencediagrams.com/)):
```
#myVOO mobile APP main account login 
title mobile APP 2018 login flow\noAuth2.0+PKCE\n(main account login)\n v0.4
 
participant  "In-App Browser" as browser 
participant "Native App" as mob 
participant "Mobile Api,\n(Resource Server)\npublic" as web 
participant "ATES\nAuthorization\nServer\npublic" as auth 
participant "ATES\nSelfcare\nEndpoints(SCIF)\nprivate" as ates 
participant "ESB" as esb

note left of mob
App starts. App loader is displayed.
App only knows about api URL;
end note

alt no access_token
mob->+web:1a: getData() 
web-->-mob: 1b: HTTP 401 w/redirect url to /authorize endpoint (response_type, client_id, redirect_uri, state)
else access_token expired 
mob->+web:1c: getData() with access_token

alt BPId from cache
web-->web: getBPIdFromCache(access_token)
else 
web->+ates:UCP_SCIF_XML/UserManagement/GetPersonalInformation
note over auth,ates 
ATES verifies that access_token is valid \nand corresponds to a valid active BPID
end note
ates-->-web:HTTP access_token expired 
end 

web-->-mob: same as 1b: (HTTP 401)
else refresh_token is valid (not used)
mob->auth: POST /Token?grant_type=refresh_token&refresh_token=<a_refresh_token>
note over auth,ates 
refresh_token could only be used once
end note
auth-->mob: new access_token + refresh_token
mob->mob: app securely stores both tokens
note right of mob 
app can now call mobile API data (see step 6a.)
end note

else access and refresh token expired
mob->auth:1d: POST /Token?grant_type=refresh_token&refresh_token=<a_refresh_token>
note over auth,ates 
change ATES impl: client_secret should not be mandatory for public clients (native app)
end note
auth-->mob: error
end 
note right of mob 
PKCE: client app genenates a secret (PKCE secret) and a hash of it (=code_challenge).\nit stores the secret and sends the challenge within the auth request
end note
mob->mob: store PKCE secret (code_verifier)
mob->browser:2: redirect to Auth server


browser->+auth:3a: Get /authorize?\nresponse_type=code&client_id=<clientid>&redirect_uri=myapp.scheme.demo://code_callback\n&state=<random_string_12345>&code_challenge=<hash(PKCE_secret)>&code_challenge_method=s256
note right of auth
ATES should pbb store code_challenge \nlinked the authorization code in response
end note
auth-->-browser:3b: MainAccountLoginPage()
browser->+auth:4a: POST Login email/password
note right of auth 
ates credentials validation\n+account is active
end note
auth-->-browser:4b: 302 redirect myapp.scheme.demo://code_callback&state=<random_string_12345>
browser->+mob:4c: custom URI scheme redirect
note right of mob 
state and code are passed in to the native app\n
end note
mob->mob: validate state querystring param
mob->auth: 5a: POST /token?client_id=<>&grant_type=<>&code=<>&verifier=<PKCE_secret>
note over auth,ates 
ATES PKCE validation (code_challenge,PKCE_secret) see rfc7636
end note
auth-->mob: access_token + refresh_token
mob->mob: save access_token\n + refresh_token on local device
note over mob, web
mobile app can now start loading data
end note
mob->+web:6a: getData() with access_token 

alt BPId from cache
web-->web: getBPIdFromCache(access_token)
else BPId not cached
web->+ates:get UCP_SCIF_XML/UserManagement/GetPersonalInformation(access_token) 
note over auth,ates 
ATES verifies that access_token is valid \nand corresponds to a valid BPID
end note
ates-->-web:BPId
end

alt user authorized
note right of web
user authorization
end note
web->esb:getData()
esb-->web:data
web-->mob:6b: HTTP 200 json data
else not authorized
web-->-mob:6b: HTTP 403 Forbidden
end
mob->-mob:display data on screen
note over mob, web
Happy end. Mobile app home page is displayed.
end note

```
