'use client';

import { useState, useEffect } from 'react';

interface SellerProfile {
    businessName: string;
    bio: string;
    location: string;
    specialty: string;
    imageUrl: string;
}

export default function SellerProfilePage() {
    const [profile, setProfile] = useState<SellerProfile>({
        businessName: '',
        bio: '',
        location: '',
        specialty: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/seller/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                setProfile(data.profile);
            } else if (response.status === 404) {
                // Profile doesn't exist yet, that's okay - user will create it
                console.log('No profile found, user can create one');
            }
        } catch (err) {
            console.error('Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');

            // First, try to fetch the profile to see if it exists
            const checkResponse = await fetch('/api/seller/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const profileExists = checkResponse.status !== 404;
            const method = profileExists ? 'PATCH' : 'POST';

            const response = await fetch('/api/seller/profile', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Profile saved successfully!');
                setProfile(data.profile);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (err) {
            setMessage('Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-stone-600 dark:text-stone-300">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl">
            <h1 className="text-3xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-8">
                Seller Profile
            </h1>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100' : 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                        Business Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={profile.businessName}
                        onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                        placeholder="Your business name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                        Bio
                    </label>
                    <textarea
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                        placeholder="Tell customers about your craft..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                        placeholder="City, Country"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                        Specialty
                    </label>
                    <input
                        type="text"
                        value={profile.specialty}
                        onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                        placeholder="e.g., Pottery, Weaving, Leatherwork"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                        Profile Image URL
                    </label>
                    <input
                        type="url"
                        value={profile.imageUrl}
                        onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
}
