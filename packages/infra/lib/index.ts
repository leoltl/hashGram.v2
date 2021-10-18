const SERVICES = {
    USER: 'user',
    POST: 'post',
    POST_INTERACTION: 'post-interaction',
  }

export const servicesMap = {
    USER: {
        name: SERVICES.USER,
        port: 3001,
        host: "http://localhost",
        endpoint: "graphql"
    },
    POST: {
        name: SERVICES.POST,
        port: 3002,
        host: "http://localhost",
        endpoint: "graphql"
    },
    POST_INTERACTION: {
        name: SERVICES.POST_INTERACTION,
        port: 3003,
        host: "http://localhost",
        endpoint: "graphql"
    }
}
;

export const getServiceList = (env?: 'dev' | 'prod') => {
    return Object.values(servicesMap).map(({ name, port, host, endpoint }) => ({
        name,
        url: `${host}:${port}/${endpoint}`
    }));
}

export * from "./seed";