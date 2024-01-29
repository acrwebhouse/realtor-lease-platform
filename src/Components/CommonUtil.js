const openInNewTab = (url) => {
    if(typeof(jsToAndroidInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToAndroidInterface.loadUrl(url);
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
    if(typeof(jsToAndroidInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToAndroidInterface.showInternelErrorPage();
    }else if(typeof(jsToIosInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToIosInterface.showInternelErrorPage();
    }
}

const backPage = () => {    
    if(typeof(jsToAndroidInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToAndroidInterface.backPage();
    }else if(typeof(jsToIosInterface) !== 'undefined'){
        // eslint-disable-next-line no-undef
        jsToIosInterface.backPage();
    }
}

const isMobile = () => {
    if(typeof(jsToAndroidInterface) !== 'undefined' || typeof(jsToIosInterface) !== 'undefined'){
        return true
    }
    return false
}

const horizontalScrollDisabled = {
    overflowX: 'hidden'
  };

const isAndroid = () => {
    if(typeof(jsToAndroidInterface) !== 'undefined'){
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