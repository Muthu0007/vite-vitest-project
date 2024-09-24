
import ReactDOM from 'react-dom/client'
import React from 'react';
import './index.css'
const App = React.lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
