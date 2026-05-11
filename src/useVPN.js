// useVPN.js
export const useVPN = () => {
  const handleBuyClick = () => {
    console.log("Переход к категориям товаров...");
    window.location.href = "#categories";
  };

  return {
    handleBuyClick
  };
};