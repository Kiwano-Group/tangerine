const { google } = require('googleapis');
const admin = google.admin('directory_v1');


async function authorize() {
    const { JWT } = require('google-auth-library');

    const keys = require('./google_secret.json');

    const jwtClient = new JWT(
        keys.client_email, // service account api
        null,
        keys.private_key, // key
        ['https://www.googleapis.com/auth/admin.directory.user'], //scope
        'self@jakebayar.com' // admin email
    );

    await jwtClient.authorize();
    return jwtClient;
}

async function createUser(firstName, lastName, email, phone) {
    const auth = await authorize();
    const userObj = {
        primaryEmail: email,
        name: {
            familyName: lastName,
            givenName: firstName
        },
        phones: phone,
        password: 'welcometocodesmith!!',

    };

    const result = await admin.users.insert({
        auth: auth,
        requestBody: userObj
    });
    console.log(result.data);
    return result.data;
}

async function deleteUser() {
    const auth = await authorize();
    const userObj = {
        "userKey": 'tests@jakebayar.com',
    };

    const result = await admin.users.delete({
        auth: auth,
        requestBody: userObj
    });
    console.log(result);
    return result.data;
}

// async function getUser(userEmail = 'self@jakebayar.com') {
//     const auth = await authorize();

//     const result = await admin.users.get({
//         auth: auth,
//         userKey: userEmail
//     });
//     console.log(result)
//     console.log(result.data)
//     return result.data;
// }
// module.exports = { getUser, createUser };

module.exports = { createUser, deleteUser };
