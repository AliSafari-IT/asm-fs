# Identity to secure ASAFARIM Web API backend for all our frontend Single Page Applications (SPAs)

Date: 2024-09-11
Updated: 2024-12-15 20:04:00

ASP.NET Core Identity provides APIs that handle authentication, authorization, and identity management. The APIs make it possible to secure endpoints of a Web API backend with cookie-based authentication. A token-based option is available for clients that can't use cookies, but in using this you are responsible for ensuring the tokens are kept secure. We recommend using cookies for browser-based applications, because, by default, the browser automatically handles them without exposing them to JavaScript.

