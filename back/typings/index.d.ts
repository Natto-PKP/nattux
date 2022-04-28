export interface Account {
  id: number
  pseudo: string
  discriminator: string
  password: string | null
  avatar: string | null
}

export interface Desk {
  id: number
  background: string | null
  theme: string
  color: string | null
  accountId: number
}

export interface Folder {
  id: number
  name: string
  icon: string
  favorite: boolean
  accountId: number
  folderId: number | null
}

export interface File {
  id: number
  name: string
  type: string
  content: string | null
  favorite: boolean
  accountId: number
  folderId: number | null
}
