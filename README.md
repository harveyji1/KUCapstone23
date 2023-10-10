# KUCapstone23

KU Capstone Project for Group 15
https://reactnavigation.org/docs/hello-react-navigation
https://docs.expo.dev/

### [How to start dev environment](#devEnv)

### [API Help](#api)

# <a name= "devEnv"></a> How to start development environment

1. Clone into repository
2. cd into cookit directory
3. run `npm i`
4. run `npm i -g expo`
5. run `expo login` and login to your expo account

**Whenever you need to start the project run** `npx expo start`

# <a name= "api"></a> API Information

- To run api locally run `dotnet run`
- To open Swagger enter into search bar `localhost:[portnumber]/swagger/index.html`
- Make sure you have the Connection strings pasted into appsettings.json
  `"ConnectionStrings": { "SqlServerConnection": "Check google drive for what should go here"}`
  > DO NOT PUSH THIS TO THE REPO
- Add port number API is running on in this line of the `Login.tsx` file `const LOCAL_HOST_NUBMER = 'YOUR # HERE';`
