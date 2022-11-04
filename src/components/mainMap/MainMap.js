import { useState, memo } from "react";
import classNames from 'classnames';

import MapGL from "../map/MapGL";

import { useMapContext } from '../../contexts/MapContext';

import "./mainMap.scss"

const MainMap = () => {

    const [hidden, setHidden] = useState(false);

    const [mapInstance] = useMapContext();

    const rollMap = () => {
        setHidden(prevState => !prevState);
        // moving 2gis copyright mark so it won't be in the way
        mapInstance.setControlsLayoutPadding({
            right: hidden ? 0 : 80
        });
        
    }

    const mapClass = classNames('container', 'map_big',{
        'map_hidden': hidden
    });

    return(
        <div className="main-map">
            <div className={mapClass}>
                <MapGL/>
                <div className="map__control">
                    <div className="text_bold text_color_white map__title">Карта</div>
                    <div onClick={rollMap} className="map__roll-up">
                        <i className="icon-arrowDown"></i>
                    </div>
                </div>
            </div>
        </div>
    )}

const MainMapWrapper = memo(
    () => {
        return <MainMap/>
    },
    () => true,
);

export default MainMapWrapper;