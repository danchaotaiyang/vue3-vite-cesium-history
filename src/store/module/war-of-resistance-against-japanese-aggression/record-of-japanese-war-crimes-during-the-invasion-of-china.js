import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as Cesium from 'cesium';
import { cameraView } from '@/config.js';


const mapboxAccessToken = 'pk.eyJ1IjoieXV4aWFvbG9uZzAyMSIsImEiOiJjbWZ2ZjlhdWMwNnI1Mm5wdDYzdTR1eWpiIn0.2eGlwGPf3LCBCUHWZ5EPnw';

export const useRecordOfJapaneseWarCrimesDuringTheInvasionOfChinaStore = defineStore('record-of-japanese-war-crimes-during-the-invasion-of-china', () => {

    const id = 'record-of-japanese-war-crimes-during-the-invasion-of-china';

    let viewer;

    const createCesium = () => {
        viewer = new Cesium.Viewer(id, {
            animation: false,
            baseLayerPicker: false,
            homeButton: false,
            imageryProvider: false,
            infoBox: false,
            navigationHelpButton: false,
            sceneModePicker: false,
            selectionIndicator: false,
            terrain: Cesium.Terrain.fromWorldTerrain({
                requestVertexNormals: true,
                requestWaterMask: true
            })
        });
        viewer[ '_cesiumWidget' ][ '_creditContainer' ][ 'style' ][ 'display' ] = 'none';
        viewer[ '_toolbar' ][ 'style' ][ 'display' ] = 'none';
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(cameraView.longitude, cameraView.latitude, cameraView.height)
        });



        const providerAsync = (option) => new Promise((resolve) => {
            resolve(new Cesium.UrlTemplateImageryProvider(option));
        });

        const option = {
            url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${ mapboxAccessToken }`
        };
        const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(option), null);
        viewer.scene.imageryLayers.add(layer);

    };

    const data = ref([]);

    return { id, createCesium };
}, {
    persist: true
});
