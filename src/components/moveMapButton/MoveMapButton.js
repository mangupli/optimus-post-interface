import { useCallback, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { MapContext } from "../../contexts/MapContext";


import { updateRenderedPolygon, updateMapCenter } from '../../actions/'

import { useRequestService } from '../../services/RequestService';

import '../../style/button.scss'

const MoveMapButton = ({classNames, areaId}) => {

    const { pickAndShowArea } = useRequestService();

    return (
        <button
            className={classNames}
            onClick={()=>pickAndShowArea(areaId)}>
              На карте
        </button>
    );
};

export default MoveMapButton;