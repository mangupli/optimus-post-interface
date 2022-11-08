import { useEffect,  useState } from 'react';
import { useSelector } from 'react-redux';

import { useMapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

const MarkersSource = ({id, purpose}) => {

    const [ mapInstance ] = useMapContext();

    const postamats = useSelector(state => state.postamats);
    const heatmap = useSelector(state => state.heatmap)

    const [source, setSource] = useState(null);

    useEffect(() => {
    if (mapInstance && postamats) {

        let instance;

        const data = {
            type: 'FeatureCollection',
            features: postamats.map(postamat => {
                   const color = postamat.is_placed ? 'blue' : 'grey';
                   return { type: 'Feature',
                    //custom propertie, helps with events
                    properties: {
                        type: postamat.is_placed ? 'marker-postamat-placed' : 'marker-postamat-predict',
                        label: postamat.id,
                        color: color,
                        name: postamat.id
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: postamat.geo_data,
                    },}
                })
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
    }, [mapInstance, postamats]);

/*     return null; */

        return( 
        <Layer
            map={mapInstance}
            id={id}
            purpose={purpose}
            source={source}
            show={!heatmap}
            />
        )

}

const Layer = (props) => {

    const {map, id, purpose, source, show} = props;

    const [layer, setLayer] = useState({
        id: id, 
    
        filter: ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
    
        // Тип объекта отрисовки
        type: 'point',
    
        // Стиль объекта отрисовки
        style: {
            iconImage: ['match', ['get', 'color'], ['blue'], 'ent_i', 'ent'],
            iconWidth: 25,
            textField: ['get', 'label'],
            textFont: ['Noto_Sans'],
            textColor: '#0098ea',
            textHaloColor: '#fff',
            textHaloWidth: 1,
            iconPriority: 100,
            textPriority: 100,
        },
    });

    useEffect(()=>{
     
        if(map/*  && source */){
            map.addLayer(layer);
            return () => {
                map.removeLayer(id);                  
            };
        }
        return undefined;

    // eslint-disable-next-line
    }, [show, map, source])
/* 
    useEffect(()=>{

        if(map){
            map.on('styleload', ()=> map.addLayer(layer))

            return () => {
                    map.removeLayer(id);                  
            };
        }
        return undefined;

    }, [map]) */


    return null;
}

export default MarkersSource;