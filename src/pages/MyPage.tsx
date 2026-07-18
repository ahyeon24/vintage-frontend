import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './MyPage.css';

const MENU_ITEMS = [
    { label: '프로필 수정', to: '/mypage/edit' },
    { label: '내가 쓴 리뷰', to: '/mypage/reviews' },
    { label: '내가 제보한 매장', to: '/mypage/reported' },
];

const SETTINGS_ITEMS = [
    { label: '알림 설정', to: '/mypage/notifications' },
    { label: '문의하기', to: '/mypage/contact' },
];

function MyPage() {
    return (
        <div className="mypage">
            <h1 className="mypage__title">마이페이지</h1>

            <div className="mypage__profile">
                <div className="mypage__avatar" />
                <div className="mypage__profile-info">
                    <p className="mypage__nickname">골목산책자</p>
                    <p className="mypage__region">수원 행궁동 탐험 중</p>
                </div>
            </div>

            <div className="mypage__section">
                <ul className="mypage__menu">
                    {MENU_ITEMS.map((item) => (
                        <li key={item.to}>
                            <Link to={item.to} className="mypage__menu-item">
                                <span>{item.label}</span>
                                <span className="mypage__menu-arrow">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mypage__section">
                <ul className="mypage__menu">
                    {SETTINGS_ITEMS.map((item) => (
                        <li key={item.to}>
                            <Link to={item.to} className="mypage__menu-item">
                                <span>{item.label}</span>
                                <span className="mypage__menu-arrow">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mypage__section">
                <ul className="mypage__menu">
                    <li>
                        <button className="mypage__menu-item mypage__menu-item--danger">
                            로그아웃
                        </button>
                    </li>
                </ul>
            </div>

            <BottomNav />
        </div>
    );
}

export default MyPage;
