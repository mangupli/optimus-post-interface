import { useEffect, memo, useContext, useCallback } from 'react';

import { MapContext } from '../../contexts/MapContext';

import { useDispatch } from 'react-redux';
import {selectId, deselectId } from '../../actions'

import { load } from '@2gis/mapgl';

import PolygonSource from './PolygonSource';
import store from '../../store';

import './map.scss';

export const MapGLComponent = (props) => {

    const {children} = props;
    // eslint-disable-next-line
    const [_, setMapInstance] = useContext(MapContext);

    const mapCenter = store.getState().mapCenter;

    const dispatch = useDispatch();


    const onMarkerClick = useCallback((e) => {
        if (e.targetData?.type === 'geojson'){
/*             console.dir(e.targetData); */
            if(e.targetData.feature.properties.type === 'marker-postamat-predicted'){
/*                 console.log(e.targetData.feature.properties.name); */
                dispatch(selectId(e.targetData.feature.properties.name));
            }           
        }
    }, []);


    useEffect(() => {
        let map;
        load().then((mapglAPI) => {

            map = new mapglAPI.Map('map-container', {
                center: mapCenter,
                zoom: 11,
                key: '03ffb8f5-9563-46df-8a4c-28ceca56ebb7',
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

            map.on('click', onMarkerClick);
            
            setMapInstance(map); 
        });

        // Удаляем карту при размонтировании компонента
        return () => {
            map && map.destroy()
        };
        
// eslint-disable-next-line
    }, []);

/*     console.log('render Map'); */

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