import { Request, Response, NextFunction } from 'express';
import { oauth2Client } from '../config/googleAuth';

export const checkGoogleFitAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = oauth2Client.credentials;
    if (!credentials || !credentials.access_token) {
      return res.status(401).json({ error: 'Google Fit not authenticated. Please connect your Google Fit account.' });
    }

    // Check if token is expired and refresh if needed
    if (credentials.expiry_date && credentials.expiry_date < Date.now()) {
      try {
        // Use getAccessToken instead of refreshToken
        const { token } = await oauth2Client.getAccessToken();
        if (token) {
          oauth2Client.setCredentials({ ...credentials, access_token: token });
        } else {
          return res.status(401).json({ error: 'Google Fit authentication expired. Please reconnect your account.' });
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return res.status(401).json({ error: 'Failed to refresh authentication. Please reconnect your Google Fit account.' });
      }
    }

    next();
  } catch (error) {
    console.error('Google Fit auth check error:', error);
    res.status(401).json({ error: 'Google Fit authentication error' });
  }
};
