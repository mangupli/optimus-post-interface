import { useState, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import MapGL from "./MapGL";

import { useMapContext } from '../../contexts/MapContext';
import HeatMapSource from './HeatMapSource';
import MarkersSource from "./MarkersSource";

import { switchHeatmap } from '../../actions'

import "./mainMap.scss"

const MainMapComponent = (props) => {


    const [hidden, setHidden] = useState(false);

    const [mapInstance] = useMapContext();

    const dispatch = useDispatch();

    const heatmap = useSelector(state => state.heatmap)

    const rollMap = () => {
        setHidden(prevState => !prevState);
        // moving 2gis copyright mark so it won't be in the way
        mapInstance.setControlsLayoutPadding({
            right: hidden ? 0 : 80
        });     
    }

    const mapClass = classNames('map_big',{
        'map_hidden': hidden
    });

    const source = heatmap ? <HeatMapSource purpose={'heatmap'} id={'heatmap-layer'}/>  : <MarkersSource purpose={'postamats-markers'} id={'markers-layer'}/>;

    return(
        <div className="main-map">
            <div className={mapClass}>
                <MapGL>
                    {source}
                </MapGL>
                <div className="map__control">
                    <div className="text_bold text_color_white map__title">Карта</div>
                    <label className="toggle">
                        <input type="checkbox" onClick={()=>dispatch(switchHeatmap())}/>
                        <span className="slider"></span>
                        <span className="labels" data-on="Тепловая" data-off="Обычная"></span>
                    </label>
                    <div onClick={rollMap} className="map__roll-up">
                        <i className="icon-arrowDown"></i>
                    </div>
                </div>
            </div>
        </div>
    )}

const MainMap = memo(MainMapComponent);

export default MainMap;