import './App.css';
import { RouterProvider } from 'react-router'; 
import { Provider } from 'react-redux';
import store from './redux/store'; 
import router from './routes/router';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
