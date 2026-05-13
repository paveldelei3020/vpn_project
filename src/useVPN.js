import { useState } from 'react';

export const useVPN = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  // Состояние текущей страницы
  const [currentPage, setCurrentPage] = useState('home'); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Функция навигации
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Всегда возвращаемся в начало страницы при переходе
    closeMenu(); // Закрываем меню при переходе
  };

  const handlePlanClick = (planName) => {
    setLoadingPlan(planName);
    setTimeout(() => setLoadingPlan(null), 1500);
  };

  const userData = {
    name: "User_GZ",
    status: "Premium",
    balance: "1,250 ₽"
  };

  const news = [
    { id: 1, title: "Новые узлы в Дубае!", date: "Сегодня" },
    { id: 2, title: "Обновление протокола WireGuard", date: "Вчера" }
  ];

  const changelog = [
    {
      version: "1.2.0",
      date: "14 Мая, 2026",
      type: "VPN",
      title: "Протокол Turbo-Z",
      description: "Внедрен новый протокол шифрования, снижающий пинг в играх на 30%.",
      changes: ["Добавлены сервера: Токио, Сеул", "Оптимизация потребления батареи"]
    },
    {
      version: "1.1.5",
      date: "10 Мая, 2026",
      type: "Сайт",
      title: "Интерфейс будущего",
      description: "Полное обновление дизайна главной страницы и системы навигации.",
      changes: ["Добавлено контекстное меню в стиле GitHub", "Улучшена анимация карточек"]
    }
  ];

  return {
    currentPage,
    navigateTo,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    loadingPlan,
    handlePlanClick,
    userData,
    news,
    changelog
  };
};