# Endpoints

## /accounts

| method |    route     |     details      | security |
| :----: | :----------: | :--------------: | :------: |
| DELETE | /{accountId} |                  |   true   |
|  GET   |      /       |  Get with token  |   true   |
|  GET   |    /token    | Get access token |  false   |
| PATCH  | /{accountId} |                  |   true   |
|  POST  |      /       |                  |  false   |

## /files

| method |   route   | details | security |
| :----: | :-------: | :-----: | :------: |
| DELETE | /{fileId} |         |   true   |
|  GET   | /{fileId} |         |   true   |
|  GET   |     /     |         |   true   |
| PATCH  | /{fileId} |         |   true   |
|  POST  |     /     |         |   true   |

## /folders

| method |           route            | details | security |
| :----: | :------------------------: | :-----: | :------: |
| DELETE |        /{folderId}         |         |   true   |
| DELETE | /{folderId}/files/{fileId} |         |   true   |
|  GET   |        /{folderId}         |         |   true   |
|  GET   |     /{folderId}/files      |         |   true   |
| PATCH  |        /{folderId}         |         |   true   |
|  POST  |             /              |         |   true   |
|  POST  |     /{folderId}/files      |         |   true   |

## /favorites

| method |       route       | details | security |
| :----: | :---------------: | :-----: | :------: |
| DELETE |  /files/{itemId}  |         |   true   |
| DELETE | /folders/{itemId} |         |   true   |
|  POST  |         /         |         |   true   |

## /desks

| method |    route     | details | security |
| :----: | :----------: | :-----: | :------: |
| DELETE | /{accountId} |         |   true   |
|  GET   | /{accountId} |         |   true   |
| PATCH  | /{accountId} |         |   true   |
|  POST  |      /       |         |   true   |
