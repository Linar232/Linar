import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    // Рендерим компонент с текстом "Click Me"
    render(<Button text="Click Me" />);
    
    // Проверяем, что текст на кнопке отображается корректно
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    // Создаем мок-функцию для onClick
    const handleClick = jest.fn();

    // Рендерим компонент с обработчиком onClick
    render(<Button text="Click Me" onClick={handleClick} />);

    // Находим кнопку и симулируем клик
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);

    // Проверяем, что обработчик был вызван один раз
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('button is disabled when disabled prop is true', () => {
    // Рендерим компонент с disabled=true
    render(<Button text="Click Me" disabled={true} />);

    // Находим кнопку и проверяем, что она отключена
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  test('button is not clickable when disabled', () => {
    // Создаем мок-функцию для onClick
    const handleClick = jest.fn();

    // Рендерим компонент с disabled=true и обработчиком onClick
    render(<Button text="Click Me" onClick={handleClick} disabled={true} />);

    // Находим кнопку и симулируем клик
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);

    // Проверяем, что обработчик не был вызван
    expect(handleClick).not.toHaveBeenCalled();
  });
});