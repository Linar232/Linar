import { createSlice } from '@reduxjs/toolkit';

// Вынесена отдельно для повторного использования
const initialStateTemplate = {
  isLoggedIn: false,
  user: null,
  roles: ['admin', 'user'],
  _hydrated: true
};

const getInitialState = () => {
  // Серверный рендеринг (SSR)
  if (typeof window === 'undefined') {
    return { ...initialStateTemplate };
  }

  try {
    const authData = localStorage.getItem('auth');
    if (!authData) return { ...initialStateTemplate };

    const parsedData = JSON.parse(authData);
    
    // Проверка блокировки пользователя
    if (parsedData.isBlocked) {
      localStorage.removeItem('auth');
      return { ...initialStateTemplate };
    }

    return {
      ...initialStateTemplate,
      isLoggedIn: true,
      user: {
        ...parsedData,
        // Устанавливаем цвет аватарки по роли
        avatarColor: parsedData.role === 'admin' ? '#ff0000' : '#FFD700',
        // Защита от отсутствующих полей
        isBlocked: parsedData.isBlocked || false
      }
    };
  } catch (e) {
    console.error('Ошибка парсинга данных аутентификации:', e);
    localStorage.removeItem('auth');
    return { ...initialStateTemplate };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login: {
      reducer(state, action) {
        const userData = action.payload;
        
        if (userData.isBlocked) {
          throw new Error('Ваш аккаунт заблокирован');
        }
        
        const userWithAvatar = {
          ...userData,
          avatarColor: userData.role === 'admin' ? '#ff0000' : '#FFD700'
        };
        
        state.isLoggedIn = true;
        state.user = userWithAvatar;
        
        // Безопасное сохранение в localStorage
        try {
          localStorage.setItem('auth', JSON.stringify(userWithAvatar));
        } catch (e) {
          console.error('Ошибка сохранения в localStorage:', e);
        }
      },
      prepare(payload) {
        // Удаляем пароль из payload
        const { password, ...rest } = payload;
        return { payload: rest };
      }
    },
    
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      
      try {
        localStorage.removeItem('auth');
      } catch (e) {
        console.error('Ошибка очистки localStorage:', e);
      }
    },
    
    updateUser: {
      reducer(state, action) {
        if (!state.user) return;

        // Защищенные поля, которые нельзя изменить
        const protectedFields = {
          id: state.user.id,
          role: state.user.role,
          isBlocked: state.user.isBlocked,
          avatarColor: state.user.role === 'admin' ? '#ff0000' : '#FFD700'
        };

        const updatedUser = {
          ...state.user,
          ...action.payload,
          ...protectedFields // Перезаписываем защищенные поля
        };

        // Валидация email
        if (updatedUser.email && !/^\S+@\S+\.\S+$/.test(updatedUser.email)) {
          console.error('Некорректный email');
          return;
        }

        state.user = updatedUser;

        try {
          localStorage.setItem('auth', JSON.stringify(updatedUser));
        } catch (e) {
          console.error('Ошибка обновления localStorage:', e);
        }
      },
      prepare(payload) {
        // Очищаем payload от undefined/пустых значений
        const cleanPayload = Object.entries(payload).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});
        
        return { payload: cleanPayload };
      }
    },
    
    blockUser: {
      reducer(state, action) {
        if (state.user?.id === action.payload.userId) {
          state.isLoggedIn = false;
          state.user = null;
          try {
            localStorage.removeItem('auth');
          } catch (e) {
            console.error('Ошибка блокировки пользователя:', e);
          }
        }
      },
      prepare(userId) {
        return { payload: { userId } };
      }
    },
    
    hydrateAuth(state) {
      if (!state._hydrated) {
        const initialState = getInitialState();
        state.isLoggedIn = initialState.isLoggedIn;
        state.user = initialState.user;
        state._hydrated = true;
      }
    }
  }
});

// Селекторы
export const selectIsAuthenticated = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectUserField = (field) => (state) => state.auth.user?.[field];
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectIsBlocked = (state) => state.auth.user?.isBlocked || false;

// Экспорт действий
export const { 
  login, 
  logout, 
  updateUser, 
  blockUser, 
  hydrateAuth 
} = authSlice.actions;

export default authSlice.reducer;