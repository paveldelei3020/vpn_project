// useVPN.js
export const useVPN = () => {
  const handleBuyClick = () => {
    // В будущем здесь будет переход на страницу оплаты или категорий
    console.log("Переход к категориям товаров...");
    window.location.href = "#categories"; // Пока просто якорь или заглушка
  };

  return {
    handleBuyClick
  };
};