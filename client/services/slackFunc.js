const dotenv = require('dotenv').config();
const axios = require('axios');

function slackCreation() {
    const slackToken = process.env.slackURI; // Use your environment variable
    const email = 'hermanchen888@gmail.com'; 
    const channelIds = ['C05UFETV4FK']; 
    const inviteType = 'admin_invite'; 

    const requestData = {
        email,
        channel_ids: channelIds,
        invite_type: inviteType,
    };

    const apiUrl = 'https://slack.com/api/admin.users.invite'; // Slack API endpoint

    const config = {
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${slackToken}`,
        },
    };

    axios
        .post(apiUrl, requestData, config)
        .then((response) => {
        // Handle the response here
        if (response.data.ok) {
            console.log('Invitation sent successfully.');
        } else {
            console.error('Error:', response.data.error);
        }
            })
        .catch((error) => {
        // Handle request errors
        console.error('Request error:', error);
        });
}

module.exports = { slackCreation };