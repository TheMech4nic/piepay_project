# Flipkart Offers Backend Service

This is a simple backend service that can detect offers listed on the payment page of Flipkart and store them in a database. This backend service also offers functionality to calculate the best (highest) discount amount for given payment details.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the server:**
    ```bash
    npm start
    ```

The server will start on port 3000.

## Assumptions

*   The Flipkart offer API response structure is consistent with the provided `data.json` file.
*   The discount calculation logic is based on simple text matching in the offer description. This may not cover all cases and might not be 100% accurate.
*   The application connects to a local MongoDB instance at `mongodb://localhost/flipkart-offers`.

## Design Choices

*   **Framework:** Express.js was chosen for its simplicity and flexibility in creating REST APIs.
*   **Database:** MongoDB was chosen for its schemaless nature, which makes it easy to store and retrieve JSON-like data. Mongoose was used as an ODM to provide a more structured way to interact with the database.
*   **Project Structure:** The project is structured into `models`, `routes`, and `controllers` to separate concerns and improve maintainability.

## Scaling the `GET /highest-discount` endpoint

To handle 1,000 requests per second, I would implement the following strategies:

1.  **Caching:** I would use an in-memory cache like Redis to store the results of the `GET /highest-discount` endpoint. This would significantly reduce the load on the database, as many requests will have the same parameters.
2.  **Database Indexing:** I would create indexes on the `provider` and `paymentInstruments` fields in the `Offer` collection. This would speed up the database queries.
3.  **Load Balancing:** I would deploy the application on multiple servers and use a load balancer to distribute the traffic between them.
4.  **Connection Pooling:** I would use a connection pool to manage the connections to the MongoDB database, which would reduce the overhead of creating new connections for each request.

## Improvements with more time

If I had more time, I would:

*   **Improve the discount calculation logic:** I would use a more sophisticated approach to parse the offer descriptions and calculate the discounts, possibly using regular expressions or a natural language processing library.
*   **Add more comprehensive testing:** I would write unit tests and integration tests to ensure the correctness of the application.
*   **Implement authentication and authorization:** I would add a layer of security to the API to prevent unauthorized access.
*   **Add logging and monitoring:** I would add logging to the application to track errors and other important events. I would also set up monitoring to track the performance of the application.
*   **Containerize the application:** I would use Docker to containerize the application, which would make it easier to deploy and manage.
