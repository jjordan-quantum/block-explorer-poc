exports.Logger = (function() {
  
  const info = (message) => {
    console.log(`${new Date().toISOString()} INFO ${message}`);
  }
  
  const error = (message, e) => {
    console.log(`${new Date().toISOString()} ERROR ${message}`);
    console.log(`${new Date().toISOString()} ERROR ${e.toString()}`);
  }
  
  return {
    info,
    error,
  }
})();