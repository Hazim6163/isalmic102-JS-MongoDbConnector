//TODO change
const urls = {
    //apiBase: 'https://islamic-server-101.herokuapp.com',
    apiBase: 'http://localhost:3000',
    user: {
        register: { path: '/user/api/register', method: 'POST' },
        login: { path: '/user/api/login', method: 'POST' },
        confirm: { path: '/user/api/confirm', method: 'POST' },
        status: { path: '/user/api/status', method: 'GET' },
        logout: { path: '/user/api/logout', method: 'GET' },
    },
    category: {
        add: { path: '/category/api/add', method: 'POST' },
        edit: { path: '/category/api/edit', method: 'POST' },
        all: { path: '/category/api/all', method: 'get' },
        delete: { path: '/category/api/delete', method: 'get' },
        id: { path: '/category/api/id', method: 'get' },
        reich: { path: '/category/api/reich', method: 'get' }
    },
    idea: {
        add: { path: '/idea/api/add', method: 'POST' },
        edit: { path: '/idea/api/edit', method: 'POST' },
        all: { path: '/idea/api/all', method: 'get' },
        delete: { path: '/idea/api/delete', method: 'get' },
        id: { path: '/idea/api/id', method: 'get' },
    }

}