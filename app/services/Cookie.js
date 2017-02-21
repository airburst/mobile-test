const SessionCookie = () => {
    const cookieDiv = document.getElementById('sessionId');
    if (!cookieDiv) { return null }
    return 'JSESSIONID=' + cookieDiv.getAttribute('data-sessionid');
}

export default SessionCookie;