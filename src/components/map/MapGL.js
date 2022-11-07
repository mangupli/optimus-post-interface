import { useEffect, memo, useContext } from 'react';

import { MapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

import PolygonSource from './PolygonSource';
import store from '../../store';

import './map.scss';

export const MapGLComponent = (props) => {

    const {children} = props;
    // eslint-disable-next-line
    const [_, setMapInstance] = useContext(MapContext);

    const mapCenter = store.getState().mapCenter;

    useEffect(() => {
        let map;
        load().then((mapglAPI) => {

            map = new mapglAPI.Map('map-container', {
                center: mapCenter,
                zoom: 11,
                key: 'a21a56b9-9f9b-4092-b8a5-b281a67a958a',
                zoomControl: 'bottomLeft',
                preserveDrawingBuffer: true
            });

            map.on('click', (e) => {
                if (!e.target) {
                    return;
                }
                const { id } = e.target;
                console.log('Идентификатор объекта: ' + id);
            });    
            
            setMapInstance(map); 
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
        
// eslint-disable-next-line
    }, []);

    console.log('render Map');

    return (
        <>
            <div id="map-container">
                <PolygonSource purpose={'areas-outline'} id={'polygons-layer'} />
                {children}
            </div>            
        </>
    );
};


const MapGL = memo(MapGLComponent);

export default MapGL;