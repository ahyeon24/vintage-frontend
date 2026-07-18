import { useEffect, useRef } from 'react';

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
    onMarkerClick?: (storeId: number) => void;
}

const HAENGGUNG_LAT = 37.2790;
const HAENGGUNG_LNG = 127.0098;

function KakaoMap({ stores, onMarkerClick }: KakaoMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        const existingScript = document.getElementById('kakao-map-sdk');
        if (existingScript) {
            initMap();
            return;
        }

        const script = document.createElement('script');
        script.id = 'kakao-map-sdk';
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
        script.onload = initMap;
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            addMarkers();
        }
    }, [stores, mapRef.current]);

    function initMap() {
        window.kakao.maps.load(() => {
            if (!containerRef.current) return;

            const center = new window.kakao.maps.LatLng(HAENGGUNG_LAT, HAENGGUNG_LNG);
            const map = new window.kakao.maps.Map(containerRef.current, {
                center,
                level: 4,
            });
            mapRef.current = map;
            addMarkers();
        });
    }

    function addMarkers() {
        const map = mapRef.current;
        if (!map) return;

        stores
            .filter(s => s.latitude && s.longitude)
            .forEach(store => {
                const position = new window.kakao.maps.LatLng(store.latitude!, store.longitude!);

                const content = `
                    <div style="
                        background:#9c4a2e;color:#fff;
                        padding:5px 10px;border-radius:20px;
                        font-size:11px;font-weight:700;
                        white-space:nowrap;cursor:pointer;
                        box-shadow:0 2px 6px rgba(0,0,0,0.2);
                    ">${store.name}</div>
                `;

                const overlay = new window.kakao.maps.CustomOverlay({
                    position,
                    content,
                    map,
                    yAnchor: 1.4,
                });

                overlay.getContent()?.addEventListener?.('click', () => {
                    onMarkerClick?.(store.id);
                    map.panTo(position);
                });
            });
    }

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default KakaoMap;
