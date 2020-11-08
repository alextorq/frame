import Noty from 'noty'

class Notification {
    constructor(sender) {
        this.sender = sender;
    }

    sendErrorNotification(text = '') {
        new Noty({
            type: 'error',
            text,
        }).show();
    }
    sendDefaultNotification(text = '') {
        new Noty({
            text,
        }).show();
    }
}

export default new Notification(Noty)