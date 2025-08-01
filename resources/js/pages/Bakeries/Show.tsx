import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue with Vite/React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface User {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
    logo?: string | null;
    location?: string | null;
    longitude?: number | null;
    latitude?: number | null;
    monthly_rent_fee?: string | null;
    status?: string | null;
    owner?: User | null;
    manager?: User | null;
    storekeeper?: User | null;
    dough_mixer?: User | null;
    baker?: User | null;
    helper?: User | null;
    cleaner?: User | null;
    gatekeeper?: User | null;
}

interface PageProps {
    bakery: Bakery;
}

const Show: React.FC = () => {
    const { bakery } = usePage<PageProps>().props;

    const getLogoUrl = (logo?: string | null) => {
        if (!logo) return null;
        return `/storage/${logo}`;
    };

    const hasValidCoordinates =
        bakery.latitude !== null &&
        bakery.latitude !== undefined &&
        bakery.longitude !== null &&
        bakery.longitude !== undefined;

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-3xl font-bold mb-6">Bakery Details</h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Basic Info</h2>
                    <p>
                        <strong>Name:</strong> {bakery.name}
                    </p>
                    <p>
                        <strong>Location:</strong> {bakery.location || "—"}
                    </p>
                    <p>
                        <strong>Latitude:</strong> {bakery.latitude ?? "—"}
                    </p>
                    <p>
                        <strong>Longitude:</strong> {bakery.longitude ?? "—"}
                    </p>
                    <p>
                        <strong>Monthly Rent Fee:</strong> {bakery.monthly_rent_fee ?? "—"}
                    </p>
                    <p>
                        <strong>Status:</strong> {bakery.status || "Inactive"}
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Logo</h2>
                    {bakery.logo ? (
                        <img
                            src={getLogoUrl(bakery.logo)}
                            alt={`${bakery.name} logo`}
                            className="w-48 h-48 object-contain rounded border"
                        />
                    ) : (
                        <p>No logo uploaded.</p>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Location on Map</h2>
                    {hasValidCoordinates ? (
                        <MapContainer
                            center={[bakery.latitude!, bakery.longitude!]}
                            zoom={13}
                            style={{ height: "300px", width: "100%" }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution="&copy; OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[bakery.latitude!, bakery.longitude!]}>
                                <Popup>{bakery.name}</Popup>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <p className="text-gray-500">Location coordinates not available.</p>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Assigned Users</h2>
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <tbody>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Owner</td>
                            <td className="border px-3 py-2">{bakery.owner?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Manager</td>
                            <td className="border px-3 py-2">{bakery.manager?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Storekeeper</td>
                            <td className="border px-3 py-2">{bakery.storekeeper?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Dough Mixer</td>
                            <td className="border px-3 py-2">{bakery.dough_mixer?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Baker</td>
                            <td className="border px-3 py-2">{bakery.baker?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Helper</td>
                            <td className="border px-3 py-2">{bakery.helper?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Cleaner</td>
                            <td className="border px-3 py-2">{bakery.cleaner?.name || "—"}</td>
                        </tr>
                        <tr>
                            <td className="border px-3 py-2 font-semibold">Gatekeeper</td>
                            <td className="border px-3 py-2">{bakery.gatekeeper?.name || "—"}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between">
                    <Link
                        href="/bakeries"
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back to List
                    </Link>
                    <Link
                        href={`/bakeries/${bakery.id}/edit`}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit Bakery
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
