import { networkApi, multipApi } from './common/networkApi';

const PREFIX = '/geoFileController';

const geofileService = {
    getgeoFile: () => networkApi.get(`${PREFIX}/euckr_epsg`),
    setDBShpFiles: (info) => multipApi.post(`${PREFIX}/saveShpFiles`, info),
    getDBShpFiles: (info) =>
        networkApi.get(`${PREFIX}/downloadShpFiles`, {
            params: { filename: JSON.stringify(info) },
            responseType: 'blob'
        }),
    getAllDBFiles: () => networkApi.get(`${PREFIX}/getallDBFiles`),
    startdbfset: (info) =>
        networkApi.get(`${PREFIX}/startdbfset`, {
            params: { param: JSON.stringify(info) },
            responseType: 'blob'
        })
};

export default geofileService;
