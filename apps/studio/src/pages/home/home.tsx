import React from 'react';
import { MainLayout, Button, Card, Badge, Separator, } from '@invana/ui';
import {
  BookOpenIcon, FileIcon, FolderOpen, GitFork,
  PiIcon as PythonIcon, GithubIcon, LightbulbIcon, Link,
  Database
} from 'lucide-react';


const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto space-y-6 mt-[7%]">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Invana Studio</h1>
            <h2 className="text-xl font-light">An opensource Thinkers toolkit for curious people.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16" >
            {/* Start Section */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg"> Recent Connections</h3>
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="group">
                      <Button variant={"ghost"} className="w-full justify-start p-0 hover:bg-transparent text-blue-400 hover:text-blue-300">
                        Connection {index + 1}
                      </Button>
                      <p className="text-xs text-zinc-500">~/Projects/Invana/invana/connection-{index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Walkthroughs Section */}
            <div>
              <h3 className="text-lg mb-4">Learn more</h3>
              <div className="space-y-2">
                <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                    <LightbulbIcon className="mr-4 h-5 w-5 text-blue-400" />
                    <div className="text-left">
                      <div className="font-medium text-white">Get Started with Invana Studio</div>
                      <div className="text-sm text-zinc-400">Modelling graphs, querying, visualisations</div>
                    </div>
                  </Button>
                </Card>

                <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                    <BookOpenIcon className="mr-4 h-5 w-5 text-blue-400" />
                    <div className="text-left">
                      <div className="font-medium text-white">Learn the Fundamentals</div>
                    </div>
                  </Button>
                </Card>
                {/* 
                <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                    <GithubIcon className="mr-4 h-5 w-5 text-blue-400" />
                    <div className="text-left flex items-center gap-2">
                      <div className="font-medium text-white">GitHub Copilot</div>
                      <Badge className="bg-blue-500 text-white">Updated</Badge>
                    </div>
                  </Button>
                </Card>

                <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                    <PythonIcon className="mr-4 h-5 w-5 text-blue-400" />
                    <div className="text-left flex items-center gap-2">
                      <div className="font-medium text-white">Get Started with Python Development</div>
                      <Badge className="bg-blue-500 text-white">Updated</Badge>
                    </div>
                  </Button>
                </Card> */}

                {/* <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                    <BookOpenIcon className="mr-4 h-5 w-5 text-blue-400" />
                    <div className="text-left flex items-center gap-2">
                      <div className="font-medium text-white">Get Started with Jupyter Notebooks</div>
                      <Badge className="bg-blue-500 text-white">Updated</Badge>
                    </div>
                  </Button>
                </Card> */}

                {/* <Button variant="ghost" className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-zinc-800">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  More...
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;