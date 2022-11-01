import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';


import { areasLoading, areasFetched, areasFetchingError } from '../../actions'

import MoveMapButton from '../moveMapButton/MoveMapButton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import emblem from '../../assets/images/emblem1.png'

const AreasList = () => {

    const api_base = 'http://188.72.109.162:3000/api/v1';

    const { areas, activeDistrictId, areasLoadingStatus } = useSelector(state => state);

    const dispatch = useDispatch();

    const { request } = useHttp();

    useEffect(()=>{
        dispatch(areasLoading());
        request(`${api_base}/districts/${activeDistrictId}/areas`)
        .then(data => {
            dispatch(areasFetched(data))
        })
        .catch(() => dispatch(areasFetchingError()));
        // eslint-disable-next-line 
    }, [activeDistrictId]);

    const spinner = (areasLoadingStatus === "loading") ? <Spinner/> : null;
    const errorMessage = (areasLoadingStatus === "error") ?  <ErrorMessage/> : null;
    const content = (areasLoadingStatus === "idle")  ? <View areas={areas}/> : null;

    return(
        <>
            {errorMessage}
            {spinner}
            {content}        
        </>

    )
}

const View = ({areas}) => {

    const renderAreas = (areas) => {
        return areas.map(area => {
            const {name, population, square, id} = area;
            return (
                <div className="area" key={id}>
                    <div className="area__header">
                        <div className="area__emblem">
                            <img src={emblem} alt="Emblem" />
                        </div>
                        <div className="area__info">
                            <div className="area__population text">
                                {population} тыс.чел.
                            </div>
                            <div className="title area__title">
                                {name}
                            </div>
                            <div className="area__square text">
                                {square} км²
                            </div>
                        </div> 
                    </div>  
                    <div className="area__results">
                            <div className="area__result">
                                <div className="text">
                                    Постаматов
                                </div>
                                <div className="text_bold">
                                    140
                                </div>
                            </div>
                            <div className="area__result">
                                <div className="text">
                                    Постаматов
                                </div>
                                <div className="text_bold">
                                    140
                                </div>
                            </div>
                            <div className="area__result">
                                <div className="text">
                                    Мест свободно
                                </div>
                                <div className="text_bold">
                                    1000
                                </div>
                            </div>
                        </div> 
{/*                     <div className="area__divider"></div>  */}
                    <div className="area__links">                       
                        <MoveMapButton classNames={"button button_small distict__button"} areaId={id}/>                        
                        <button className="button button_small area__button">
                            Перейти
                        </button>     
                    </div>     
                </div>           

            )
        });
    }

    const items = renderAreas(areas);
    const sum = areas.length;
    return(
        <>
            <div className="areas__caption">
                <a href="#">
                        <span className="icon-buffer"></span>
                        <span className="text_bold text_color_accent"> Выбрать все районы</span>
                    </a>
                <div className="areas__total text">
                    {`Всего: ${sum} районов`}
                </div>
            </div>
            <div className='areas__overflow'>
                <div className="areas__wrapper">             
                    {items}
                </div> 
            </div>
        </>)
}

export default AreasList;