import React from 'react'

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
      {/* Навигация */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">V</div>
          <span className="text-xl font-bold tracking-tight">SkyVPN</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition">Преимущества</a>
          <a href="#pricing" className="hover:text-white transition">Тарифы</a>
          <a href="#servers" className="hover:text-white transition">Сервера</a>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-400 transition">
          Личный кабинет
        </button>
      </nav>

      {/* Hero-секция */}
      <header className="max-w-5xl mx-auto pt-20 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Твой интернет. 
 Твои правила.
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Безопасный доступ к любому контенту на максимальной скорости. Шифрование военного уровня в один клик.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all">
            Начать бесплатно
          </button>
          <button className="bg-slate-800 px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition">
            Узнать больше
          </button>
        </div>
      </header>

      {/* Сетка тарифов */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Тариф 1 */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 transition">
            <h3 className="text-slate-400 font-medium mb-2">Старт</h3>
            <div className="text-3xl font-bold mb-6">0 ₽ <span className="text-sm font-normal opacity-50">/мес</span></div>
            <ul className="space-y-4 text-sm text-slate-300 mb-8">
              <li>• 1 локация (Нидерланды)</li>
              <li>• Лимит 2 ГБ в день</li>
              <li>• Обычная скорость</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">Выбрать</button>
          </div>

          {/* Тариф 2 - Акцентный */}
          <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl shadow-blue-500/20 scale-105">
            <h3 className="text-blue-100 font-medium mb-2">Премиум</h3>
            <div className="text-3xl font-bold mb-6">299 ₽ <span className="text-sm font-normal opacity-80">/мес</span></div>
            <ul className="space-y-4 text-sm text-blue-50/80 mb-8">
              <li>• 50+ стран мира</li>
              <li>• Безлимитный трафик</li>
              <li>• 4K стриминг без задержек</li>
              <li>• 5 устройств одновременно</li>
            </ul>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition">Купить сейчас</button>
          </div>

          {/* Тариф 3 */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 transition">
            <h3 className="text-slate-400 font-medium mb-2">Годовой</h3>
            <div className="text-3xl font-bold mb-6">199 ₽ <span className="text-sm font-normal opacity-50">/мес</span></div>
            <ul className="space-y-4 t
            ext-sm text-slate-300 mb-8">
              <li>• Все функции Премиум</li>
              <li>• Экономия 40%</li>
              <li>• Приоритетная поддержка</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">Выбрать</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App