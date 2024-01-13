import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';

export const usePusher = async () => {
  const pusher = Pusher.getInstance();

  try {
    await pusher.init({
      apiKey: '2035b903b7c2a61ce5b6',
      cluster: 'ap1',
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: 'my-channel',
      onSubscriptionSucceeded: data => {
        console.log(`[Pusher] Subscribed success ${JSON.stringify(data)}.`);
      },
      onSubscriptionError: error => {
        console.log(`[Pusher] Error: ${error}`);
      },
      onEvent: (event: PusherEvent) => {
        console.log(`[Pusher] Event received: ${event}`);
      },
    });
  } catch (e) {
    console.log(`[Pusher] Error: ${e}`);
  }
};
