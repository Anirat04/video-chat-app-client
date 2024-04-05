import React, { useCallback, useEffect } from 'react';
import { useSocket } from '../../../providers/Socket'
import { usePeer } from '../../../providers/Peer';

const Room = () => {
    const { socket } = useSocket()
    const { peer, createOffer } = usePeer()


    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log('New user joined room', emailId);
        const offer = await createOffer();
        socket.emit('call-user', { emailId, offer })
    }, [createOffer, socket])



    const handleIncomingCall = useCallback((data) =>{
        const {from, offer} = data
        console.log('Incoming call from', from, offer);
    },[])

    useEffect(() => {
        // Subscribe to socket event
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incoming-call', handleIncomingCall);

        // Clean up function
        return () => {
            // Unsubscribe from socket event
            socket.off('user-joined', handleNewUserJoined);
            socket.off('incoming-call', handleIncomingCall)
        };
    }, [handleIncomingCall, handleNewUserJoined, socket]);


    return (
        <div>
            <h1>This is room page</h1>
        </div>
    );
};

export default Room;