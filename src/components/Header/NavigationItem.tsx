interface NavigationItemProps {
  label: string;
  href: string;
}

const NavigationItem = ({ label, href }: NavigationItemProps) => {
  return (
    <a
      href={href}
      className="font-body text-sm font-medium hover-underline text-secondary-ink transition-colors hover:text-blaze"
    >
      {label}
    </a>
  );
};

export default NavigationItem;
