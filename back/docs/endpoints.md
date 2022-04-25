# Endpoints

## /accounts

| method |    route     |     details      | security |
| :----: | :----------: | :--------------: | :------: |
| DELETE | /{accountId} |                  |   true   |
|  GET   | /{accountId} |                  |   true   |
|  GET   |    /token    | Get access token |  false   |
| PATCH  | /{accountId} |                  |   true   |
|  POST  |      /       |                  |          |

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

| method |   route   | details | security |
| :----: | :-------: | :-----: | :------: |
| DELETE | /{itemId} |         |   true   |
|  POST  |     /     |         |   true   |
