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
                key: '4a121fe0-0c39-485b-a0d4-f3cce1acc7b4',
                zoomControl: 'bottomLeft',
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