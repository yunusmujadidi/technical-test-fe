interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs border-2 border-white">
      {getInitials(name)}
    </div>
  );
};
