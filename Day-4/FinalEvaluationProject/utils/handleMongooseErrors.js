export const handleMongooseError = (err) => {
    // Duplicate key email already exists
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return {
        status: 400,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
      };
    }
  
    // Validation errors
    if (err.name === 'ValidationError') {
      const errors = {};
      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return {
        status: 400,
        message: 'Validation error',
        errors
      };
    }
  
    // Default fallback
    return {
      status: 500,
      message: 'Something went wrong. Please try again later.'
    };
  };
  