import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface Store {
    id: number;
    name: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
}

interface KakaoMapProps {
    stores: Store[];
    level?: number;
    onMarkerClick?: (storeId: number) => void;
}

const HAENGGUNG_LAT = 37.2790;
const HAENGGUNG_LNG = 127.0098;

function KakaoMap({ stores, level = 4, onMarkerClick }: KakaoMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (document.getElementById('kakao-map-sdk')) {
            if (window.kakao?.maps) {
                initMap();
            }
            return;
        }

        const script = document.createElement('script');
        script.id = 'kakao-map-sdk';
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
        script.onload = initMap;
        script.onerror = () => setError(true);
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (mapRef.current && stores.length > 0) {
            addMarkers();
        }
    }, [stores]);

    function initMap() {
        if (!window.kakao?.maps) {
            setError(true);
            return;
        }

        window.kakao.maps.load(() => {
            if (!containerRef.current) return;

            const firstStore = stores.find(s => s.latitude && s.longitude);
            const centerLat = firstStore?.latitude ?? HAENGGUNG_LAT;
            const centerLng = firstStore?.longitude ?? HAENGGUNG_LNG;
            const center = new window.kakao.maps.LatLng(centerLat, centerLng);
            const map = new window.kakao.maps.Map(containerRef.current, {
                center,
                level,
            });
            mapRef.current = map;
            addMarkers();
        });
    }

    function addMarkers() {
        const map = mapRef.current;
        if (!map || !window.kakao?.maps) return;

        stores
            .filter(s => s.latitude && s.longitude)
            .forEach(store => {
                const position = new window.kakao.maps.LatLng(store.latitude!, store.longitude!);

                const content = document.createElement('div');
                content.style.cssText = `
                    background:#9c4a2e;color:#fff;
                    padding:5px 10px;border-radius:20px;
                    font-size:11px;font-weight:700;
                    white-space:nowrap;cursor:pointer;
                    box-shadow:0 2px 6px rgba(0,0,0,0.2);
                    font-family:-apple-system,sans-serif;
                `;
                content.textContent = store.name;
                content.addEventListener('click', () => {
                    onMarkerClick?.(store.id);
                    map.panTo(position);
                });

                new window.kakao.maps.CustomOverlay({
                    position,
                    content,
                    map,
                    yAnchor: 1.4,
                });
            });
    }

    if (error) {
        return (
            <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: '#d6cfc4', gap: 8,
            }}>
                <span style={{ fontSize: 28, color: '#9c4a2e' }}>◎</span>
                <p style={{ fontSize: 12, color: '#5a4a3a', fontWeight: 600 }}>지도를 불러올 수 없어요</p>
            </div>
        );
    }

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default KakaoMap;
