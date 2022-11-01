import { useEffect, memo, useContext } from 'react';

import { MapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';
import { Clusterer } from '@2gis/mapgl-clusterer';

import store from '../../store';
import Polygons from '../polygons/Polygons';

import './map.scss';

const coords = [
    [37.6212, 55.753551],
    [37.617681, 55.756461]
];


export const MapGL = () => {

    const [mapInstance, setMapInstance] = useContext(MapContext);
    
    const  mapCenter = store.getState().mapCenter;

    useEffect(() => {
        let map;
        load().then((mapglAPI) => {

            map = new mapglAPI.Map('map-container', {
/*                 center: [37.617372, 55.752371], */
                center: mapCenter,
                zoom: 11,
                key: '4a121fe0-0c39-485b-a0d4-f3cce1acc7b4',
            });

/*             coords.forEach((coord) => {
                const marker = new mapglAPI.Marker(map, {
                    coordinates: coord,
                });
            }); */
            
            const markers = coords.map(coord => {
                return {coordinates: coord}
            });

            map.on('click', (e) => {
                if (!e.target) {
                    return;
                }
                const { id } = e.target;
                console.log('Идентификатор объекта: ' + id);
            });
            

            const clusterer = new Clusterer(map, {
                radius: 120,
            });

            clusterer.load(markers);

            setMapInstance(map); 
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();

    }, []);

    console.log('render Map');

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
            <Polygons/>
        </div>
    );
};

const MapWrapper = memo(
    () => {
        return <div id="map-container"></div>;
    },
    () => true,
);

export default MapGL;