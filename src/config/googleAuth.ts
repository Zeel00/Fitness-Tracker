import { google } from 'googleapis';

// Initialize OAuth2 client
export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/google-fit/callback'
);

// Set default credentials for all requests
google.options({
  auth: oauth2Client
});

// Initialize Google Fit API
export const fitness = google.fitness('v1');

// Scopes for Google Fit API
export const SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read'
];
