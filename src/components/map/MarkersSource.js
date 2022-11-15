import { useEffect,  useState } from 'react';
import { useSelector } from 'react-redux';

import { useMapContext } from '../../contexts/MapContext';

import { load } from '@2gis/mapgl';

const MarkersSource = ({id, purpose}) => {

    const [ mapInstance ] = useMapContext();

    const postamats = useSelector(state => state.postamats);
    const selectedPostamats = useSelector(state => state.selectedPostamats)
    const heatmap = useSelector(state => state.heatmap);

    const [source, setSource] = useState(null);

    useEffect(() => {
    if (mapInstance && postamats) {

        let instance;

        const allPostamatsFeatures = postamats.map(postamat => {
            return { type: 'Feature',
             //custom propertie, helps with events
             properties: {
                 type: postamat.is_placed ? 'marker-postamat-placed' : 'marker-postamat-predicted',
                 label: postamat.id,
                 name: postamat.id
             },
             geometry: {
                 type: 'Point',
                 coordinates: postamat.geo_data,
             },}
         })

        const selectedPostamatsFeatures = selectedPostamats.map(postamat => {
            return { type: 'Feature',
             //custom propertie, helps with events
             properties: {
                 type: 'marker-postamat-selected',
                 label: postamat.id,
                 name: postamat.id
             },
             geometry: {
                 type: 'Point',
                 coordinates: postamat.geo_data,
             },}
         })


        const data = {
            type: 'FeatureCollection',
            features: [...allPostamatsFeatures, ...selectedPostamatsFeatures]
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
    }, [mapInstance, postamats, selectedPostamats]);

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

    const layer1 = {
        id: id, 
    
        filter: ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
    
        // Тип объекта отрисовки
        type: 'point',
    
        // Стиль объекта отрисовки
        style: {
            iconImage: ['match', ['get', 'type'], ['marker-postamat-predicted'], 'ent', 'ent_i'],        
            iconWidth: 25,
/*          textField: ['get', 'label'],
            textFont: ['Noto_Sans'],
            textColor: '#000000',
            textColor: ['match', ['get', 'color'], ['blue'], '#0098ea','#FF0000'],
            textHaloColor: '#fff',
            textHaloWidth: 1,
            iconPriority: 100,
            textPriority: 100, */
        },
    };

    const layer2 = {
        id: 'selected-postamats-layer', 
    
        filter: [
            'all',
            ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
            ['match', ['get', 'type'], ['marker-postamat-selected'], true, false],
        ],

/*         filter: ['match', ['sourceAttr', 'purpose'], [purpose], true, false], */
    
        // Тип объекта отрисовки
        type: 'point',
    
        // Стиль объекта отрисовки
        style: {
            iconImage: 'ent',        
            iconWidth: 40,
            textField: ['get', 'label'],
            textFont: ['Noto_Sans'],
            textColor: '#0195eb',
/*             textColor: ['match', ['get', 'color'], ['blue'], '#0098ea','#FF0000'], */
            textFontSize: 14,
            textHaloColor: '#fff',
            textHaloWidth: 1,
            iconPriority: 100,
            textPriority: 100,
        },
    };

    useEffect(()=>{
     
        if(map/*  && source */){
            map.addLayer(layer1);
            map.addLayer(layer2);
            return () => {
                map.removeLayer(id);       
                map.removeLayer('selected-postamats-layer');            
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