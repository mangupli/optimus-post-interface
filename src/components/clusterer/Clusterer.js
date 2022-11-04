import { useEffect,  useState } from 'react';
import { useSelector } from 'react-redux';

import { Clusterer } from '@2gis/mapgl-clusterer';

import { useMapContext } from '../../contexts/MapContext';


const ClustererBase = () => {
    const [mapInstance] = useMapContext();

    const renderedMarkers = useSelector(state => state.renderedMarkers)

    const [clustererInstance, setClustererInstance] = useState(null);

    //загружаем кластер
    useEffect(() => {
        if (!clustererInstance) {
          return
        }
    
        clustererInstance.load(renderedMarkers)
      }, [clustererInstance, renderedMarkers])

        // создаем инстанс кластеризации
  useEffect(() => {
    // если нет инстанса карты, то выходим
    if (!mapInstance) return;

    const instance = new Clusterer(mapInstance, {
        radius: 120,
    })

    setClustererInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapInstance])

    return null;
}

export default ClustererBase;