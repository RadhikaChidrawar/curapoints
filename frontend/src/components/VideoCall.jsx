
import { useEffect, useState } from 'react';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-sdk-ng';
import { useSocket } from '../context/SocketContext';
import { Video, Mic, VideoOff, PhoneOff } from 'lucide-react';
import { useParams } from 'react-router-dom';

const VideoCall = () => {
  const { channelName } = useParams(); // This will get channel name from URL
  const client = createClient({ mode: 'rtc', codec: 'vp8' });
  const socket = useSocket();
  const [tracks, setTracks] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('Channel Name:', channelName);
        await client.join('d6bf3485ac824eaf82c077f718cc03a9', channelName, null, null);
        const localTracks = await createMicrophoneAndCameraTracks();
        setTracks(localTracks);
        await client.publish(localTracks);
        socket.emit('startVideoCall', channelName);
        setIsConnected(true);
      } catch (error) {
        console.error('Join Error:', error);
      }
    };

    if (channelName) {
      init();
    }

    return () => {
      tracks?.forEach((track) => track.close());
      client.leave();
      setIsConnected(false);
    };
  }, [channelName, socket]);

  const toggleMic = () => {
    if (tracks) {
      tracks[0].setEnabled(!micOn);
      setMicOn(!micOn);
    }
  };

  const toggleVideo = () => {
    if (tracks) {
      tracks[1].setEnabled(!videoOn);
      setVideoOn(!videoOn);
    }
  };

  return (
    <div className='bg-blue-100 p-4 rounded-lg text-center shadow-md w-60 h-25 mx-auto'>
      <h2 className='text-lg font-semibold text-blue-700'>Doctor Video Call</h2>
      {isConnected ? (
        <div className='flex justify-center gap-3 mt-3'>
          <button onClick={toggleMic} className={`p-1 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}>
            <Mic size={18} color='white' />
          </button>
          <button onClick={toggleVideo} className={`p-1 rounded-full ${videoOn ? 'bg-green-500' : 'bg-red-500'}`}>
            {videoOn ? <Video size={18} color='white' /> : <VideoOff size={18} color='white' />}
          </button>
          <button onClick={() => client.leave()} className='bg-red-600 p-1 rounded-full'>
            <PhoneOff size={18} color='white' />
          </button>
        </div>
      ) : (
        <p className='text-gray-500 italic mt-2'>Waiting for Doctor...</p>
      )}
    </div>
  );
};

export default VideoCall;
