
type ApiRoutes = {
    user: string,
    home: string
    users: string
}

const v1Root = `/api/v1`

export const apiRoutes: ApiRoutes = {
    user: `${v1Root}/users/:id`
    ,
    users: `${v1Root}/users`
    ,
    home: `${v1Root}/home`

}