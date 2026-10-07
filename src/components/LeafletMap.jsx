import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix Leaflet's default icon paths in bundler environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

export default function LeafletMap({ 
  center = [17.2185, 78.4984], 
  zoom = 12, 
  markers = [], 
  className = "h-[350px] w-full rounded-2xl" 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Green Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: #16a34a; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
          <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30]
    });

    if (markers.length > 0) {
      markers.forEach(m => {
        if (m.lat && m.lng) {
          const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(map);
          if (m.title) {
            marker.bindPopup(`
              <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
                <strong style="color: #16a34a; font-size: 14px;">${m.title}</strong><br/>
                ${m.subtitle ? `<span style="color: #555;">${m.subtitle}</span><br/>` : ''}
                ${m.price ? `<span style="font-weight: 700; color: #111;">${m.price}</span>` : ''}
              </div>
            `);
          }
        }
      });
    } else {
      // Default single marker at center
      L.marker(center, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong style="color: #16a34a;">Plot Location</strong><br/>Verified on OnlyPlots.online`)
        .openPopup();
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers]);

  return (
    <div className={`overflow-hidden border border-gray-200 z-10 ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
