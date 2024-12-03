import React, { useState } from "react";
import { Input, Button, Form, message, List, Tooltip } from "antd";
import YandexMap from "../components/YandexMap"; // Подключаем компонент карты
import moment from "moment"; // Для обработки даты
import tutorialVideo from "./video.mp4";
const Pages1 = () => {
  const [formData, setFormData] = useState([]); // Для хранения данных о пользователях
  const [locations, setLocations] = useState([]); // Для хранения всех локаций
  const [address, setAddress] = useState(""); // Для хранения адреса
  const [location, setLocation] = useState(null); // Для текущей геолокации

  // Обработчик отправки формы
  const handleFormSubmit = (values) => {
    if (!location) {
      message.error("Геолокация не задана!");
      return;
    }

    // Добавляем нового пользователя в список
    const userData = { ...values, address, location };
    setFormData([...formData, userData]);

    // Добавляем локацию в массив
    setLocations([
      ...locations,
      {
        lat: location.lat,
        lon: location.lon,
        hint: `${values.firstName} ${values.lastName}`,
        description: `Адрес: ${address}`,
      },
    ]);

    message.success("Пользователь добавлен!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Контейнер для формы */}
        <div style={{ width: "45%" }}>
          <h1>Добавление Пользователя</h1>
          <Form onFinish={handleFormSubmit}>
            <Form.Item label="Фамилия" name="lastName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Имя" name="firstName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Адрес" rules={[{ required: false }]}>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>
            <Form.Item
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Координаты&nbsp;
              <Tooltip
                title={
                  <video width="240" controls>
                    <source
                      src={tutorialVideo} // Замените на ваш URL
                      type="video/mp4"
                    />
                    Ваш браузер не поддерживает видео.
                  </video>
                }
                placement="top"
                trigger="click"
              >
                <Button type="link" style={{ padding: 0 }}>
                  Как найти координаты?
                </Button>
              </Tooltip>
            </div>
          }
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Пример: 43.271122, 45.263412"
            onChange={(e) => {
              const [lat, lon] = e.target.value.split(",").map(Number);
              if (!isNaN(lat) && !isNaN(lon)) {
                setLocation({ lat, lon });
              }
            }}
          />
            <a href="https://yandex.ru/maps/?ll=45.265973%2C43.272311&z=16.02" target="_blank">Найти координаты</a>
        </Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form>
        </div>

        {/* Список пользователей */}
        <div style={{ width: "45%", maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
          <h2>Добавленные пользователи</h2>
          <List
            itemLayout="horizontal"
            dataSource={formData}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  title={`${user.firstName} ${user.lastName}`}
                  description={`Координаты: ${user.location.lat}, ${user.location.lon}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Карта */}
      <div style={{ marginTop: "20px" }}>
        <YandexMap locations={locations} />
      </div>
    </div>
  );
};

export default Pages1;
