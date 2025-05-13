import { defaults } from 'jest-config';

export default {
  testEnvironment: 'jsdom', // Окружение для тестов
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Настройка после загрузки среды тестирования
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Игнорирование стилей
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Используем Babel для трансформации кода
  },
  haste: {
    throwOnModuleCollision: false, // Отключение ошибок при коллизии имен модулей
  },
};