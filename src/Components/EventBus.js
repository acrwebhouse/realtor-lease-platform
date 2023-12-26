// eventBus.js
import EventEmitter from 'events';

const eventBus = new EventEmitter();

const eventName = {
    showMainToast : 'showMainToast',
    changeAccessToken : 'changeAccessToken',
    resetAccount : 'resetAccount,'
}


export {eventBus,eventName}