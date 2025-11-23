export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#F6F0E8] text-[#3D322B]">
      <h1 className="text-xl font-bold">Hi Handcrafted Haven</h1>
      <nav className="flex gap-6 items-center">
        <a href="/shop">Shop</a>
        <a href="/company">Company</a>
        <button className="border px-3 py-1 rounded border-[#3D322B]">Login</button>
        <div className="text-2xl">&#9776;</div>
      </nav>
    </header>
  );
}