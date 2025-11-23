import Head from 'next/head';

// --- UPDATED STATIC DATA ---
const ArtisanStories = [
    {
        id: 1,
        name: 'Aisha’s Handwoven Baskets',
        location: 'Marrakech, Morocco',
        focus: 'Natural Fibers & Tradition',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
        link: '#aisha-story'
    },
    {
        id: 2,
        name: 'The Clay Studio',
        location: 'Kyoto, Japan',
        focus: 'Minimalist Ceramics',
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80',
        link: '#clay-studio'
    },
    {
        id: 3,
        name: 'Riverwood Leather Goods',
        location: 'Austin, Texas',
        focus: 'Sustainable Leatherwork',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
        link: '#riverwood-leather'
    },
];

const CommunityImpacts = [
    {
        id: 1,
        title: 'Supporting 50+ Artisans',
        description: 'Providing fair wages and sustainable income streams to creators worldwide.',
        icon: '🌍',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80'
    },
    {
        id: 2,
        title: '100% Sustainable Materials',
        description: 'Committed to sourcing natural, recycled, or ethically grown materials for all crafts.',
        icon: '🌱',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'
    },
    {
        id: 3,
        title: 'Preserving Heritage Crafts',
        description: 'Highlighting traditional techniques and passing knowledge to the next generation.',
        icon: '📜',
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80'
    },
    {
        id: 4,
        title: 'Skill Workshops Funded',
        description: 'Using 5% of profits to fund training workshops in local communities.',
        icon: '🛠️',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80'
    },
];

// --- REUSABLE COMPONENTS ---

// Simplified for Community Context
const StarRating = () => (
    <div className="flex space-x-0.5 text-sm">
        <span className="text-yellow-600">★</span>
        <span className="text-yellow-600">★</span>
        <span className="text-yellow-600">★</span>
        <span className="text-yellow-600">★</span>
        <span className="text-yellow-600">★</span>
    </div>
);

// New Component for Artisan/Story Previews
const ArtisanStoryCard = ({ name, location, focus, image, link }: { name: string; location: string; focus: string; image: string; link: string }) => (
    <a href={link} className="flex flex-col group cursor-pointer">
        <div className="w-full h-80 bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="mt-4">
            <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-500 transition-colors">{name}</h3>
            <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{location}</p>
            <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-medium text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded-full">{focus}</span>
            </div>
        </div>
    </a>
);

// New Component for Impact Metrics
const ImpactCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6 flex flex-col items-start h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">{title}</h3>
        <p className="text-sm text-stone-600 dark:text-stone-300">{description}</p>
    </div>
);


// --- FOOTER COMPONENT (Unchanged) ---
const Footer = () => (
    <footer className="bg-stone-50 border-t border-stone-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-serif font-semibold text-stone-900 mb-4">
                        Handcrafted Haven
                    </h3>
                    <p className="text-sm text-stone-600">
                        A curated marketplace for vintage and handmade goods.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-medium text-stone-800 mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm text-stone-600">
                        <li><a href="#" className="hover:text-stone-900">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-stone-900">Sales</a></li>
                        <li><a href="#" className="hover:text-stone-900">Collections</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-medium text-stone-800 mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-stone-600">
                        <li><a href="#" className="hover:text-stone-900">FAQ</a></li>
                        <li><a href="#" className="hover:text-stone-900">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-stone-900">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-medium text-stone-800 mb-4">Connect</h4>
                    <ul className="space-y-2 text-sm text-stone-600">
                        <li><a href="#" className="hover:text-stone-900">Instagram</a></li>
                        <li><a href="#" className="hover:text-stone-900">Pinterest</a></li>
                        <li><a href="#" className="hover:text-stone-900">Terms & Privacy</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 pt-6 border-t border-stone-200 text-center">
                <p className="text-sm text-stone-500">
                    &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);


