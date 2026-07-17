import { Routes, Route } from 'react-router-dom';
import StoreList from './pages/StoreList';
import StoreDetail from './pages/StoreDetail';

function App() {
    return (
        <Routes>
            <Route path="/" element={<StoreList />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
        </Routes>
    );
}

export default App;