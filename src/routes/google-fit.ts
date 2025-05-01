import express from 'express';
import { fitness_v1 } from 'googleapis';
import { oauth2Client, fitness, SCOPES } from '../config/googleAuth';
import { checkGoogleFitAuth } from '../middleware/googleFitAuth';

const router = express.Router();

// Generate Google OAuth URL
router.get('/auth-url', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    include_granted_scopes: true
  });
  res.json({ url: authUrl });
});

// Handle Google OAuth callback
router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
      throw new Error('Authorization code is missing');
    }

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.redirect(`http://localhost:5173/dashboard?googleFitConnected=true`);
  } catch (error) {
    console.error('Google Fit callback error:', error);
    res.redirect(`http://localhost:5173/dashboard?error=google_fit_connection_failed`);
  }
});

// Get user's activity data
router.get('/activities', checkGoogleFitAuth, async (req, res) => {
  try {
    // Get last 7 days of activity data
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta',
          dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
        }],
        bucketByTime: { durationMillis: '86400000' }, // 1 day
        startTimeMillis: sevenDaysAgo.toString(),
        endTimeMillis: now.toString(),
      }
    } as fitness_v1.Params$Resource$Users$Dataset$Aggregate);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Google Fit activities:', error);
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      res.status(500).json({ error: 'Google OAuth credentials not configured. Please check your .env file.' });
    } else {
      res.status(500).json({ error: 'Failed to fetch activities. Make sure you are authenticated with Google Fit.' });
    }
  }
});

// Get user's body measurements
router.get('/body-metrics', checkGoogleFitAuth, async (req, res) => {
  try {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: 'com.google.weight',
            dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight'
          },
          {
            dataTypeName: 'com.google.height',
            dataSourceId: 'derived:com.google.height:com.google.android.gms:merge_height'
          }
        ],
        bucketByTime: { durationMillis: '86400000' }, // 1 day
        startTimeMillis: thirtyDaysAgo.toString(),
        endTimeMillis: now.toString(),
      }
    } as fitness_v1.Params$Resource$Users$Dataset$Aggregate);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Google Fit body metrics:', error);
    res.status(500).json({ error: 'Failed to fetch body metrics' });
  }
});

export default router;
