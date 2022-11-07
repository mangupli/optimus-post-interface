const data = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                type: 'route',
            },
            geometry: {
                type: 'LineString',
                coordinates: [
                    [55.41612267494202, 25.3373063569028],
                    [55.418890714645386, 25.33572577372391],
                    [55.41969537734985, 25.336870001646474],
                    [55.42081117630005, 25.33621061738493],
                    [55.421626567840576, 25.337393627765234],
                    [55.42233467102051, 25.336966969617198],
                    [55.42382597923279, 25.339100245313542],
                ],
            },
        },
        
        {
            type: 'Feature',
            properties: {
                type: 'bottomLine',
            },
            geometry: {
                type: 'LineString',
                coordinates: [
                    [55.42360067367554, 25.33460092894936],
                    [55.42147636413574, 25.335803348840205],
                    [55.42107939720153, 25.335231231188487],
                    [55.42302131652832, 25.334077290746556],
                ],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'marker',
                label: 'Star #2',
                color: 'blue',
            },
            geometry: {
                type: 'Point',
                coordinates: [55.42332172393799, 25.33587122702617],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'marker',
                label: 'Star #1',
                color: 'blue',
            },
            geometry: {
                type: 'Point',
                coordinates: [55.420124530792236, 25.335590017150714],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'marker',
                color: 'gray',
            },
            geometry: {
                type: 'Point',
                coordinates: [55.4215407371521, 25.336588794091984],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'marker',
                color: 'gray',
            },
            geometry: {
                type: 'Point',
                coordinates: [55.42234539985657, 25.33490153504211],
            },
        },
    ],
};

const source = new mapgl.GeoJsonSource(map, {
    data,
    attributes: {
        purpose: purpose,
    },
});

map.on('styleload', () => {
        
    map.addLayer(
        {
            type: 'dashedLine',
            id: 'my-dashedline',
            filter: [
                'all',
                ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
                ['match', ['get', 'type'], ['route'], true, false],
            ],
            style: {
                color: '#0baf08',
                width: 10,
                dashLength: 10,
                gapLength: 5,
            },
        },
        '973940',
    );
    map.addLayer(
        {
            type: 'line',
            id: 'my-line',
            filter: [
                'all',
                ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
                ['match', ['get', 'type'], ['bottomLine'], true, false],
            ],
            style: {
                color: '#ffcd17',
                width: 7,
            },
        },
        '973940',
    );
    map.addLayer({
        type: 'point',
        id: 'my-marker',
        filter: [
            'all',
            ['match', ['sourceAttr', 'purpose'], [purpose], true, false],
            ['match', ['get', 'type'], ['marker'], true, false],
        ],
        style: {
            iconImage: ['match', ['get', 'color'], ['blue'], 'ent_i', 'ent'],
            iconWidth: 25,
            textField: ['get', 'label'],
            textFont: ['Noto_Sans'],
            textColor: '#0098ea',
            textHaloColor: '#fff',
            textHaloWidth: 1,
            iconPriority: 100,
            textPriority: 100,
        },
    });