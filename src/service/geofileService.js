import networkApi from './common/networkApi';

const PREFIX = '/geoFileController';

const geofileService = {
    getgeoFile: () => networkApi.get(`${PREFIX}/euckr_epsg`)
};

export default geofileService;
