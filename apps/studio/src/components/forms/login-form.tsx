import React, { useState } from 'react';
import { Label, Input, Checkbox, Button } from '@invana/ui'


export const LoginForm = () => {

  const [requiresAuth, setRequiresAuth] = useState(false)

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Connection Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="My Connection"
          required
          className="border-input bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url" className="text-sm font-medium">Invana engine url</Label>
        <Input
          id="url"
          name="url"
          placeholder="https://megamind-ws/graphql"
          required
          className="border-input bg-background"
        />
      </div>
      <div className="flex items-center space-x-2">
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
        <>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              className="border-input bg-background"
              required
            />
          </div>
          <div className="space-y-2">
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
        </>
      )}
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Create Connection
      </Button>
    </form>
  );
};

