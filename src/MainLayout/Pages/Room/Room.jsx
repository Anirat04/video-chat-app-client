import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../../../providers/Socket'
import { usePeer } from '../../../providers/Peer';
import ReactPlayer from 'react-player'

const Room = () => {

    const { socket } = useSocket()
    const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer()
    const [myStream, setMyStream] = useState(null)

    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log('New user joined room', emailId);
        const offer = await createOffer();
        socket.emit('call-user', { emailId, offer })
    }, [createOffer, socket])



    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data
        console.log('Incoming call from', from, offer);
        const ans = await createAnswer(offer);
        socket.emit('call-accepted', { emailId: from, ans })
    }, [createAnswer, socket])

    const handleCallAccepted = useCallback(async (data) => {
        const { ans } = data;
        console.log('Call Got Accepted', ans);
        await setRemoteAnswer(ans)
    }, [setRemoteAnswer])


    // Media Player by react
    const getUserMediaStream = useCallback(async (data) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        setMyStream(stream)
    }, [])

    useEffect(() => {
        // Subscribe to socket event
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted)

        // Clean up function
        return () => {
            // Unsubscribe from socket event
            socket.off('user-joined', handleNewUserJoined);
            socket.off('incoming-call', handleIncomingCall)
            socket.off('call-accepted', handleCallAccepted)
        };
    }, [handleCallAccepted, handleIncomingCall, handleNewUserJoined, socket]);


    useEffect(() => {
        getUserMediaStream()
    }, [getUserMediaStream])

    return (
        <div>
            <h1>This is room page</h1>
            <ReactPlayer url={myStream} playing muted></ReactPlayer>
        </div>
    );
};

export default Room;