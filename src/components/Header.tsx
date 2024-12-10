// const navigation = [
//   { name: "Product", href: "#" },
// ];

export function Header() {
  return (
    <header className="bg-ocean-base/65 sticky top-0">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="https://chriswhite.rocks" className="-m-1.5 p-1.5">
            <span className="sr-only">Chris White Rocks</span>
            <img alt="" src="/cw_rocks.png" className="h-8 w-auto" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {/* {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-white"
            >
              {item.name}
            </a>
          ))} */}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
    </header>
  );
}
