import { Button, MainLayout } from "@invana/ui";
import { Link } from "react-router-dom";


export default function NotFoundPage() {
  return (

    <MainLayout>
      <div className="flex flex-col h-full items-center justify-center px-4 w-full">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="relative">
            <h1 className="text-7xl sm:text-9xl font-extrabold text-muted-foreground/20">404</h1>
            <h2
              className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-bold text-foreground">
              Oops!
            </h2>
          </div>
          <p className="mt-2 text-xl text-foreground">
            Page not found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button>
                Go back home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}