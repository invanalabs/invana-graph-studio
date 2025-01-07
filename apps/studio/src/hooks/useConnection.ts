import { useConnectionStore } from '@/store/connectionStore';



const useConnections = () => {

  const connections = useConnectionStore((state) => state.connections);
  const getConnections = useConnectionStore((state) => state.getConnections);
  const createConnection = useConnectionStore((state) => state.createConnection);

  const isConnectionNameExists = useConnectionStore((state) => state.isConnectionNameExists);

  const activeConnectionId = useConnectionStore((state) => state.activeConnectionId);
  const setActiveConnectionId = useConnectionStore((state) => state.setActiveConnectionId);
  const getActiveConnection = useConnectionStore((state) => state.getActiveConnection);

  return {
    connections,
    getConnections,
    createConnection,
    isConnectionNameExists,
    activeConnectionId,
    setActiveConnectionId,
    getActiveConnection
  };
};

export default useConnections;