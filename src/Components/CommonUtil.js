const openInNewTab = (url) => {
    if(typeof(appJsInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        appJsInterface.loadUrl(url);
    }else{
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    } 
}

export {openInNewTab}