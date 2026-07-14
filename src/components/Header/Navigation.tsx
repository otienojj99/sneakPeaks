import NavigationItem from "./NavigationItem";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Collections",
    href: "#collections",
  },
  {
    label: "Featured",
    href: "#featured",
  },
  {
    label: "About",
    href: "#about",
  },
];

const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <NavigationItem key={link.label} {...link} />
      ))}
    </nav>
  );
};

export default Navigation;
