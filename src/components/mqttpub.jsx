import React from 'react'


import mqtt from 'mqtt/dist/mqtt'
import { useState } from 'react'
import { useEffect } from 'react'

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

export default function MQTTPub() { 

  const [messages, setMessages] = useState('?')
  const [lampState, setLampState ] = useState('d') 

  const host = 'wss://broker.emqx.io:8084/mqtt'
  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    }
  }

  function handleClick(message) {
    console.log('Connecting mqtt client!')
    const client = mqtt.connect(host, options)
    client.publish("CASA/controle1", message)
    if (lampState == 'd') {
      setLampState('l')
    }
    else {
      setLampState('d' )
    }

  } 


  return (
    <div>
       <button type="button" onClick={() => handleClick(lampState)}>
         {lampState == 'l'?   'Ligar' : 'Desligar'  }
        </button>
    </div>
  )


}