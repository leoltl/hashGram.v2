const SERVICES = {
    USER: 'user',
    POST: 'post',
  }

export const servicesMap = {
    USER: {
        name: SERVICES.USER,
        port: 3002,
        host: "http://localhost",
        endpoint: "graphql"
    },
    POST: {
        name: SERVICES.POST,
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