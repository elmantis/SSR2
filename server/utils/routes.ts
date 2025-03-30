
type ApiRoutes = {
    user: {
        show?: string;
    },
    home:{
        show: string;
    },
    users: {
        show:string
    }
}

const v1Root = `/api/v1`

export const apiRoutes: ApiRoutes = {
    user: {
        show: `${v1Root}/users/:id`
    },
    users: {
        show: `${v1Root}/users`
    },
    home: {
        show: `${v1Root}/home`
    }
}