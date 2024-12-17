import "./style.css";
import React from 'react'
import ReactDOM from 'react-dom/client';
import {Button} from '@invana/ui'

export function App() {
  return <Button>Button</Button>
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)

