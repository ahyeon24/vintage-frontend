import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const NAV_ITEMS = [
    { to: '/', label: '홈', icon: '⌂' },
    { to: '/saved', label: '저장', icon: '♡' },
    { to: '/nearby', label: '내주변', icon: '◎' },
    { to: '/mypage', label: '마이페이지', icon: '◐' },
];

function BottomNav() {
    return (
        <nav className="bottom-nav">
            {NAV_ITEMS.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                        `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
                    }
                >
                    <span className="bottom-nav__icon">{item.icon}</span>
                    <span className="bottom-nav__label">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

export default BottomNav;