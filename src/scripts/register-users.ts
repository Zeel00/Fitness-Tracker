import axios, { AxiosError } from 'axios';

const users = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    password: "Password123!",
    gender: "male",
    age: 28,
    bodyType: "mesomorph",
    goals: ["muscle_gain", "strength"],
    currentWeight: 75,
    targetWeight: 80
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    password: "Password123!",
    gender: "female",
    age: 24,
    bodyType: "ectomorph",
    goals: ["weight_loss", "flexibility"],
    currentWeight: 65,
    targetWeight: 60
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    password: "Password123!",
    gender: "male",
    age: 32,
    bodyType: "endomorph",
    goals: ["weight_loss", "cardio"],
    currentWeight: 90,
    targetWeight: 80
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    password: "Password123!",
    gender: "female",
    age: 29,
    bodyType: "mesomorph",
    goals: ["muscle_tone", "endurance"],
    currentWeight: 58,
    targetWeight: 58
  },
  {
    name: "David Brown",
    email: "david.brown@example.com",
    password: "Password123!",
    gender: "male",
    age: 35,
    bodyType: "mesomorph",
    goals: ["strength", "power"],
    currentWeight: 82,
    targetWeight: 85
  },
  {
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    password: "Password123!",
    gender: "female",
    age: 27,
    bodyType: "ectomorph",
    goals: ["muscle_gain", "flexibility"],
    currentWeight: 52,
    targetWeight: 55
  },
  {
    name: "James Wilson",
    email: "james.wilson@example.com",
    password: "Password123!",
    gender: "male",
    age: 31,
    bodyType: "endomorph",
    goals: ["weight_loss", "muscle_tone"],
    currentWeight: 95,
    targetWeight: 85
  },
  {
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    password: "Password123!",
    gender: "female",
    age: 26,
    bodyType: "mesomorph",
    goals: ["endurance", "flexibility"],
    currentWeight: 62,
    targetWeight: 60
  },
  {
    name: "Robert Taylor",
    email: "robert.t@example.com",
    password: "Password123!",
    gender: "male",
    age: 33,
    bodyType: "mesomorph",
    goals: ["muscle_gain", "power"],
    currentWeight: 78,
    targetWeight: 83
  },
  {
    name: "Amy Lee",
    email: "amy.lee@example.com",
    password: "Password123!",
    gender: "female",
    age: 25,
    bodyType: "ectomorph",
    goals: ["muscle_tone", "strength"],
    currentWeight: 54,
    targetWeight: 56
  }
];

interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

async function registerUsers() {
  console.log('Starting user registration...');
  
  for (const user of users) {
    try {
      const response = await axios.post<RegisterResponse>('http://localhost:3001/api/auth/register', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`Successfully registered ${user.name} (${user.email})`);
      console.log('User ID:', response.data.user.id);
      console.log('-------------------');
    } catch (error) {
      console.error(`Failed to register ${user.name} (${user.email})`);
      if (error instanceof AxiosError && error.response) {
        console.error('Error:', error.response.data.error);
      } else {
        console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
      }
      console.log('-------------------');
    }
    
    // Add a small delay between registrations
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Registration process completed!');
}

registerUsers().catch(console.error);
