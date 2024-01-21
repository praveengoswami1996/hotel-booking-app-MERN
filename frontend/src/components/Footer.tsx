const Footer = () => {
  return (
    <footer className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
            BookMyHotel.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
