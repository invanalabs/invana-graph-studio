import React, { useState } from 'react';
import { Label, Input, Checkbox, Button, Select, SelectTrigger, SelectValue, SelectItem, SelectContent, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@invana/ui';
import { useConnectionStore } from '../../store/connectionStore';
import { LOCALSTORAGE_KEYS } from '../../constants';
import { SupportedQueryLanguages } from '../../models';

export const ConnectForm = ({ setShowForm }) => {
  const [requiresAuth, setRequiresAuth] = useState(false);
  const { createConnection, isConnectionNameExists } = useConnectionStore(LOCALSTORAGE_KEYS.CONNECTION);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const connectionData = {
      name: formData.get('name') as string,
      queryLanguage: formData.get('queryLanguage') as SupportedQueryLanguages,
      hosturl: formData.get('hosturl') as string,
      username: requiresAuth ? (formData.get('username') as string) : undefined,
      password: requiresAuth ? (formData.get('password') as string) : undefined,
    };
    if (isConnectionNameExists(connectionData.name)) {
      alert('Connection with the same name already exists');
      return;
    }
    createConnection(connectionData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to a graph engine</CardTitle>
      </CardHeader>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <CardContent className='pb-2'>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="name" className="text-sm font-medium">Connection Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="space-mission-101"
                required
                className="border-input bg-background"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="queryLanguage" className="text-sm font-medium">Query Language</Label>
              <Select name="queryLanguage">
                <SelectTrigger className="w-[180px] border-input bg-background">
                  <SelectValue placeholder="select a dialect" />
                </SelectTrigger>
                <SelectContent>
                  {['gremlin', 'cypher'].map((dialect) => (
                    <SelectItem key={dialect} value={dialect}>{dialect}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hosturl" className="text-sm font-medium">Invana engine hosturl</Label>
            <Input
              id="hosturl"
              name="hosturl"
              placeholder="http://megamind-ws:8182/gremlin"
              required
              className="border-input bg-background"
            />
          </div>
          <div className="flex items-center space-x-2 my-3">
            <Checkbox
              id="requiresAuth"
              checked={requiresAuth}
              onCheckedChange={(checked: boolean) => setRequiresAuth(checked as boolean)}
            />
            <Label htmlFor="requiresAuth" className="text-sm font-medium">
              Requires Authentication
            </Label>
          </div>
          {requiresAuth && (
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="border-input bg-background"
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border-input bg-background"
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" variant={'default'}>
            Connect
          </Button>
          <Button variant={'outline'} className='!p-4 ml-4' onClick={() => setShowForm(false)}>Close</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
