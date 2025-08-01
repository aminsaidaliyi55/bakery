import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icons for React+Vite
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
    longitude?: string | null;
    latitude?: string | null;
    monthly_rent_fee?: string | null;
    owner_id?: number | null;
    manager_id?: number | null;
    storekeeper_id?: number | null;
    dough_mixer_id?: number | null;
    baker_id?: number | null;
    helper_id?: number | null;
    cleaner_id?: number | null;
    gatekeeper_id?: number | null;
}

interface PageProps {
    bakery: Bakery;
    users: User[];
    errors: Record<string, string[]>;
}

const Edit: React.FC = () => {
    const { bakery, users, errors: serverErrors } = usePage<PageProps>().props;

    const [form, setForm] = useState({
        name: bakery.name || "",
        logo: null as File | null,
        location: bakery.location || "",
        longitude: bakery.longitude || "38.74",
        latitude: bakery.latitude || "9.03",
        status: (bakery.status ?? "Inactive"),  // <-- added status here with default "Inactive"
        monthly_rent_fee: bakery.monthly_rent_fee || "",
        owner_id: bakery.owner_id?.toString() || "",
        manager_id: bakery.manager_id?.toString() || "",
        storekeeper_id: bakery.storekeeper_id?.toString() || "",
        dough_mixer_id: bakery.dough_mixer_id?.toString() || "",
        baker_id: bakery.baker_id?.toString() || "",
        helper_id: bakery.helper_id?.toString() || "",
        cleaner_id: bakery.cleaner_id?.toString() || "",
        gatekeeper_id: bakery.gatekeeper_id?.toString() || "",
    });

    const [preview, setPreview] = useState<string | null>(
        bakery.logo ? `/storage/${bakery.logo}` : null
    );

    const [isFullscreen, setIsFullscreen] = useState(false);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setForm((prev) => ({ ...prev, logo: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                if (key === "logo" && value instanceof File) {
                    data.append(key, value);
                } else if (typeof value === "string") {
                    data.append(key, value);
                }
            }
        });

        Inertia.put(`/bakeries/${bakery.id}`, data, {
            forceFormData: true,
        });
    };

    const LocationPicker = () => {
        useMapEvents({
            click(e) {
                setForm((prev) => ({
                    ...prev,
                    latitude: e.latlng.lat.toFixed(6),
                    longitude: e.latlng.lng.toFixed(6),
                }));
            },
        });
        return (
            <Marker
                position={[parseFloat(form.latitude), parseFloat(form.longitude)]}
            />
        );
    };

    const toggleFullscreen = () => {
        const el = mapContainerRef.current;
        if (!el) return;

        if (!document.fullscreenElement) {
            el.requestFullscreen()
                .then(() => setIsFullscreen(true))
                .catch(console.error);
        } else {
            document.exitFullscreen()
                .then(() => setIsFullscreen(false))
                .catch(console.error);
        }
    };

    const userRoles = [
        "owner_id",
        "manager_id",
        "storekeeper_id",
        "dough_mixer_id",
        "baker_id",
        "helper_id",
        "cleaner_id",
        "gatekeeper_id",
    ];

    const allErrors = Object.values(serverErrors).flat();

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6">Edit Bakery</h1>

            {allErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded text-red-700">
                    <strong className="block mb-2">Please fix the following errors:</strong>
                    <ul className="list-disc list-inside">
                        {allErrors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                {/* Name */}
                <div>
                    <label className="block font-semibold mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                    {serverErrors.name && (
                        <p className="text-red-600 mt-1">{serverErrors.name[0]}</p>
                    )}
                </div>

                {/* Logo */}
                <div>
                    <label className="block font-semibold mb-1">Logo</label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Logo preview"
                            className="w-32 h-32 mt-2 rounded border object-contain"
                        />
                    )}
                    {serverErrors.logo && (
                        <p className="text-red-600 mt-1">{serverErrors.logo[0]}</p>
                    )}
                </div>
                {/* Status */}
                <div>
                    <label className="block font-semibold mb-1">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {serverErrors.status && (
                        <p className="text-red-600 mt-1">{serverErrors.status[0]}</p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {serverErrors.location && (
                        <p className="text-red-600 mt-1">{serverErrors.location[0]}</p>
                    )}
                </div>

                {/* Map */}
                <div>
                    <label className="block font-semibold mb-1">
                        Select Latitude & Longitude on Map
                    </label>
                    <div
                        ref={mapContainerRef}
                        className="relative border rounded"
                        style={{ height: "300px", width: "100%" }}
                    >
                        <MapContainer
                            center={[parseFloat(form.latitude), parseFloat(form.longitude)]}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution="&copy; OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationPicker />
                        </MapContainer>

                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 z-10"
                        >
                            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        </button>
                    </div>
                </div>

                {/* Latitude & Longitude */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Latitude</label>
                        <input
                            type="number"
                            name="latitude"
                            step="any"
                            value={form.latitude}
                            readOnly
                            className="w-full border rounded p-2"
                        />
                        {serverErrors.latitude && (
                            <p className="text-red-600 mt-1">{serverErrors.latitude[0]}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Longitude</label>
                        <input
                            type="number"
                            name="longitude"
                            step="any"
                            value={form.longitude}
                            readOnly
                            className="w-full border rounded p-2"
                        />
                        {serverErrors.longitude && (
                            <p className="text-red-600 mt-1">{serverErrors.longitude[0]}</p>
                        )}
                    </div>
                </div>

                {/* Monthly Rent Fee */}
                <div>
                    <label className="block font-semibold mb-1">Monthly Rent Fee</label>
                    <input
                        type="number"
                        name="monthly_rent_fee"
                        step="0.01"
                        min="0"
                        value={form.monthly_rent_fee}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {serverErrors.monthly_rent_fee && (
                        <p className="text-red-600 mt-1">{serverErrors.monthly_rent_fee[0]}</p>
                    )}
                </div>

                {/* User Roles */}
                {userRoles.map((role) => (
                    <div key={role}>
                        <label className="block font-semibold mb-1 capitalize">
                            {role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </label>
                        <select
                            name={role}
                            value={form[role as keyof typeof form]}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id.toString()}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {serverErrors[role] && (
                            <p className="text-red-600 mt-1">{serverErrors[role][0]}</p>
                        )}
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <Link
                        href="/bakeries"
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
