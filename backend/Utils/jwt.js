

export const generateCookies = async(user,res) => {
    const token = user.getJwtToken();
    const cookieName = user.role === 'admin' ? 'admin_token' : 'client_token';

    return res.cookie(cookieName, token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Production' ? true : false,
        sameSite: process.env.NODE_ENV === 'Production' ? 'None' : 'Lax',
    }).status(200).json({
        success: true,
        message: `${user.role} logged in successfully`,
        user,
        token,
    });
}