import { useEffect,  useState } from 'react';

import { useMapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

import { topRoutesCoords, middleRoutesCoords } from '../../constants';

const RouteSource = ({id, purpose}) => {

    const [ mapInstance ] = useMapContext();

    const [source, setSource] = useState(null);

    useEffect(() => {
    if (mapInstance) {

        let instance;

        const topFeatures = topRoutesCoords.map(coord => (
            { type: 'Feature',
             //custom propertie, helps with events
             properties: {
                 type: 'top-route'
             },
             geometry: {
                 type: 'LineString',
                 coordinates: coord,
             }
         }
        ));

        const middleFeatures = middleRoutesCoords.map(coord => (
            { type: 'Feature',
             //custom propertie, helps with events
             properties: {
                 type: 'middle-route'
             },
             geometry: {
                 type: 'LineString',
                 coordinates: coord,
             }
         }
        ));

        const data = {
            type: 'FeatureCollection',
            features: [...topFeatures, ...middleFeatures]            
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
    // eslint-disable-next-line
    }, [mapInstance]);

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

    const layer = {
        id: id, 
    
        filter: ['match', ['sourceAttr', 'purpose'], 
        [purpose], true, false],
    
        // Тип объекта отрисовки
        type: 'dashedLine',
    
        // Стиль объекта отрисовки
        style: {
            color: ['match', ['get', 'type'], ['top-route'], '#B22222', '#DB7093'],
            width: 5,
            dashLength: 10,
            gapLength: 5,
        },
    };

    useEffect(()=>{

        if(map){
            map.on('styleload', ()=> map.addLayer(layer))

            return () => {
                    map.removeLayer(id);                  
            };
        }
        return undefined;

    }, [map]) 


    return null;
}

export default RouteSource;