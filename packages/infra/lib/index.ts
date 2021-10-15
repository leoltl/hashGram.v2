const SERVICES = {
    USER: 'user'
  }

export const servicesMap = {
    USER: {
        name: SERVICES.USER,
        port: 3002,
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