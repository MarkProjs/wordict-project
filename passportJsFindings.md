# Implementing Passport.js in the app

Each platform we use will require registering our app with it.

Implementing passport js requires defining stragies (middleware) for each platform we want the user to be able to sign in with, in addition to a rotue to sign in with that platform.
This includes setting up the an sql lite local db to help save the seesion info. More investigation needed on that end.

Except for that part, the auth code will need very little to no changes to work. However the passport js implementation might encouter other problems as the passport docs are very outdated (still use var).