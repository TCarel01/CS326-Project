const { authenticate } = require('passport');

const LocalStrategy = require('passport-local').Strategy;

function initialize (passport) {
    const authenticateUser = (id, password, done) => {
        const user = getUserBy

    }
    passport.use(new LocalStrategy({usernameField: 'id' }), authenticateUser);
    passport.serializeUser((user, done) => {});
    passport.deserialzeUser((id, done) => {});
}