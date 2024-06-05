import { networkApi } from './common/networkApi';

const PREFIX = '/layerController';

const layerService = {
    setFeatureLayer: () => networkApi.get(`${PREFIX}/vectorlayer`)
};

export default layerService;
