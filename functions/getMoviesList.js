const fetch = require('node-fetch');

exports.handler = async function (event) {
    const genre = JSON.stringify(event.queryStringParameters.genre)
    var pageState = event.queryStringParameters.pageState
    if (pageState.length>5) {
      console.log("got not null value "+ pageState)
      pageState= JSON.stringify(pageState)
    }
    const movieGenreEndpoint = process.env.ASTRA_DB_ENDPOINT + "movie_genre/rows/query";
    
    const query = `{
      "columnNames": [
        "title"
      ],
      "filters": [
        {
          "columnName": "genre",
          "operator": "eq",
          "value": [
            ${genre}
          ]
        }
      ],
      "pageSize": 5,
      "pageState": ${pageState}
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
        console.log(responseBody)
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody)
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}