// --- MAIN PAGE COMPONENT ---
export default function CommunityHighlightPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-stone-900 flex flex-col">
            <Head>
                <title>Community | Handcrafted Haven</title>
            </Head>



            {/* Main Content Container */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-12 pt-16">

                {/* 🌟 HERO SECTION: Focused on Community */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Text and Button Column */}
                    <div className="flex flex-col space-y-8">
                        <p className="text-lg text-amber-900 font-semibold uppercase tracking-widest">Our Global Family</p>
                        <h1 className="text-6xl font-serif font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                            Stories of Craft and Connection
                        </h1>
                        <p className="text-xl text-stone-600 dark:text-stone-300">
                            Meet the talented artisans, traditional makers, and ethical sources that bring Handcrafted Haven to life.
                        </p>
                        <button className="w-fit px-8 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition duration-150 shadow-md">
                            Apply to be a Maker
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
                            alt="Artisan at work"
                            className="w-full h-96 object-cover"
                        />
                    </div>
                </div>

                {/* 🌟 ARTISAN STORIES SECTION (Replaces Featured Products) */}
                <section className="mt-20">
                    <h2 className="text-4xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-10">
                        Featured Artisan Spotlights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {ArtisanStories.map((story) => (
                            <ArtisanStoryCard
                                key={story.id}
                                name={story.name}
                                location={story.location}
                                focus={story.focus}
                                image={story.image}
                                link={story.link}
                            />
                        ))}
                    </div>
                </section>

                {/* 🌟 COMMUNITY IMPACT SECTION (Replaces Categories) */}
                <section className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            Our Commitment & Impact
                        </h2>
                        <p className="text-lg text-stone-600 dark:text-stone-300">
                            Transparency in every step, ensuring ethical and sustainable practices.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {CommunityImpacts.map((impact) => (
                            <ImpactCard
                                key={impact.id}
                                title={impact.title}
                                description={impact.description}
                                icon={impact.icon}
                            />
                        ))}
                    </div>
                </section>

                {/* ABOUT SECTION (Now Focused on Process) */}
                <section className="mt-24 bg-stone-50 -mx-4 sm:-mx-12 px-4 sm:px-12 py-16 rounded-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="w-full h-96 rounded-lg overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                                alt="Craftsman at work"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-6">
                                The Journey of a Handcrafted Item
                            </h2>
                            <p className="text-lg text-stone-600 mb-4">
                                We believe in conscious commerce. Every purchase directly contributes to the livelihood of the artisan and their community, supporting fair wages and the continuation of traditional skills.
                            </p>
                            <ul className="list-disc list-inside text-lg text-stone-600 mb-6 space-y-1">
                                <li>Source : Ethically gathered raw materials.</li>
                                <li>Craft : Slow, intentional production by the maker.</li>
                                <li>Impact : Direct, transparent financial support.</li>
                            </ul>
                            <button className="px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition duration-150">
                                View Our Artisan Pledge
                            </button>
                        </div>
                    </div>
                </section>

                {/* 🌟 TESTIMONIALS SECTION (Changed to Artisan Quotes) */}
                <section className="mt-24">
                    <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-12 text-center">
                        Voices from Our Makers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border border-stone-200 rounded-lg p-8">
                            <p className="mt-4 text-stone-700 italic text-xl font-serif">
                                "This partnership allows me to focus on the art, not just the sales. My family's craft is thriving again."
                            </p>
                            <p className="mt-4 text-sm font-medium text-amber-900">— Aisha K., Weaver</p>
                        </div>
                        <div className="bg-white border border-stone-200 rounded-lg p-8">
                            <p className="mt-4 text-stone-700 italic text-xl font-serif">
                                "Knowing that customers truly value handmade quality is incredibly rewarding. It inspires me to push my boundaries."
                            </p>
                            <p className="mt-4 text-sm font-medium text-amber-900">— Kenji T., Ceramist</p>
                        </div>
                        <div className="bg-white border border-stone-200 rounded-lg p-8">
                            <p className="mt-4 text-stone-700 italic text-xl font-serif">
                                "The transparency they offer buyers means every sale is a genuine vote of confidence in sustainable making."
                            </p>
                            <p className="mt-4 text-sm font-medium text-amber-900">— Sara D., Natural Dyer</p>
                        </div>
                    </div>
                </section>

                {/* NEWSLETTER SECTION (Changed Call to Action) */}
                <section className="mt-24 mb-16 bg-amber-50 -mx-4 sm:-mx-12 px-4 sm:px-12 py-16 rounded-2xl text-center">
                    <h2 className="text-3xl font-serif font-semibold text-stone-900 mb-4">
                        Join the Movement
                    </h2>
                    <p className="text-lg text-stone-600 mb-8">
                        Receive exclusive stories, process videos, and first looks at new artisan collaborations.
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                        />
                        <button className="px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition duration-150">
                            Subscribe to Stories
                        </button>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
