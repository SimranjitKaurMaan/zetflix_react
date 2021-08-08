const fetch = require('node-fetch')

exports.handler = async function () {

    const genresEndpoint = process.env.ASTRA_DB_ENDPOINT + "genres/rows"
    console.log(genresEndpoint)
    const response = await fetch(genresEndpoint, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN
        }
    })

    try {
        const responseBody = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody.rows)
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}