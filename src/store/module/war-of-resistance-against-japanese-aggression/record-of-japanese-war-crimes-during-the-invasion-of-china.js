import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as Cesium from 'cesium';
import { cameraView } from '@/config.js';


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
        });
        viewer[ '_cesiumWidget' ][ '_creditContainer' ][ 'style' ][ 'display' ] = 'none';
        viewer[ '_toolbar' ][ 'style' ][ 'display' ] = 'none';
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(cameraView.longitude, cameraView.latitude, cameraView.height)
        });
        // viewer.scene.imageryLayers.removeAll(true);
    };

    const data = ref([]);

    return { id, createCesium };
}, {
    persist: true
});
