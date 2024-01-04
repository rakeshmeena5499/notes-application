
# Notes Application

  

A simple note-keeping application where users can manage their notes and share them with others.

  

## Table of Contents

  

1. [Prerequisites](#prerequisites)

2. [Installation](#installation)

3. [Endpoints](#endpoints)

  

## Prerequisites

  

Ensure you have the following installed:

  

- Node.js

- MongoDB

- JWT

  

## Installation

  

1. Clone the repository:

  

```

git clone https://github.com/rakeshmeena5499/notes-application.git

npm install

```

  
  

## Endpoints

  

### User API

  

#### 1. **POST /api/auth/signup**

- User registration.

- Request body: `{ "username": "your_username", "password": "your_password" }`

  

#### 2. **POST /api/auth/login**

- User login.

- Request body: `{ "username": "your_username", "password": "your_password" }`

  

### Note API

  

#### 3. **GET /api/notes/search**

- Search for notes based on keywords.

- Authenticated endpoint.

- Query parameter: `q` for search query.

  

#### 4. **GET /api/notes/**

- Get all notes of the authenticated user.

- Authenticated endpoint.

  

#### 5. **GET /api/notes/:id**

- Get a specific note by ID.

- Authenticated endpoint.

  

#### 6. **POST /api/notes/**

- Create a new note.

- Authenticated endpoint.

- Request body: `{ "title": "note_title", "content": "note_content" }`

  

#### 7. **PUT /api/notes/:id**

- Update a note by ID.

- Authenticated endpoint.

- Request body: `{ "title": "updated_title", "content": "updated_content" }`

  

#### 8. **DELETE /api/notes/:id**

- Delete a note by ID.

- Authenticated endpoint.

  

#### 9. **POST /api/notes/:id/share**

- Share a note with another user.

- Authenticated endpoint.

- Request body: `{ "userId": "user_to_share_with_id" }`

