import React, { useEffect, useRef } from "react";

const YandexMap = ({ locations }) => {
  const mapRef = useRef(null); // Ссылка на карту
  const geoObjectsRef = useRef(null); // Ссылка на коллекцию объектов карты

  useEffect(() => {
    // Инициализация карты только один раз
    if (!mapRef.current) {
      const center = [43.271122, 46.263412]; // Начальные координаты

      mapRef.current = new window.ymaps.Map("YMapsID", {
        center: center,
        zoom: 17,
      });

      // Создаем коллекцию объектов и добавляем ее на карту
      geoObjectsRef.current = new window.ymaps.GeoObjectCollection();
      mapRef.current.geoObjects.add(geoObjectsRef.current);

      // Убираем ненужные контролы
      mapRef.current.controls.remove("geolocationControl");
      mapRef.current.controls.remove("searchControl");
      mapRef.current.controls.remove("trafficControl");
      mapRef.current.controls.remove("typeSelector");
      mapRef.current.controls.remove("zoomControl");
      mapRef.current.controls.remove("rulerControl");
    }
  }, []); // Карта инициализируется только один раз

  useEffect(() => {
    if (locations && locations.length && geoObjectsRef.current) {
      // Очищаем коллекцию объектов
      geoObjectsRef.current.removeAll();

      // Добавляем все метки из `locations`
      locations.forEach((loc) => {
        const placemark = new window.ymaps.Placemark(
          [loc.lat, loc.lon],
          {
            hintContent: loc.hint || "Метка", // Подсказка при наведении
            balloonContent: `
              <div>
                <strong>${loc.hint}</strong>
                <p>Координаты: ${loc.lat}, ${loc.lon}</p>
                <p>${loc.description || "Нет дополнительной информации"}</p>
              </div>
            `, // Контент балуна
          },
          {
            preset: "islands#redIcon", // Стиль иконки
            draggable: false,
          }
        );

        geoObjectsRef.current.add(placemark); // Добавляем метку в коллекцию
      });

      // Центрируем карту, если есть хотя бы одна метка
      if (locations.length > 0) {
        const lastLocation = locations[locations.length - 1];
        mapRef.current.setCenter([lastLocation.lat, lastLocation.lon], 17);
      }
    }
  }, [locations]); // Обновляем метки при изменении списка локаций

  return (
    <div
      id="YMapsID"
      style={{ width: "100%", height: "400px" }} // Размер контейнера карты
    ></div>
  );
};

export default YandexMap;
