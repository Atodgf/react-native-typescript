import PushNotification from 'react-native-push-notification'

const showNotification = (title:any, message:any) => {
    PushNotification.localNotification({
        title: title,
        message:message
    })
}

export default showNotification