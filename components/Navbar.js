import { HiSearch, HiBell, HiChevronLeft, HiChevronRight } from "react-icons/hi";

function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
            <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
                {/* Left: Navigation Arrows */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-white/10 transition">
                            <HiChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/10 transition">
                            <HiChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition" />
                        <input
                            type="text"
                            placeholder="Search movies, shows..."
                            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 outline-none focus:bg-white/10 focus:border-white/20 transition-all w-64 md:w-96"
                        />
                    </div>
                </div>

                {/* Right: User Menu */}
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-white/10 transition relative">
                        <HiBell className="w-6 h-6" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"
                            alt="User"
                            className="w-8 h-8 rounded-full border border-white/20"
                        />
                        <span className="hidden md:block font-medium text-sm">Agung Hapsah</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
