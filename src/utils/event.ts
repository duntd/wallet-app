export const EVENT = {
  forceLogout: 'forceLogout',
  incNotification: 'incNotification',
  clearNotification: 'clearNotification',
  showLoading: 'showLoading',
  hideLoading: 'hideLoading',
};

interface ListenerInterface {
  count: number;
  refs: any;
  apiList: string[];
}

export class EventUtil {
  static listeners: ListenerInterface = {
    count: 0,
    refs: {},
    apiList: [],
  };

  static addEventListener(eventName: any, callback: any) {
    if (typeof eventName === 'string' && typeof callback === 'function') {
      EventUtil.listeners.count++;
      let eventId: any = 'l' + EventUtil.listeners.count;
      EventUtil.listeners.refs[eventId] = {
        name: eventName,
        callback,
      };
      return eventId;
    }
    return false;
  }

  static removeEventListener(id: any) {
    if (typeof id === 'string') {
      return delete EventUtil.listeners.refs[id];
    }
    return false;
  }

  static removeAllListeners() {
    let removeError = false;
    Object.keys(EventUtil.listeners.refs).forEach(id => {
      const removed = delete EventUtil.listeners.refs[id];
      removeError = !removeError ? !removed : removeError;
    });
    return !removeError;
  }

  static emitEvent(eventName: string, api?: string) {
    if (eventName === EVENT.showLoading && api) {
      EventUtil.listeners.apiList.push(api);
    }

    if (eventName === EVENT.hideLoading) {
      EventUtil.listeners.apiList = EventUtil.listeners.apiList.filter(
        i => i != api,
      );
    }

    Object.keys(EventUtil.listeners.refs).forEach(id => {
      if (
        EventUtil.listeners.refs[id] &&
        eventName === EventUtil.listeners.refs[id].name
      )
        EventUtil.listeners.refs[id].callback();
    });
  }

  static on(eventName: string, callback: any) {
    return EventUtil.addEventListener(eventName, callback);
  }

  static off(eventName: string) {
    return EventUtil.removeEventListener(eventName);
  }

  static offAll() {
    return EventUtil.removeAllListeners();
  }

  static emit(eventName: string, api?: string) {
    EventUtil.emitEvent(eventName, api);
  }
}
