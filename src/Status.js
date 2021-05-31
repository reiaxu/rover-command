import React from 'react';

import { useMqttState } from 'mqtt-react-hooks';
import { useSubscription } from 'mqtt-react-hooks';

export default function Status() {

  /*
  * Status list
  * - Offline
  * - Connected
  * - Reconnecting
  * - Closed
  * - Error: printed in console too
  */
  const { connectionStatus } = useMqttState();

  /* Message structure:
  *  topic: string
  *  message: string
  */
  const { message } = useSubscription(['marsrover']);

  return (
    
    <>
    <h1>{`Status: ${connectionStatus}`}</h1>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>
          {`topic:${message.topic} - message: ${message.message}`}
        </span>
      </div> */}
    </>
  );
}