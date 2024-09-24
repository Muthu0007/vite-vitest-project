import { lazy, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
const UserProvider = lazy(()=> import('./context/UserContext'));
function App() {

  return (
    <Suspense fallback={
      <h1
        style={{
          width: '600%', color: 'white', height: '100vh',
          backgroundColor: 'black', margin: 0, padding: 0, display: 'flex',
          justifyContent: 'center', alignItems: 'center'
        }}
      >Loading...</h1>
    }>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>

    </Suspense >

  )
}

export default App

