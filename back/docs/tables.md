# DATABASE

## account

|    column     |       type       | default |         constraint         | examples |
| :-----------: | :--------------: | :-----: | :------------------------: | :------: |
|      id       |     integer      |         | PRIMARY - GENERATED ALWAYS |          |
|    pseudo     | text (name_text) |         |          NOT NULL          |          |
| discriminator |       text       |         |          NOT NULL          |   7047   |
|     email     |       text       |         |     NOT NULL - UNIQUE      |          |
|   password    |       text       |         |          NOT NULL          |          |
|    avatar     |       text       |         |                            |          |

> UNIQUE ("pseudo", "discriminator")

## desk

|   column   |  type   |  default  |            constraint            | examples |
| :--------: | :-----: | :-------: | :------------------------------: | :------: |
|     id     | integer |           |    PRIMARY - GENERATED ALWAYS    |          |
| background |  text   |           |                                  |          |
|   theme    |  text   | 'default' |             NOT NULL             |          |
|   color    |  text   |           |                                  | #7D4A74  |
| account_id | integer |           | NOT NULL - UNIQUE - REF(account) |          |

## folder

|   column   |       type       |  default  |         constraint         | examples |
| :--------: | :--------------: | :-------: | :------------------------: | :------: |
|     id     |     integer      |           | PRIMARY - GENERATED ALWAYS |          |
|    name    | text (name_text) |           |          NOT NULL          |          |
|    icon    |       text       | 'default' |          NOT NULL          |          |
|  favorite  |     boolean      |   false   |          NOT NULL          |          |
| account_id |     integer      |           |  NOT NULL - REF(account)   |          |
| folder_id  |     integer      |           |        REF(folder)         |          |

## file

|   column   |       type       | default |         constraint         |  examples  |
| :--------: | :--------------: | :-----: | :------------------------: | :--------: |
|     id     |     integer      |         | PRIMARY - GENERATED ALWAYS |            |
|    name    | text (name_text) |         |          NOT NULL          |            |
|    type    |       text       | 'text'  |          NOT NULL          | 'markdown' |
|  content   |       text       |         |                            |            |
|  favorite  |     boolean      |  false  |          NOT NULL          |            |
| account_id |     integer      |         |  NOT NULL - REF(account)   |            |
| folder_id  |     integer      |         |        REF(folder)         |            |
