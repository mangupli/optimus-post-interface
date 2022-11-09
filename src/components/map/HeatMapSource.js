import { useEffect,  useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useMapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

const HeatMapSource = ({id, purpose}) => {

    const [ mapInstance ] = useMapContext();

    const oldPostamats = useSelector(state => state.oldPostamats);
    const selectedPostamats = useSelector(state => state.selectedPostamats);
    const heatmap = useSelector(state => state.heatmap);

    const [source, setSource] = useState(null);
/* 
    console.log(postamats); */

    useEffect(() => {
    if (mapInstance && (oldPostamats.length > 0 || selectedPostamats.length > 0)) {

        let instance;
        const postamats = [...oldPostamats, ...selectedPostamats];

        const data = {
            type: 'FeatureCollection',
            features: postamats.map(postamat => ({
                    type: 'Feature',
                    //custom propertie, helps with events
                    properties: {
                        customProperty : 2,
                        type: 'postamat',
                        name: 'postamat-placed'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: postamat.geo_data,
                    },
                }))
        }

        load().then(mapglAPI => {

            instance = new mapglAPI.GeoJsonSource(mapInstance, {
                data,
                //should be unique to connet data source and layer
                attributes: {
                    purpose: purpose,
                },
            });

            setSource(instance);

        }) 
        return () => {
            instance && instance.destroy();            
        };
    }
    return undefined;
    }, [mapInstance, oldPostamats, selectedPostamats]);
    
        return( 
        <Layer
            map={mapInstance}
            id={id}
            purpose={purpose}
            source={source}
            show={heatmap}
            />
        )
}

const Layer = (props) => {

    const {map, id, purpose, source, show} = props;

    const layer = {
        id: id, 
    
        filter: ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
    
        // Тип объекта отрисовки
        type: 'heatmap',
    
        // Стиль объекта отрисовки
        style: {
            color: [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0, 0, 0, 0)',
                0.2,
                'rgba(172, 32, 135, 1)',
                0.4,
                'rgba(255, 154, 0, 1)',
                0.6,
                'rgba(255, 252, 0, 1)',
                0.8,
                'rgba(255, 255, 63, 1)',
                1,
                'rgba(255, 255, 255, 1)',
            ],
            radius: 50,
            weight: ['get', 'customProperty'],
            intensity: 0.8,
            opacity: 0.8,
            downscale: 1,
        },
    };

    useEffect(()=>{
     
        if(map/*  && source */){
            map.addLayer(layer);

            return () => {
                map.removeLayer(id);                  
            };
        }
        return undefined;


    }, [show, map, source])

/*     useEffect(()=>{

        if(map){
            map.on('styleload', ()=> map.addLayer(layer))
            console.log('change map add layer');

            return () => {
                    map.removeLayer(id);                  
            };
        }
        return undefined;

    }, [map]) */


    return null;
}

export default HeatMapSource;