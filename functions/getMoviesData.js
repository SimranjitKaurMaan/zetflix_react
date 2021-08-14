const fetch = require('node-fetch')

exports.handler = async function (event) {
    const movie = JSON.stringify(event.queryStringParameters.movie)
    const movieGenreEndpoint = process.env.ASTRA_DB_ENDPOINT + "movies/rows/query";
    const query = `{
        "columnNames": [
            "title",
            "year",
            "duration",
            "thumbnail",
            "ageLimit",
            "match_score",
            "synopsis"
         
        ],
        "filters": [
          {
            "columnName": "title",
            "operator": "eq",
            "value": [
              ${movie}
            ]
          }
        ]
      }`
    const response = await fetch(movieGenreEndpoint, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN
        },
        body: query
    });

    try {
        const responseBody = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody.rows[0])
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}