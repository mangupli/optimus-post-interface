import { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { load } from '@2gis/mapgl';

import { MapContext } from "../../contexts/MapContext";

const Polygons = () => {
    const [mapInstance] = useContext(MapContext);

    const renderedPolygon = useSelector(state => state.renderedPolygon);

    if(!mapInstance || !renderedPolygon) return null;

    const renderPolygons = (coordinatesArray) => {
        const elems = coordinatesArray.map(coord => {
            const coordArray = [];
            coordArray.push(coord);
            return (
            <Polygon coordinates={coordArray} map={mapInstance}/>
            )
        });
        return (
           elems
        );
    }

    const renderedElems = renderPolygons(renderedPolygon);

    return(
        <>
            {renderedElems}
        </>
    );
}

const Polygon = ({map, coordinates}) => {
   
    const [polygon, setPolygon] = useState(null);

    useEffect(()=>{
/*         if(!map || !coordinates) return; */

        let instance;
        
        load().then( mapglAPI => {
            instance = new mapglAPI.Polygon(map, {
                coordinates: coordinates,
/*                 color: '#2A5CDC', */
                strokeWidth: 2,
                strokeColor: '#2A5CDC',
            }); ;
        });

        setPolygon(instance);

        return () => {
            if (instance) {
              instance.destroy()
            }
          }

    }, [map, coordinates]);

    return null;
}

export default Polygons;