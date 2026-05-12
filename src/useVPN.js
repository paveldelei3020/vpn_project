import { useState } from 'react';

export const useVPN = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleBuyClick = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const userData = {
    name: "GenZ_Admin",
    email: "crypto_king@vpn.io",
    balance: "1,250 ₽",
    daysLeft: 24,
    status: "Premium"
  };

  return {
    isProfileOpen,
    toggleProfile,
    handleBuyClick,
    userData
  };
};