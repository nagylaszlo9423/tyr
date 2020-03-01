
function addPrefix<T extends {[key: string]: string}>(prefix: string, obj: T): T {
    const newObj: any = {};
    Object.keys(obj).forEach(key => newObj[key] = `${prefix}:${obj[key]}`);
    return newObj;
}

export const events = {
    common: {
        titleBar: addPrefix('title-bar', {
            toggle: 'toggle'
        })
    },
    map: {
        mapPage: addPrefix('map-page', {
            recenter: 'recenter',
            checkMap: 'check-map'
        }),
        tyrMap: addPrefix('tyr-map', {
            mapIsCreated: 'map-is-created',
        })
    },
    loader: addPrefix('loader', {
        start: 'start',
        stop: 'stop'
    })
};
