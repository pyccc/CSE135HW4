// window.onload event for Javascript to run after HTML
// because this Javascript is injected into the document head
window.addEventListener('load', () => {
    let user_agent = navigator.userAgent;
    localStorage.setItem("user_agent", user_agent);
    let user_language = navigator.language;
    localStorage.setItem("user_language", user_language);
    let cookies_on = navigator.cookieEnabled;
    localStorage.setItem("cookies_on", cookies_on);
    let Width = window.screen.width;
    localStorage.setItem("s_width", Width);
    let Height = window.screen.height;
    localStorage.setItem("s_height", Height);
    let width = window.innerWidth;
    localStorage.setItem("w_width", width);
    let height = window.innerHeight;
    localStorage.setItem("w_height", height);
    let connection_type = navigator.connection.effectiveType;
    localStorage.setItem("connection_type", connection_type);

    // content after DOM load
    const zgRef = document.querySelector('zing-grid');
    const data = [
      {
        Element: 'User_Agent',
        Value: localStorage.getItem("user_agent"),
      },
      {
        Element: 'User_Language',
        Value: localStorage.getItem("user_language"),
      },
      {
        Element: 'Cookies_On',
        Value: localStorage.getItem("cookies_on"),
      },
      {
        Element: 'Screen_Width',
        Value: localStorage.getItem("s_width"),
      },
      {
        Element: 'Screen_Height',
        Value: localStorage.getItem("s_height"),
      },
      {
        Element: 'Window_Width',
        Value: localStorage.getItem("w_width"),
      },
      {
          Element: 'Window_Height',
          Value: localStorage.getItem("w_height"),
      },
      {
          Element: "Connection_Type",
          Value: localStorage.getItem("connection_type"),
      }
    ]; 
    zgRef.setData(data);
  });