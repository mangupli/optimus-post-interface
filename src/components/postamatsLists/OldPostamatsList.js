import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import PostamatCard from '../postamatCard/PostamatCard';


import "./postamatsList.scss"

const OldPostamatsList = () => {

    const oldPostamats = useSelector(state => state.oldPostamats);
    const [show, setShow] = useState(true);

    const oldPostamatsCards = oldPostamats.map(postamat=>{
        return <PostamatCard postamat={postamat} key={postamat.id}/>
    })

    const changeVisibility = () => {
        setShow(prev => !prev);
    }

    return(

            <div className='postamats-list__old'>
                <div className="container">
                    <div className="postamats-list__header">
                        <div className="postamats-list__title">{`Установленные постаматы : ${oldPostamats.length}`}</div>
                        <div
                        className='text text_color_accent postamats-list__hide'
                        onClick={changeVisibility}>
                            {show ? 'Скрыть': 'Показать'}
                        </div> 
                    </div>
                    <div
                        className='postamats-list'
                        style={{display: show ? 'block' : 'none'}}
                        >   
                        <div className='postamats-list__wrapper'>         
                            {oldPostamatsCards}        
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default OldPostamatsList;