import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoreList from './pages/StoreList';
import StoreDetail from './pages/StoreDetail';
import Saved from './pages/Saved';
import Nearby from './pages/Nearby';
import MyPage from './pages/MyPage';
import ReportStore from './pages/ReportStore';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/report" element={<ReportStore />} />
        </Routes>
    );
}

export default App;