const openInNewTab = (url) => {
    if(typeof(appJsInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        appJsInterface.loadUrl(url);
    }else if(typeof(jsToIosInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToIosInterface.loadUrl(url);
    }
    else{
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    } 
}

const showInternelErrorPageForMobile = () => {
    if(typeof(appJsInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        appJsInterface.showInternelErrorPage();
    }else if(typeof(jsToIosInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToIosInterface.showInternelErrorPage();
    }
}

const backPage = () => {    
    if(typeof(appJsInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        appJsInterface.backPage();
    }else if(typeof(jsToIosInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToIosInterface.backPage();
    }
}

const isMobile = () => {
    if(typeof(appJsInterface) !== 'undefined' || typeof(jsToIosInterface) !== 'undefined'){
        return true
    }
    return false
}

const horizontalScrollDisabled = {
    overflowX: 'hidden'
  };

const isAndroid = () => {
    if(typeof(appJsInterface) !== 'undefined'){
        return true
    }
    return false
}

const isIos = () => {
    if(typeof(jsToIosInterface) !== 'undefined'){
        return true
    }
    return false
}

const valueIsValid = (data) =>{
    if(data !== ''&& data !== undefined ){
        return true
    }else{
        return false
    }
}

export {openInNewTab,showInternelErrorPageForMobile , backPage , isMobile , horizontalScrollDisabled,isAndroid,isIos,valueIsValid}