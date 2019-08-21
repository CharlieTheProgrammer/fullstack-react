const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    projectId: "fullstack-react-df86f"
});

module.exports = admin