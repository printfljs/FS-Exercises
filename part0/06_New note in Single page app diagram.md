_Create a diagram depicting the situation where the user creates a new note using the single-page version of the app._
```mermaid
sequenceDiagram
    participant Browser
    participant Server
    
    Browser->>Browser: User inputs new note
    Browser->>Browser: Click save button

    Browser->Server: POST /new_note_spa
    activate Server
    Server->Browser: HTTP status code 201 (Created)
    deactivate Server

    Note over Browser: JS re-renders notes

    Note right of Browser: No page reload

```