"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Layers, Compass, ExternalLink } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface ProjectMapProps {
  name: string;
  location: string;
  area?: string;
  lat: number;
  lng: number;
  googleMapsUrl?: string;
}

type TileTheme = "street" | "satellite" | "dark";

export default function ProjectMap({
  name,
  location,
  area,
  lat,
  lng,
  googleMapsUrl,
}: ProjectMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const [activeTheme, setActiveTheme] = useState<TileTheme>("street");
  const [isLoaded, setIsLoaded] = useState(false);

  const directMapUrl =
    googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;

      // Dynamic import to ensure Leaflet runs only on client
      const L = (await import("leaflet")).default;

      if (!isMounted) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Define tile layers
      const tileLayers: Record<TileTheme, any> = {
        street: L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ),
        satellite: L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            maxZoom: 19,
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          }
        ),
        dark: L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 20,
            attribution:
              '&copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        ),
      };

      // Add default tile layer
      tileLayers[activeTheme].addTo(map);
      layerGroupRef.current = tileLayers;

      // Custom Luxury Gold Marker Icon
      const goldIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(201, 168, 76, 0.35); animation: leaflet-pulse 2s infinite ease-out;"></div>
            <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: #C9A84C; border: 2px solid #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: #111111;"></div>
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

      // Add Marker
      const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);

      // Add Popup
      const popupContent = `
        <div style="font-family: inherit; padding: 4px 2px; color: #111; min-width: 180px;">
          <h4 style="font-weight: 700; font-size: 13px; color: #111; margin: 0 0 4px 0; letter-spacing: -0.01em;">${name}</h4>
          <p style="font-size: 11px; color: #666; margin: 0 0 8px 0; line-height: 1.3;">${
            area ? `${area}, ` : ""
          }${location}</p>
          <a href="${directMapUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #C9A84C; color: #111; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; text-decoration: none; border-radius: 2px;">
            Open in Google Maps ↗
          </a>
        </div>
      `;
      marker.bindPopup(popupContent);

      setIsLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, name, location, area, directMapUrl]);

  // Switch Tile Theme
  const switchTheme = (theme: TileTheme) => {
    setActiveTheme(theme);
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layers = layerGroupRef.current;
    Object.values(layers).forEach((l: any) => {
      if (mapInstanceRef.current.hasLayer(l)) {
        mapInstanceRef.current.removeLayer(l);
      }
    });

    layers[theme].addTo(mapInstanceRef.current);
  };

  const handleCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 15, { animate: true });
    }
  };

  return (
    <div className="rounded-sm overflow-hidden border border-white/15 bg-[#141414] shadow-2xl relative group">
      <style jsx global>{`
        @keyframes leaflet-pulse {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .custom-leaflet-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 4px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>

      {/* Top Map Bar with Controls */}
      <div className="px-4 py-3 bg-[#181818] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
          </span>
          <span className="font-body text-[11px] uppercase tracking-wider text-white/80 font-medium">
            Interactive Location Map
          </span>
        </div>

        {/* Layer switchers */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded border border-white/10">
          <button
            type="button"
            onClick={() => switchTheme("street")}
            className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded transition-all ${
              activeTheme === "street"
                ? "bg-brand-gold text-black font-semibold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => switchTheme("satellite")}
            className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded transition-all ${
              activeTheme === "satellite"
                ? "bg-brand-gold text-black font-semibold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => switchTheme("dark")}
            className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded transition-all ${
              activeTheme === "dark"
                ? "bg-brand-gold text-black font-semibold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Terrain
          </button>
          <button
            type="button"
            onClick={handleCenter}
            title="Center on Project"
            className="p-1 text-white/60 hover:text-brand-gold ml-1 transition-colors"
          >
            <Compass size={14} />
          </button>
        </div>

        <span className="font-mono text-[11px] text-brand-gold/90 hidden md:inline-block">
          {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
        </span>
      </div>

      {/* Interactive Map Visual */}
      <div
        ref={mapContainerRef}
        className="w-full relative z-0 bg-[#0d0d0d]"
        style={{ height: "400px", minHeight: "350px" }}
      />

      {/* Bottom CTA / Details Bar */}
      <div className="p-4 md:p-5 bg-[#111111] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
            <MapPin size={20} className="text-brand-gold" />
          </div>
          <div>
            <p className="font-heading font-semibold text-white text-sm">
              {name}
            </p>
            <p className="font-body text-white/60 text-xs mt-0.5">
              {area ? `${area}, ` : ""}
              {location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={directMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-gold text-xs px-5 py-2.5 flex items-center justify-center gap-2 w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
          >
            <Navigation size={14} />
            <span>Open in Google Maps ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
