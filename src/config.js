var UserProfile = (function() {
    var email = "";
  
    var getEmail = function() {
      return email; 
    };
  
    var setEmail = function(email) {
      email = email;     
    };
  
    return {
      getEmail: getEmail,
      setEmail: setEmail
    }
  
  })();
  
  export default UserProfile;