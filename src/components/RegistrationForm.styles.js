export const registrationStyles = {
  container: {
    padding: '20px',
    backgroundColor: '#000',
    minHeight: 'calc(100vh - 64px)',
    color: '#FFD700',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: '40px',
    backgroundColor: '#121212',
    color: '#FFD700',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    color: '#FFD700',
    marginBottom: '30px',
    fontWeight: 'bold'
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
    '& .MuiInputLabel-root': { color: '#FFD700' },
    marginBottom: '20px'
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#FFD700',
    color: '#000',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#FFC107',
    },
    padding: '12px',
    fontSize: '16px'
  }
};