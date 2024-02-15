_Create a similar diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button._

```mermaid
sequenceDiagram
    Title: Create New Note Diagram

    participant Browser
    participant Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: HTML Document
    deactivate Server

    Note over Browser: User inputs note into form

    Browser-->>Browser: Click save button

    Browser->>Server: POST /new_note
    activate Server
    Server->>Server: Add note to notes array
    Server-->>Browser: 302 Redirect to /notes
    deactivate Server

    Browser->>Server: GET /notes
    activate Server
    Server-->>Browser: HTML Document
    deactivate Server

    Browser->>Server: GET /main.css
    activate Server
    Server-->>Browser: main.css
    deactivate Server

    Browser->>Server: GET /main.js
    activate Server
    Server-->>Browser: main.js
    deactivate Server

    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: Updated notes data
    deactivate Server

    Note right of Browser: Render updated notes

```