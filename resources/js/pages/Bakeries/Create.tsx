import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

interface PageProps {
    users: User[];
    errors: Record<string, string[]>;
}

const Create: React.FC = () => {
    const { users, errors: serverErrors } = usePage<PageProps>().props;

    const [form, setForm] = useState({
        name: "",
        logo: null as File | null,
        location: "",
        longitude: "38.74", // Default longitude
        latitude: "9.03",   // Default latitude
        monthly_rent_fee: "",
        owner_id: "",
        manager_id: "",
        storekeeper_id: "",
        dough_mixer_id: "",
        baker_id: "",
        helper_id: "",
        cleaner_id: "",
        gatekeeper_id: "",
    });

    const [preview, setPreview] = useState<string | null>(null);

    // Ref for map container div to toggle fullscreen
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // State to track fullscreen mode for toggling button label
    const [isFullscreen, setIsFullscreen] = useState(false);

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

        router.post("/bakeries", data, {
            forceFormData: true,
            onError: () => {
                // Server errors shown automatically
            },
        });
    };

    // Map click updates latitude & longitude in form state
    const LocationPicker = () => {
        useMapEvents({
            click(e) {
                setForm((prev) => ({
                    ...prev,
                    latitude: e.latlng.lat.toString(),
                    longitude: e.latlng.lng.toString(),
                }));
            },
        });
        return (
            <Marker
                position={[parseFloat(form.latitude), parseFloat(form.longitude)]}
            />
        );
    };

    // Toggle fullscreen mode on the map container div
    const toggleFullscreen = () => {
        const el = mapContainerRef.current;
        if (!el) return;

        if (!document.fullscreenElement) {
            el.requestFullscreen()
                .then(() => setIsFullscreen(true))
                .catch(() => {});
        } else {
            document.exitFullscreen()
                .then(() => setIsFullscreen(false))
                .catch(() => {});
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

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6">Create Bakery</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                {/* Name input */}
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

                {/* Logo input */}
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

                {/* Location description */}
                <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Address or description"
                    />
                    {serverErrors.location && (
                        <p className="text-red-600 mt-1">{serverErrors.location[0]}</p>
                    )}
                </div>

                {/* Map container with fullscreen button */}
                <div className="mb-4">
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

                {/* Latitude & Longitude display (readonly) */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            name="latitude"
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
                            step="any"
                            name="longitude"
                            value={form.longitude}
                            readOnly
                            className="w-full border rounded p-2"
                        />
                        {serverErrors.longitude && (
                            <p className="text-red-600 mt-1">{serverErrors.longitude[0]}</p>
                        )}
                    </div>
                </div>

                {/* Monthly rent fee */}
                <div>
                    <label className="block font-semibold mb-1">Monthly Rent Fee</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        name="monthly_rent_fee"
                        value={form.monthly_rent_fee}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {serverErrors.monthly_rent_fee && (
                        <p className="text-red-600 mt-1">{serverErrors.monthly_rent_fee[0]}</p>
                    )}
                </div>

                {/* User roles selects */}
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
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {serverErrors[role] && (
                            <p className="text-red-600 mt-1">{serverErrors[role][0]}</p>
                        )}
                    </div>
                ))}

                {/* Cancel and Save buttons */}
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

export default Create;
