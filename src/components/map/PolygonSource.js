import { useEffect,  useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useMapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

const PolygonSource = ({id, purpose}) => {
    const [ mapInstance ] = useMapContext();

    const renderedPolygon = useSelector(state => state.renderedPolygon);

    const [source, setSource] = useState(null);

    useEffect(() => {
    if (mapInstance && renderedPolygon) {

        let instance;

        const data = {
            type: 'FeatureCollection',
            features: renderedPolygon.map(polygon => ({
                    type: 'Feature',
                    //custom propertie, helps with events
                    properties: {
                        type: 'polygon',
                        name: 'outline-area'
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: [polygon],                        
                    }
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
    }, [mapInstance, renderedPolygon]);

/*     return null; */

        return( 
        <Layer
            map={mapInstance}
            id={id}
            purpose={purpose}
            source={source}
            />
        )

}

const Layer = (props) => {

    const {map, id, purpose, source} = props;

    const [layer, setLayer] = useState({
        id: id, 
    
        filter: ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
    
        // Тип объекта отрисовки
        type: 'polygon',
    
        // Стиль объекта отрисовки
        style: {
            strokeWidth: 2,
            strokeColor: '#2A5CDC',
            color: 'rgba(0,0,0,0)'
        },
    });

/*     useEffect(()=>{
     
        if(map && source){
            map.addLayer(layer);

            return () => {
                map.removeLayer(id);                  
            };
        }
        return undefined;


    }, [source]) */

    useEffect(()=>{

        if(map){
            map.on('styleload', ()=> map.addLayer(layer/* , 'markers-layer' */))

            return () => {
                    map.removeLayer(id);                  
            };
        }
        return undefined;

    }, [map])


    return null;
}

export default PolygonSource;