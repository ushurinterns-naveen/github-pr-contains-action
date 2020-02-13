import * as core from '@actions/core';
const {GitHub, context} = require('@actions/github')
const parse = require('parse-diff')

async function run() {
    try {
        // get information on everything
        const token = core.getInput('github-token', {required: true})
        const github = new GitHub(token, {} )
        const PR_number = context.payload.pull_request.number
        
        // Check if the body contains required string
        const bodyContains = core.getInput('bodyContains')

        if ( context.payload.pull_request.body.indexOf( bodyContains) < 0  ) {
            core.setFailed("The body of the PR does not contain " + bodyContains)
        }
        
    } catch (error) {
	core.setFailed(error.message);
    }
}

run();

