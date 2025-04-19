export const ServerEvent = Object.freeze({
    CREATED: 'ServerEvent.CREATED',
    ERROR: 'ServerEvent.ERROR',
    ON_DATA: 'ServerEvent.ON_DATA',
    CLOSED: 'ServerEvent.CLOSED',
    WRITE_DATA: 'ServerEvent.WRITE_DATA'
});

export const ClientEvent = Object.freeze({
    CREATED: 'ClientEvent.CREATED',
    ERROR: 'ClientEvent.ERROR',
    ON_DATA: 'ClientEvent.ON_DATA',
    CLOSED: 'ClientEvent.CLOSED',
    WRITE_DATA: 'ClientEvent.WRITE_DATA'
});

export type NetAddress = {
    ip: string,
    port: number
}