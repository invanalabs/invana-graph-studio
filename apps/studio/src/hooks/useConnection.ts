import { useConnectionStore } from '@/store/connectionStore';



const useConnections = () => {

  const connections = useConnectionStore((state) => state.connections);
  const getConnections = useConnectionStore((state) => state.getConnections);
  const createConnection = useConnectionStore((state) => state.createConnection);

  const isConnectionNameExists = useConnectionStore((state) => state.isConnectionNameExists);
  const activeConnection = useConnectionStore((state) => state.activeConnection);
  const setActiveConnection = useConnectionStore((state) => state.setActiveConnection);


  return {
    connections,
    getConnections,
    createConnection,
    isConnectionNameExists,
    activeConnection,
    setActiveConnection,
  };
};

export default useConnections;