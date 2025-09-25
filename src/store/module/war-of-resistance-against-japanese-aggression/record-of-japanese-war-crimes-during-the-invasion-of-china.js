import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as Cesium from 'cesium';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';
import { cameraView } from '@/config.js';
import data from './record-of-japanese-war-crimes-during-the-invasion-of-china.json';

dayjs.extend(weekday);
dayjs.locale('zh-cn');

const mapboxAccessToken = 'pk.eyJ1IjoieXV4aWFvbG9uZzAyMSIsImEiOiJjbWZ2ZjlhdWMwNnI1Mm5wdDYzdTR1eWpiIn0.2eGlwGPf3LCBCUHWZ5EPnw';

export const useRecordOfJapaneseWarCrimesDuringTheInvasionOfChinaStore = defineStore('record-of-japanese-war-crimes-during-the-invasion-of-china', () => {

    const id = 'record-of-japanese-war-crimes-during-the-invasion-of-china';

    let viewer;

    const currentNode = ref(0);

    const createCesium = async () => {
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

        await addImageryLayerMapbox();

        setTimeline();

        setCurrentEvent();

    };

    const setTimeline = () => {
        viewer.timeline.makeLabel = (time) => dayjs(Cesium.JulianDate.toDate(time)).format('YYYY-MM-DD dddd');
    };

    const addImageryLayerMapbox = async () => {

        try {

            let provider = new Cesium.UrlTemplateImageryProvider({
                url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${ mapboxAccessToken }`
            });

            const layer = await Cesium.ImageryLayer.fromProviderAsync(Promise.resolve(provider), null);

            viewer.scene.imageryLayers.add(layer);

        } catch (e) {
            console.warn(e);
        }
    };

    const setCurrentEvent = () => {

        if (data.length === 0) {
            return;
        }

        try {

            let currentTime = Cesium.JulianDate.fromDate(new Date(data[ currentNode.value ].time));
            let startTime = Cesium.JulianDate.addDays(currentTime.clone(), -2, new Cesium.JulianDate());
            let stopTime = Cesium.JulianDate.addDays(currentTime.clone(), 2, new Cesium.JulianDate());

            if (startTime && stopTime) {

                viewer.timeline.zoomTo(startTime, stopTime);
                viewer.clock.startTime = startTime.clone();
                viewer.clock.stopTime = stopTime.clone();
                viewer.clock.currentTime = currentTime.clone();
            }
        } catch (e) {
            console.warn(e);
        }
    };

    return { id, createCesium };
}, {
    persist: true
});
