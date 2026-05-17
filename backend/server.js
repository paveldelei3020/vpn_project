import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',          
    host: 'localhost',
    database: 'genz_vpn',      
    password: 'Pirat_3020', 
    port: 5432,                
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Ошибка подключения к базе данных:', err.stack);
    }
    console.log('Успешное подключение к базе данных PostgreSQL!');
    release();
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }
        const newUser = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
            [email, password]
        );
        const userId = newUser.rows[0].id;
        await pool.query(
            'INSERT INTO subscriptions (user_id, plan_name, status) VALUES ($1, $2, $3)',
            [userId, 'Пробный', 'active']
        );
        res.json({ message: 'Регистрация прошла успешно! Создан пробный период.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password_hash = $2',
            [email, password]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Вход выполнен успешно!', user: { email } });
        } else {
            res.status(401).json({ message: 'Неверный email или пароль' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера при входе' });
    }
});

// 1. ПОЛУЧЕНИЕ ДАННЫХ ПРОФИЛЯ ИЗ БД
app.get('/get-profile', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    // ВСЕГДА возвращаем JSON, даже при ошибках!
    return res.status(400).json({ message: 'Email не указан' });
  }

  try {
    // 1. Ищем пользователя в базе данных
    const userResult = await pool.query('SELECT id, balance FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const userId = userResult.rows[0].id;
    const balance = userResult.rows[0].balance;

    // 2. Ищем его подписку
    const subResult = await pool.query('SELECT plan_name FROM subscriptions WHERE user_id = $1', [userId]);
    
    // Если записи в таблице подписок нет — не падаем, а просто ставим 'Пробный' тариф
    const subscription = subResult.rows.length > 0 ? subResult.rows[0].plan_name : 'Пробный';

    // Возвращаем строго валидный JSON объект
    res.json({ 
      email: email, 
      balance: balance, 
      subscription: subscription 
    });

  } catch (err) {
    console.error('Ошибка на сервере в get-profile:', err.message);
    // Даже при критической ошибке возвращаем JSON объект, чтобы фронтенд не ломался
    res.status(500).json({ message: 'Ошибка сервера при получении профиля: ' + err.message });
  }
});

// 2. ПОПОЛНЕНИЕ БАЛАНСА ИЛИ ПОКУПКА ТАРИФА
app.post('/update-balance', async (req, res) => {
  const { email, amount, planName } = req.body;

  console.log('=== ПОСТУПИЛ ЗАПРОС НА СЕРВЕР ===');
  console.log('Email:', email, 'Сумма:', amount, 'Тариф:', planName);

  if (!email) {
    return res.status(400).json({ message: 'Email не указан' });
  }

  try {
    const numericAmount = Number(amount);

    // 1. Сначала ищем ID пользователя по его Email
    const userFind = await pool.query('SELECT id, balance FROM users WHERE email = $1', [email]);
    if (userFind.rows.length === 0) {
      console.log('❌ Пользователь не найден в таблице users');
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const userId = userFind.rows[0].id;
    const currentBalance = userFind.rows[0].balance;

    // Проверяем на сервере: если мы списываем деньги (amount отрицательный), хватает ли их?
    if (numericAmount < 0 && currentBalance < Math.abs(numericAmount)) {
      console.log('❌ Недостаточно средств на стороне сервера');
      return res.status(400).json({ message: 'Недостаточно средств на балансе!' });
    }

    // 2. Обновляем баланс пользователя
    const updateBalanceResult = await pool.query(
      'UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance',
      [numericAmount, userId]
    );
    const newBalance = updateBalanceResult.rows[0].balance;
    console.log('✅ Баланс успешно обновлен. Новый баланс:', newBalance);

    let newSubscription = 'Пробный';
// 3. ОБНОВЛЕНИЕ ИЛИ СОЗДАНИЕ ТАРИФА
    if (planName) {
      // Проверяем, есть ли запись в subscriptions для этого email через подзапрос
      const subCheck = await pool.query(
        'SELECT id FROM subscriptions WHERE user_id = (SELECT id FROM users WHERE email = $1)', 
        [email]
      );

      if (subCheck.rows.length > 0) {
        // Если запись есть — обновляем
        const updateSub = await pool.query(
          'UPDATE subscriptions SET plan_name = $1 WHERE user_id = (SELECT id FROM users WHERE email = $2) RETURNING plan_name',
          [planName, email]
        );
        newSubscription = updateSub.rows[0].plan_name;
      } else {
        // Если записи нет — создаем новую, забирая ID напрямую из users по email!
        const insertSub = await pool.query(
          'INSERT INTO subscriptions (user_id, plan_name) VALUES ((SELECT id FROM users WHERE email = $1), $2) RETURNING plan_name',
          [email, planName]
        );
        newSubscription = insertSub.rows[0].plan_name;
      }
      console.log('✅ Тариф успешно записан в базу:', newSubscription);
    } else {
      // Если просто пополняли баланс, возвращаем текущий тариф
      const currentSub = await pool.query('SELECT plan_name FROM subscriptions WHERE user_id = $1', [userId]);
      if (currentSub.rows.length > 0) {
        newSubscription = currentSub.rows[0].plan_name;
      }
    }

    // Возвращаем ответ на фронтенд
    return res.json({
      message: planName ? `Тариф "${planName}" успешно оформлен!` : 'Баланс успешно обновлен',
      balance: newBalance,
      subscription: newSubscription
    });

  } catch (err) {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА НА СЕРВЕРЕ:', err.message);
    return res.status(500).json({ message: 'Ошибка сервера: ' + err.message });
  }
});

app.listen(PORT, () => console.log(`Сервер бэкенда запущен на http://localhost:${PORT}`));