# recipe-app

application for finding recipes

The application is deployed using Vercel.

-   Backend project: https://vercel.com/kristiankjerstad/recipe-app-backend
-   Frontend project: https://vercel.com/kristiankjerstad/recipe-app-frontend

Urls to application

-   Backend: https://recipe-app-backend-tan.vercel.app/
-   Frontend: https://recipe-app-frontend-ochre.vercel.app/

# Authentication

Authentication is enabled with JWT. To create a new jwt token, use http://jwtbuilder.jamiekurtz.com/
with this info:

-   Issuer = "Online JWT Builder"
-   Audience = "recipe-app"
-   subject = "general-user"

-   Role = "user"

-   Key = secret key, ask admin for this
