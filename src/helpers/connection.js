const checkNetwork = () => {
    var result = false;
    var condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
        fetch('https://www.google.com/', { // Check for internet connectivity
            mode: 'no-cors',
            })
        .then(() => {
            result = true;
        }).catch(() => {
            result = null;
        }  )

    }else{
        result = undefined;
    }
    return result;
}

export default checkNetwork;