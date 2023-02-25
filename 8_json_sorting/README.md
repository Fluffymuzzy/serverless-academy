# JSON Sorting

This is a JavaScript application that fetches data from a list of endpoints and logs the number of true, false, and undefined values it finds.

## Usage

To use the application, follow these steps:

1. Install Node.js on your computer if you haven't already done so.
2. Clone or download this repository to your local machine.
3. Optionally, you can use the URLs of your endpoints in the ENDPOINTS array in the endpoints.js file.
4. Open a terminal, go to the directory with the application and run the command:
   > > npm start

## App Details

- The getData function accepts an endpoint URL as a parameter and makes a request to that URL using the fetch function.
- If the response is not ok, the function throws an error.
- If the response does not contain an isDone key, the function throws an error.
- If the response contains an isDone key, the function logs a success message and returns the value of isDone.
- If the function encounters an error, it will retry the request up to three times before giving up and returning undefined.
- The main function uses Promise.all to call the getData function for each endpoint URL in the ENDPOINTS array.
- It then logs the number of true, false, and undefined values found in the responses.
