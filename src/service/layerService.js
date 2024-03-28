import networkApi from './common/networkApi';

const PREFIX = '/layerbase';

const layerService = {
    setFeatureLayer: (info) =>
        networkApi.get(`${PREFIX}/vectorlayer`, {
            params: { items: JSON.stringify(info) }
        })
};

export default layerService;
