import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoreList from './pages/StoreList';
import StoreDetail from './pages/StoreDetail';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
        </Routes>
    );
}

export default App;