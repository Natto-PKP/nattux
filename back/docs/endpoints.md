# Endpoints

## /users

| method |    route     |     details      | security |
| :----: | :----------: | :--------------: | :------: |
| DELETE | /{accountId} |                  |   true   |
|  GET   | /{accountId} |  Get with token  |   true   |
| PATCH  | /{accountId} |                  |   true   |
|  POST  |    /token    | Get access token |  false   |
|  POST  |      /       |                  |  false   |

### /desks

| method |    route     | details | security |
| :----: | :----------: | :-----: | :------: |
| DELETE | /{accountId} |         |   true   |
|  GET   | /{accountId} |         |   true   |
| PATCH  | /{accountId} |         |   true   |
|  POST  |      /       |         |   true   |

### /files

| method |   route   | details | security |
| :----: | :-------: | :-----: | :------: |
| DELETE | /{fileId} |         |   true   |
|  GET   | /{fileId} |         |   true   |
|  GET   |     /     |         |   true   |
| PATCH  | /{fileId} |         |   true   |
|  POST  |     /     |         |   true   |

### /folders

| method |       route       | details | security |
| :----: | :---------------: | :-----: | :------: |
| DELETE |    /{folderId}    |         |   true   |
|  GET   |         /         |         |   true   |
|  GET   |    /{folderId}    |         |   true   |
|  GET   | /{folderId}/files |         |   true   |
| PATCH  |    /{folderId}    |         |   true   |
|  POST  |         /         |         |   true   |
|  POST  | /{folderId}/files |         |   true   |

### /favorites

| method |        route        | details | security |
| :----: | :-----------------: | :-----: | :------: |
|  GET   |       /files        |         |   true   |
|  GET   |      /folders       |         |   true   |
|  GET   |   /files/{fileId}   |         |   true   |
|  GET   | /folders/{folderId} |         |   true   |
