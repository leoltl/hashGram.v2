const SERVICES = {
    GATEWAY: 'gateway',
    USER: 'user',
    POST: 'post',
    POST_INTERACTION: 'post-interaction',
    CLIENT: 'client'
  }

export const servicesMap = {
    GATEWAY: {
        name: SERVICES.GATEWAY,
        port: 3000,
        host: "http://localhost",
        endpoint: "graphql"
    },
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
    },
    CLIENT: {
        name: SERVICES.CLIENT,
        port: 8080,
        host: "http://localhost",
        endpoint: "",
    }
}
;

export const getServiceList = (env?: 'dev' | 'prod') => {
    return Object.values(servicesMap)
        .filter(service => ![SERVICES.GATEWAY, SERVICES.CLIENT].includes(service.name))
        .map(({ name, port, host, endpoint }) => ({
            name,
            url: `${host}:${port}/${endpoint}`
        }));
}

export * from "./seed";