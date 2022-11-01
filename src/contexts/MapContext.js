import { createContext, useState, useContext} from "react";

const MapContext = createContext([undefined, () => {}]);


const MapProvider = (props) => {
    const [mapInstance, setMapInstance] = useState();

    return (
        <MapContext.Provider value={[mapInstance, setMapInstance]}>
            {props.children}
        </MapContext.Provider>
    );
};

/** Хук возвращает текущее значение контекста **/
const useMapContext = () => {
    return useContext(MapContext);
}

export { MapContext, MapProvider, useMapContext };