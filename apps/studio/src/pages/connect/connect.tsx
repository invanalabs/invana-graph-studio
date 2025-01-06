import React from 'react';
import { Button, Card, BlankLayout, useThemeStore } from '@invana/ui';
import {
  Badge,
  BookOpenIcon, Database, LightbulbIcon,
  Link,
  Package,
} from 'lucide-react';
import { LANDING_ROUTE, LOCALSTORAGE_KEYS } from '../../constants';
import { useConnectionStore } from '../../store/connectionStore';
import { GraphDBConnection } from '../../models';
import { ConnectForm } from '../../components/forms/connect-form';


export interface ILearnMoreItem {
  title: string;
  icon: React.ElementType
  description?: string | null;
  badge?: React.ReactNode | null;
}
const learnMoreItems: ILearnMoreItem[] = [
  {
    title: "Get Started with Invana Studio",
    description: "Modelling graphs, querying, visualisations",
    badge: null,
    icon: LightbulbIcon
  },
  {
    title: "Learn the Fundamentals",
    description: null,
    badge: null,
    icon: BookOpenIcon
  },
  {
    title: "Get started with Python Development",
    description: null,
    badge: <Badge className="bg-blue-500 text-white">Updated</Badge>,
    icon: BookOpenIcon
  }
]

const ConnectPage: React.FC = () => {

  const { initTheme } = useThemeStore(LOCALSTORAGE_KEYS.THEME);
  const { connections, setActiveConnection } = useConnectionStore(LOCALSTORAGE_KEYS.CONNECTION);
  const [_, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    forceUpdate();
  }, [connections]);

  const switchToConnection = (connectionId: string) => {
    setActiveConnection(connectionId);
    window.location.href = LANDING_ROUTE;

  }

  initTheme()

  return (
    <BlankLayout logo={<Package className="h-5 w-5 text-foreground" />}>
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto space-y-6 mt-[7%]">
          <div>
            <h1 className="text-4xl font-semibold">Invana Studio</h1>
            <h2 className="text-xl font-light">An opensource Thinkers toolkit for curious people.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16" >
            {/* Start Section */}
            <div className="space-y-6">
              <div>
                {showForm || connections.length === 0 && <ConnectForm setShowForm={setShowForm} />}
              </div>
              <div>
                <h3 className="mb-4 text-lg"> Recent Connections</h3>
                <div className="space-y-2">
                  {connections.length === 0 ? (
                    <p className="text-zinc-500">There are no connections.</p>
                  ) : (
                    connections.slice(-3).map((connection: GraphDBConnection, index: number) => (
                      <div key={index} className="group">
                        <Button variant={"ghost"} onClick={() => switchToConnection(connection.id)}
                          className="w-full justify-start p-0 hover:bg-transparent text-blue-400 hover:text-blue-300">
                          <Database /> {connection.name} - [{connection.queryLanguage}]
                        </Button>
                        <p className="text-xs text-zinc-500">{connection.hosturl}</p>
                      </div>
                    ))
                  )}

                  <Button variant={"ghost"} onClick={() => setShowForm(true)} className="w-full justify-start p-0 hover:bg-transparent">
                    <Link /> Create a new connection
                  </Button>
                </div>
              </div>
            </div>

            {/* Walkthroughs Section */}
            <div>
              <h3 className="text-lg mb-4">Learn more</h3>
              <div className="space-y-2">
                {learnMoreItems.map((item, index) => (
                  <Card key={index} className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer">
                    <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                      <item.icon className="mr-4 h-5 w-5 text-blue-400" />
                      <div className="text-left ">
                        <div className="font-medium text-white">{item.title}</div>
                        {item.description && (
                          <div className="text-sm text-zinc-400">{item.description}</div>
                        )}
                        {/* {item?.badge} */}
                      </div>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlankLayout>
  );
};

export default ConnectPage;