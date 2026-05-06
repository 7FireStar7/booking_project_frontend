import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Дашборд (главная страница после входа).
 * Режим админа: переключатель, бейдж, дополнительная вкладка "Создать ресурс".
 * Календарь – только визуальная сетка с переключением месяцев.
 * Мои бронирования – статические примеры.
 * Создать ресурс – форма добавления ресурса (демо).
 */
function Dashboard() {
  const navigate = useNavigate();
  const [adminMode, setAdminMode] = useState(false); // Режим админа
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar', 'bookings', 'resources'

  // Состояние для календаря
  const [currentDate, setCurrentDate] = useState(new Date());

  // Состояние формы ресурса
  const [resourceForm, setResourceForm] = useState({
    name: '',
    description: '',
    type: '',
    capacity: '',
    is_active: true,
    available_from: '',
    available_until: ''
  });

  // Функция для выхода
  const handleLogout = () => {
    console.log('[Mock] Выход');
    alert('Демо-режим: выход');
    navigate('/');
  };

  // Переключение месяцев
  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  // Получение дней в месяце
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Первый день месяца (0 = воскресенье, но нам надо понедельник первым)
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Преобразуем: воскресенье (0) -> 6, понедельник (1) -> 0, и т.д.
  };

  // Генерация сетки календаря
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOffset = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const daysArray = [];
    // Дни предыдущего месяца
    for (let i = firstDayOffset - 1; i >= 0; i--) {
      daysArray.push({ type: 'prev', day: prevMonthDays - i });
    }
    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ type: 'current', day: i });
    }
    // Дни следующего месяца (чтобы заполнить сетку до 42 ячеек)
    const totalCells = Math.ceil(daysArray.length / 7) * 7;
    const remaining = totalCells - daysArray.length;
    for (let i = 1; i <= remaining; i++) {
      daysArray.push({ type: 'next', day: i });
    }

    // Разбивка по неделям
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }

    return (
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {daysArray.map((cell, idx) => (
            <div
              key={idx}
              className={`calendar-day ${cell.type !== 'current' ? 'empty' : ''}`}
            >
              {cell.day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Статические бронирования для демонстрации
  const demoBookings = [
    { id: 1, resource_name: 'Переговорная А', start_time: '2026-05-10T10:00:00', end_time: '2026-05-10T11:00:00', status: 'активно' },
    { id: 2, resource_name: 'Проектор', start_time: '2026-05-12T14:00:00', end_time: '2026-05-12T15:30:00', status: 'активно' },
    { id: 3, resource_name: 'Конференц-зал', start_time: '2026-05-15T09:00:00', end_time: '2026-05-15T12:00:00', status: 'активно' },
  ];

  const handleCancelBooking = (id) => {
    alert(`Демо: отмена бронирования ${id}`);
    console.log('[Mock] Отмена бронирования', id);
  };

  const handleResourceFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResourceForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateResource = (e) => {
    e.preventDefault();
    console.log('[Mock] Создание ресурса:', resourceForm);
    alert('Демо-режим: ресурс будет создан');
    // Здесь можно сбросить форму или оставить для демонстрации
  };

  // Список существующих ресурсов (заглушка)
  const demoResources = [
    { id: 1, name: 'Переговорная А', type: 'Комната', capacity: 8 },
    { id: 2, name: 'Проектор', type: 'Оборудование', capacity: null },
    { id: 3, name: 'Конференц-зал', type: 'Комната', capacity: 20 },
  ];

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Приветствуем, пользователь</h1>
          {adminMode && <span className="admin-badge">Админ</span>}
        </div>
        <div className="header-controls">
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={adminMode}
              onChange={(e) => setAdminMode(e.target.checked)}
            />
            Режим админа
          </label>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`dash-tab ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Календарь ресурсов
        </button>
        <button
          className={`dash-tab ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Мои бронирования
        </button>
        {adminMode && (
          <button
            className={`dash-tab ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Создать ресурс
          </button>
        )}
      </div>

      <div className="dashboard-content">
        {activeTab === 'calendar' && (
          <div className="calendar-container">
            <div className="calendar-nav">
              <button onClick={() => changeMonth(-1)}>← Предыдущий</button>
              <h3>
                {currentDate.toLocaleString('ru', { month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={() => changeMonth(1)}>Следующий →</button>
            </div>
            {renderCalendar()}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-list">
            {demoBookings.length === 0 ? (
              <p>У вас нет активных бронирований.</p>
            ) : (
              demoBookings.map(booking => (
                <div key={booking.id} className="booking-item">
                  <h4>{booking.resource_name}</h4>
                  <p><strong>Начало:</strong> {new Date(booking.start_time).toLocaleString()}</p>
                  <p><strong>Конец:</strong> {new Date(booking.end_time).toLocaleString()}</p>
                  <p><strong>Статус:</strong> {booking.status}</p>
                  <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>Отменить</button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'resources' && adminMode && (
          <div>
            <form onSubmit={handleCreateResource} className="resource-form">
              <div className="field">
                <label>Название ресурса *</label>
                <input
                  name="name"
                  value={resourceForm.name}
                  onChange={handleResourceFormChange}
                  required
                  placeholder="например, Переговорная Б"
                />
              </div>
              <div className="field">
                <label>Описание</label>
                <textarea
                  name="description"
                  value={resourceForm.description}
                  onChange={handleResourceFormChange}
                  rows="3"
                  placeholder="Необязательное описание"
                />
              </div>
              <div className="field">
                <label>Тип</label>
                <input
                  name="type"
                  value={resourceForm.type}
                  onChange={handleResourceFormChange}
                  placeholder="например, Комната, Оборудование"
                />
              </div>
              <div className="field">
                <label>Вместимость</label>
                <input
                  type="number"
                  name="capacity"
                  value={resourceForm.capacity}
                  onChange={handleResourceFormChange}
                  placeholder="Количество мест"
                />
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={resourceForm.is_active}
                    onChange={handleResourceFormChange}
                  />
                  {' '}Активен
                </label>
              </div>
              <div className="field">
                <label>Доступен с</label>
                <input
                  type="datetime-local"
                  name="available_from"
                  value={resourceForm.available_from}
                  onChange={handleResourceFormChange}
                />
              </div>
              <div className="field">
                <label>Доступен по</label>
                <input
                  type="datetime-local"
                  name="available_until"
                  value={resourceForm.available_until}
                  onChange={handleResourceFormChange}
                />
              </div>
              <button type="submit" className="submit-btn">Создать ресурс</button>
            </form>

            <div className="resource-list-demo">
              <h4>Существующие ресурсы (демо)</h4>
              <ul>
                {demoResources.map(res => (
                  <li key={res.id}>
                    <strong>{res.name}</strong> ({res.type || 'Нет типа'}) {res.capacity && `вместимость: ${res.capacity}`}
                    <div>
                      <button className="cancel-btn" style={{ background: '#43A047' }} onClick={() => alert(`Демо: редактировать ресурс ${res.id}`)}>Редактировать</button>
                      <button className="cancel-btn" onClick={() => alert(`Демо: удалить ресурс ${res.id}`)}>Удалить</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;