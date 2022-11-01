const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: '0 auto'/* , background: 'rgb(241, 242, 243)' */, display: 'block', shapeRendering: 'auto'}} width="207px" height="207px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <rect x="17" y="30" width="16" height="40" fill="#2a5cdc">
            <animate attributeName="y" repeatCount="indefinite" dur="1.1111111111111112s" calcMode="spline" keyTimes="0;0.5;1" values="22;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.22222222222222224s"></animate>
            <animate attributeName="height" repeatCount="indefinite" dur="1.1111111111111112s" calcMode="spline" keyTimes="0;0.5;1" values="56;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.22222222222222224s"></animate>
            </rect>
            <rect x="42" y="30" width="16" height="40" fill="#a0b0da">
            <animate attributeName="y" repeatCount="indefinite" dur="1.1111111111111112s" calcMode="spline" keyTimes="0;0.5;1" values="24.000000000000004;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.11111111111111112s"></animate>
            <animate attributeName="height" repeatCount="indefinite" dur="1.1111111111111112s" calcMode="spline" keyTimes="0;0.5;1" values="51.99999999999999;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.11111111111111112s"></animate>
            </rect>
            <rect x="67" y="30" width="16" height="40" fill="#b5caf6">
            <animate attributeName="y" repeatCount="indefinite" dur="1.1111111111111112s" calcMode="spline" keyTimes="0;0.5;1" values="24.000000000000004;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
            <animate attributeName="height" repeatCount="indefinite" dur="1.1111111111111112s" calcMode="spline" keyTimes="0;0.5;1" values="51.99999999999999;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
            </rect>
        </svg>
    )
}

export default Spinner;