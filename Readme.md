# Library Management System (Backend API)

A digital version of your library.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_ACCESS__URL = "your mongodb driver link"`

## Features

- Display library books
- Add, delete, find book to library
- Borrow books

## Run Locally

Clone the project

```bash
  git clone https://github.com/RoadToLegendaryGrandmaster/Assignment-Library-Management.git
```

Go to the project directory

```bash
  cd Assignment-Library-Management
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to this link

```bash
  http://localhost:5000
```

## API referance

`api/books`

- Get all the library books (default 10 data)
- `GET` request

```text
  http://localhost:5000/api/books
```

Sample response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "686e342a72f4bbc0841c6529",
      "title": "Trouble and assume",
      "author": "Julie Ramirez",
      "genre": "BIOGRAPHY",
      "isbn": "9780553380163",
      "description": "Go she own according western and money.",
      "copies": 10,
      "available": true,
      "createdAt": "2023-07-14T08:42:19.456Z",
      "updatedAt": "2025-07-11T12:45:57.835Z"
    },
    {
      "_id": "686e342a72f4bbc0841c652b",
      "title": "Process middle specific every",
      "author": "Leslie Turner",
      "genre": "BIOGRAPHY",
      "isbn": "9780553380165",
      "description": "Full take condition north someone analysis information south cell per.",
      "copies": 2,
      "available": false,
      "createdAt": "2023-01-05T14:27:45.678Z",
      "updatedAt": "2023-03-19T07:53:21.345Z"
    }
  ]
}
```

### Get all the library books by applying query to apply filter:

- `GET` request

```text
http://localhost:5000/api/books?filter=FANTASY&sortBy=createdAt&sort=asc&limit=5
```

- Filter with catagories:

  - FANTASY
  - NON_FICTION
  - SCIENCE
  - HISTORY
  - BIOGRAPHY
  - FANTASY

- Sort By:
  - asc
  - desc
- You can put limit to show data

  - limit=6

### Search a book by its id:

- `GET` request

```text
http://localhost:5000/api/books/686e342a72f4bbc0841c652b
```

Response: `200`

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "686e342a72f4bbc0841c652b",
    "title": "Process middle specific every",
    "author": "Leslie Turner",
    "genre": "BIOGRAPHY",
    "isbn": "9780553380165",
    "description": "Full take condition north someone analysis information south cell per.",
    "copies": 2,
    "available": false,
    "createdAt": "2023-01-05T14:27:45.678Z",
    "updatedAt": "2023-03-19T07:53:21.345Z"
  }
}
```

### Add a book to library:

- `POST` request

```text
http://localhost:5000/api/books
```

Send request with book object data, (or use POSTMAN)

```json
{
  "title": "The Grand Design",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380142372",
  "description": "New answers to the ultimate questions of life.",
  "copies": 3,
  "available": true
}
```

Response: `200`

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "title": "The Grand Design",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780552380142372",
    "description": "New answers to the ultimate questions of life.",
    "copies": 3,
    "available": true,
    "_id": "6873c5f73275df1c300f23c9",
    "createdAt": "2025-07-13T14:43:03.501Z",
    "updatedAt": "2025-07-13T14:43:03.501Z"
  }
}
```

### Update a book by its id:

- `PATCH` request

```text
http://localhost:5000/api/books/686e342a72f4bbc0841c652b
```

Send updated object data to its body (or use POSTMAN):

```json
{
  "title": "Process middle specific every",
  "author": "Leslie Turner",
  "genre": "BIOGRAPHY",
  "isbn": "9780553380165",
  "description": "Full take condition north someone analysis information south cell per.",
  "copies": 2,
  "available": false
}
```

Response: `200`

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "686e342a72f4bbc0841c652b",
    "title": "Process middle specific every",
    "author": "Leslie Turner",
    "genre": "BIOGRAPHY",
    "isbn": "9780553380165",
    "description": "Full take condition north someone analysis information south cell per.",
    "copies": 2,
    "available": false,
    "createdAt": "2023-01-05T14:27:45.678Z",
    "updatedAt": "2023-03-19T07:53:21.345Z"
  }
}
```

### delete a book form library

- `delete` request

delete a book by its id, by giving id in the query parameter

```text
http://localhost:5000/api/books/686e342a72f4bbc0841c652b
```

Response: `200`

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

## Borrow book api

`api/borrow`

### Borrow a book by id

- `POST` request

```text
http://localhost:5000/api/borrow
```

Send request with book object data, (or use POSTMAN)

```json
{
  "book": "686e342a72f4bbc0841c6553",
  "quantity": 10,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### View all the borrowed book details

- `GET` request

```text
http://localhost:5000/api/borrow
```

Response: `200`

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "totalQuantity": 14,
      "book": {
        "title": "Trouble and assume",
        "isbn": "9780553380163"
      }
    },
    {
      "totalQuantity": 1,
      "book": {
        "title": "The Grand Design",
        "isbn": "9780553380142372"
      }
    }
  ]
}
```

### If some error occured then `400` response will send

```json
{
  "success": false,
  "message": "Requested ammount of books are not present",
  "error": "Book has 0 copies, you requested 1"
}
```
