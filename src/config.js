var UserProfile = (function() {
    var email = "";
  
    var getEmail = function() {
      return email; 
    };
  
    var setEmail = function(em) {
      email = em;     
    };
  
    return {
      getEmail: getEmail,
      setEmail: setEmail
    }
  
  })();
  
  export default UserProfile;