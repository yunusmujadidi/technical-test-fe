interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  return (
    <div className="border-b m-2 p-2 gap-4">
      <input
        className="border p-2"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
