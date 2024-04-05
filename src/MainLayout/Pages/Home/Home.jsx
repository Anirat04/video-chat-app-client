import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../../providers/Socket'


const Home = () => {
    const { socket } = useSocket()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [roomId, setRoomId] = useState('')

    const handleRoomJoined = ({ roomId }) => {
        navigate(`/room/${roomId}`)
        // console.log('room joined', roomId);
    }

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined )
    }, [socket])
    // useEffect(() => {
    //     socket.on('joined-room', handleRoomJoined);
    //     return () => {
    //         socket.off('joined-room', handleRoomJoined);
    //     };
    // }, [socket]);

    const handleJoinRoom = () => {
        socket.emit('join-room', { emailId: email, roomId })
    }

    return (
        <div className='homePage-container'>
            <div className="flex flex-col gap-4 max-w-[300px] bg-slate-200 p-8">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your Email Address here"
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="text"
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                    placeholder='Enter room code'
                    className="input input-bordered w-full max-w-xs"
                />
                <button onClick={handleJoinRoom} className="btn btn-primary">Enter Room</button>
            </div>
        </div>
    );
};

export default Home;