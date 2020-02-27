function addPrefix<T extends {[key: string]: string}>(prefix: string, obj: T): T {
    const newObj: any = {};
    Object.keys(obj).forEach(key => newObj[key] = `${prefix}:${obj[key]}`);
    return newObj;
}

const events = {
    common: {
        titleBar: addPrefix('title-bar', {
            toggle: 'toggle'
        })
    },
    map: {
        mapPage: addPrefix('map-page', {
            recenter: 'recenter',
            recordPath: 'record-path',
            stopRecordingPath: 'stop-recording-path',
            saveRecordedPath: 'save-recorded-path',
            editRecordedPath: 'edit-recorded-path',
            deleteRecordedPath: 'delete-recorded-path'
        }),
        tyrMap: addPrefix('tyr-map', {
            mapReady: 'map-ready',
            failedEditingPath: 'failed-editing-path'
        })
    }
};

export const Events = events;
