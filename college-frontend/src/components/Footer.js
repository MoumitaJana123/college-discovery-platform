


import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-6 mb-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
        <p className="text-slate-400 text-sm font-medium">
          © 2026 UniSelect Platform • Track B Product Execution
        </p>
      </div>
    </footer>
  );
};

export default Footer;
