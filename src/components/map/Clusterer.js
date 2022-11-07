import { useEffect,  useState, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';

import { Clusterer } from '@2gis/mapgl-clusterer';

import { useMapContext } from '../../contexts/MapContext';

import { keyPoints } from '../../constants';


const ClustererBase = () => {
    const [mapInstance] = useMapContext();

    const activeAreaId = useSelector(state => state.activeAreaId);

    const renderedMarkers = keyPoints;

    const [clustererInstance, setClustererInstance] = useState(null);

    const eventHandler = useCallback((event) => {
      console.log(event.target);
        console.log(`is clicked`);
    }, []);

    //загружаем кластер
    useEffect(() => {
        if (!clustererInstance) {
          return
        }   
        clustererInstance.load(renderedMarkers)
/*         clustererInstance.on('click', eventHandler); */
        return(()=>{
          clustererInstance && clustererInstance.off('click', eventHandler);
        });
      }, [clustererInstance, renderedMarkers])

        // создаем инстанс кластеризации
  useEffect(() => {
     //отображаем только тестовый район
    // если нет инстанса карты, то выходим
    if (!mapInstance  || activeAreaId != 30 ) return;

    const instance = new Clusterer(mapInstance, {
        radius: 110,
    })

    setClustererInstance(instance);

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapInstance, activeAreaId])

    return null;
}

/* const ClustererBase = memo(ClustererBaseComponent);
 */
export default ClustererBase;