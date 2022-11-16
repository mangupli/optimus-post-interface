import { useState, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import MapGL from "./MapGL";

import { useMapContext } from '../../contexts/MapContext';
import HeatMapSource from './HeatMapSource';
import MarkersSource from "./MarkersSource";
import ClustererBase from './Clusterer';
import RouteSource from "./RouteSource";

import { switchHeatmap } from '../../actions';

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
                    <ClustererBase/>
                    <RouteSource purpose={'pedestrian-routes'} id={'routes-layer'}/>
                </MapGL>
                <div className="map__control">
                    <div className="text_bold text_color_white map__title">Карта</div>

                    <span className="switcher">
                        <input type="checkbox" id="switcher" defaultChecked={!heatmap} onChange={()=>dispatch(switchHeatmap())}></input>
                        <label htmlFor="switcher"></label>
                    </span>
           

                    <div onClick={rollMap} className="map__roll-up">
                        <i className="icon-arrowDown"></i>
                    </div>
                </div>

                <MapLegend heatmap={heatmap} />           
                
            </div>
        </div>
    )}

    const MapLegend = ({heatmap}) => {
        if(heatmap){
            return  <div className="map__legend map__legend_heatmap">
                <div className="text_legend">минимально</div>
                <div className="map__gradient">
                    <div className="map__gradient-item map__gradient-item"></div>
                    <div className="map__gradient-item"></div>
                    <div className="map__gradient-item"></div>
                    <div className="map__gradient-item"></div>
                    <div className="map__gradient-item"></div>
                </div>
                <div className="text_legend">максимально</div>
            </div>
        }
        else{
            return (
                <div className="map__legend text_legend">
                    <div className="map__legend-item">
                        <span className="map__legend-icon map__legend-icon_fact"></span>
                        — поставленные 
                    </div>
                    <div className="map__legend-item">
                        <span className="map__legend-icon map__legend-icon_predict"></span>
                        — рекомендованные постаматы 
                    </div>
                    <div className="map__legend-item">
                        <span className="map__legend-icon map__legend-icon_station">
                            <i className="icon-crown"></i>   
                        </span>
                        — остановки общественного транспорта
                    </div>
                    <div className="map__legend-item">
                        <span className="map__legend-icon map__legend-icon_route"></span>
                        — популярные пешие маршруты 
                    </div>
                </div> 
            )
        } 
    }

const MainMap = memo(MainMapComponent);

export default MainMap;




