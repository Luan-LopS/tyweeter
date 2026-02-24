import PageLogin from './pages/login';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyles';
import ContainerHome from './containers/containerHome';
import TweetWrapper from './components/tweetWrapper';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/cadastro" element={<PageLogin />} />
          <Route path="/home/*" element={<ContainerHome/>} >
            <Route path="tweet/:id" element={<TweetWrapper />} />
            <Route path="tweet" element={<TweetWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
