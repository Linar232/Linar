// src/components/RegistrationForm.styles.js
export const registrationStyles = {
    container: {
      padding: '20px',
      backgroundColor: '#000',
      minHeight: 'calc(100vh - 64px)',
      color: '#FFD700',
      textAlign: 'center',
    },
    title: {
      color: '#FFD700',
      marginBottom: '20px',
    },
    form: {
      maxWidth: '400px',
      margin: '0 auto',
    },
    textField: {
      input: { color: '#FFD700' },
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#FFD700' },
        '&:hover fieldset': { borderColor: '#FFD700' },
        '&.Mui-focused fieldset': { borderColor: '#FFD700' },
      },
    },
    button: {
      marginTop: '20px',
      backgroundColor: '#FFD700',
      color: '#000',
      '&:hover': {
        backgroundColor: '#FFC107',
      },
    },
  };