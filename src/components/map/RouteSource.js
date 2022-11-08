import { useEffect,  useState } from 'react';
import { useSelector } from 'react-redux';

import { useMapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

import { routesCoords } from '../../constants';

const RouteSource = ({id, purpose}) => {

    const [ mapInstance ] = useMapContext();

    const [source, setSource] = useState(null);

    useEffect(() => {
    if (mapInstance && routesCoords) {

        let instance;

        const data = {
            type: 'FeatureCollection',
            features: routesCoords.map(coord => (
                   { type: 'Feature',
                    //custom propertie, helps with events
                    properties: {
                        type: 'route'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: coord,
                    }
                }
            ))                
        }

        console.log(data);

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
    }, [mapInstance, routesCoords]);

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
    
        filter: ['match', ['sourceAttr', 'purpose'], 
        [purpose], true, false],
/*         filter: [
            'all',
            ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
            ['match', ['get', 'type'], ['route'], true, false],
        ], */
    
        // Тип объекта отрисовки
        type: 'dashedLine',
    
        // Стиль объекта отрисовки
        style: {
            color: '#8B008B',
            width: 5,
            dashLength: 10,
            gapLength: 5,
        },
    });

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