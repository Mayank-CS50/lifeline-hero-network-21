
import { 
  User, 
  BloodRequest, 
  Donation, 
  Appointment, 
  Notification, 
  Achievement,
  UserAchievement,
  DonationCenter,
  UserRole,
  BloodType,
  RequestStatus,
  UrgencyLevel
} from "../types";

// Mock data - In a real app, this would be fetched from a backend API
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: UserRole.DONOR,
    phoneNumber: "555-123-4567",
    bloodType: BloodType.O_POSITIVE,
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA"
    },
    lastDonationDate: new Date("2023-01-15"),
    profilePicture: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date("2022-05-10")
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: UserRole.DONOR,
    phoneNumber: "555-987-6543",
    bloodType: BloodType.A_NEGATIVE,
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      address: "456 Park Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94108",
      country: "USA"
    },
    profilePicture: "https://i.pravatar.cc/150?img=2",
    createdAt: new Date("2022-06-12")
  },
  {
    id: "3",
    name: "General Hospital",
    email: "hospital@example.com",
    role: UserRole.REQUESTER,
    phoneNumber: "555-789-0123",
    location: {
      latitude: 37.7844,
      longitude: -122.4352,
      address: "789 Medical Dr",
      city: "San Francisco",
      state: "CA",
      zipCode: "94109",
      country: "USA"
    },
    profilePicture: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date("2022-04-02")
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@example.com",
    role: UserRole.ADMIN,
    phoneNumber: "555-456-7890",
    profilePicture: "https://i.pravatar.cc/150?img=4",
    createdAt: new Date("2022-01-01")
  }
];

const mockRequests: BloodRequest[] = [
  {
    id: "1",
    requesterId: "3",
    requesterName: "General Hospital",
    bloodType: BloodType.O_NEGATIVE,
    quantity: 3,
    urgency: UrgencyLevel.HIGH,
    location: {
      latitude: 37.7844,
      longitude: -122.4352,
      address: "789 Medical Dr",
      city: "San Francisco",
      state: "CA",
      zipCode: "94109",
      country: "USA"
    },
    status: RequestStatus.PENDING,
    notes: "Needed for emergency surgery",
    createdAt: new Date("2023-05-01"),
    expireAt: new Date("2023-05-03")
  },
  {
    id: "2",
    requesterId: "3",
    requesterName: "General Hospital",
    bloodType: BloodType.A_POSITIVE,
    quantity: 2,
    urgency: UrgencyLevel.MEDIUM,
    location: {
      latitude: 37.7844,
      longitude: -122.4352,
      address: "789 Medical Dr",
      city: "San Francisco",
      state: "CA",
      zipCode: "94109",
      country: "USA"
    },
    status: RequestStatus.MATCHED,
    createdAt: new Date("2023-04-28")
  },
  {
    id: "3",
    requesterId: "3",
    requesterName: "General Hospital",
    bloodType: BloodType.AB_POSITIVE,
    quantity: 1,
    urgency: UrgencyLevel.LOW,
    location: {
      latitude: 37.7844,
      longitude: -122.4352,
      address: "789 Medical Dr",
      city: "San Francisco",
      state: "CA",
      zipCode: "94109",
      country: "USA"
    },
    status: RequestStatus.COMPLETED,
    createdAt: new Date("2023-04-15")
  }
];

const mockDonations: Donation[] = [
  {
    id: "1",
    donorId: "1",
    requestId: "3",
    appointmentId: "1",
    status: RequestStatus.COMPLETED,
    donationDate: new Date("2023-04-17"),
    createdAt: new Date("2023-04-15")
  },
  {
    id: "2",
    donorId: "2",
    requestId: "2",
    appointmentId: "2",
    status: RequestStatus.SCHEDULED,
    createdAt: new Date("2023-04-29")
  }
];

const mockAppointments: Appointment[] = [
  {
    id: "1",
    donorId: "1",
    requestId: "3",
    locationId: "1",
    date: new Date("2023-04-17T10:00:00"),
    status: RequestStatus.COMPLETED,
    notes: "Please arrive 15 minutes early to fill out paperwork",
    createdAt: new Date("2023-04-15")
  },
  {
    id: "2",
    donorId: "2",
    requestId: "2",
    locationId: "1",
    date: new Date("2023-05-05T14:00:00"),
    status: RequestStatus.SCHEDULED,
    createdAt: new Date("2023-04-29")
  }
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Urgent Blood Request",
    message: "There is an urgent need for O+ blood type in your area. Can you help?",
    read: false,
    type: "urgent_request",
    linkTo: "/requests/1",
    createdAt: new Date("2023-05-01")
  },
  {
    id: "2",
    userId: "1",
    title: "Donation Scheduled",
    message: "Your donation appointment has been confirmed for May 5, 2023 at 2:00 PM",
    read: true,
    type: "appointment",
    linkTo: "/appointments/2",
    createdAt: new Date("2023-04-29")
  },
  {
    id: "3",
    userId: "3",
    title: "Donor Matched",
    message: "A donor has been matched to your blood request",
    read: false,
    type: "match",
    linkTo: "/requests/2",
    createdAt: new Date("2023-04-29")
  }
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Time Donor",
    description: "Completed your first blood donation",
    icon: "trophy",
    criteria: "Complete 1 donation"
  },
  {
    id: "2",
    name: "Lifesaver",
    description: "Donated blood 5 times",
    icon: "heart",
    criteria: "Complete 5 donations"
  },
  {
    id: "3",
    name: "Regular Hero",
    description: "Donated blood 10 times",
    icon: "medal",
    criteria: "Complete 10 donations"
  },
  {
    id: "4",
    name: "Emergency Responder",
    description: "Responded to an urgent blood request",
    icon: "pulse",
    criteria: "Respond to a high urgency request"
  }
];

const mockUserAchievements: UserAchievement[] = [
  {
    id: "1",
    userId: "1",
    achievementId: "1",
    earnedAt: new Date("2023-01-15")
  },
  {
    id: "2",
    userId: "2",
    achievementId: "1",
    earnedAt: new Date("2022-11-20")
  },
  {
    id: "3",
    userId: "2",
    achievementId: "4",
    earnedAt: new Date("2023-02-05")
  }
];

const mockDonationCenters: DonationCenter[] = [
  {
    id: "1",
    name: "Downtown Blood Center",
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      address: "123 Medical Plaza",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      country: "USA"
    },
    contactNumber: "555-123-7890",
    operatingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
    isActive: true
  },
  {
    id: "2",
    name: "Westside Donation Clinic",
    location: {
      latitude: 37.7699,
      longitude: -122.4827,
      address: "456 Health Blvd",
      city: "San Francisco",
      state: "CA",
      zipCode: "94122",
      country: "USA"
    },
    contactNumber: "555-456-7890",
    operatingHours: "Mon-Sat: 9AM-5PM",
    isActive: true
  }
];

// API service with methods for interacting with data
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    return user;
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate getting user from localStorage or token
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const savedUserId = localStorage.getItem("currentUserId");
    if (!savedUserId) return null;
    
    const user = mockUsers.find(u => u.id === savedUserId);
    return user || null;
  },
  
  // Users
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers;
  },
  
  getUserById: async (userId: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = mockUsers.find(u => u.id === userId);
    return user || null;
  },
  
  updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
    return mockUsers[userIndex];
  },
  
  // Blood Requests
  getBloodRequests: async (): Promise<BloodRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRequests;
  },
  
  getBloodRequestById: async (requestId: string): Promise<BloodRequest | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const request = mockRequests.find(r => r.id === requestId);
    return request || null;
  },
  
  createBloodRequest: async (data: Omit<BloodRequest, "id" | "createdAt">): Promise<BloodRequest> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRequest: BloodRequest = {
      ...data,
      id: `req-${Date.now().toString()}`,
      createdAt: new Date()
    };
    
    mockRequests.push(newRequest);
    return newRequest;
  },
  
  updateBloodRequest: async (requestId: string, data: Partial<BloodRequest>): Promise<BloodRequest> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const requestIndex = mockRequests.findIndex(r => r.id === requestId);
    if (requestIndex === -1) {
      throw new Error("Request not found");
    }
    
    mockRequests[requestIndex] = { ...mockRequests[requestIndex], ...data };
    return mockRequests[requestIndex];
  },
  
  // Donations
  getDonations: async (): Promise<Donation[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDonations;
  },
  
  getDonationsByDonor: async (donorId: string): Promise<Donation[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDonations.filter(d => d.donorId === donorId);
  },
  
  getDonationsByRequest: async (requestId: string): Promise<Donation[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDonations.filter(d => d.requestId === requestId);
  },
  
  createDonation: async (data: Omit<Donation, "id" | "createdAt">): Promise<Donation> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newDonation: Donation = {
      ...data,
      id: `don-${Date.now().toString()}`,
      createdAt: new Date()
    };
    
    mockDonations.push(newDonation);
    return newDonation;
  },
  
  // Appointments
  getAppointments: async (): Promise<Appointment[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAppointments;
  },
  
  getAppointmentsByDonor: async (donorId: string): Promise<Appointment[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAppointments.filter(a => a.donorId === donorId);
  },
  
  createAppointment: async (data: Omit<Appointment, "id" | "createdAt">): Promise<Appointment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now().toString()}`,
      createdAt: new Date()
    };
    
    mockAppointments.push(newAppointment);
    return newAppointment;
  },
  
  updateAppointment: async (appointmentId: string, data: Partial<Appointment>): Promise<Appointment> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const appointmentIndex = mockAppointments.findIndex(a => a.id === appointmentId);
    if (appointmentIndex === -1) {
      throw new Error("Appointment not found");
    }
    
    mockAppointments[appointmentIndex] = { ...mockAppointments[appointmentIndex], ...data };
    return mockAppointments[appointmentIndex];
  },
  
  // Notifications
  getNotifications: async (userId: string): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNotifications.filter(n => n.userId === userId);
  },
  
  markNotificationAsRead: async (notificationId: string): Promise<Notification> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const notificationIndex = mockNotifications.findIndex(n => n.id === notificationId);
    if (notificationIndex === -1) {
      throw new Error("Notification not found");
    }
    
    mockNotifications[notificationIndex].read = true;
    return mockNotifications[notificationIndex];
  },
  
  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAchievements;
  },
  
  getUserAchievements: async (userId: string): Promise<{ achievement: Achievement, earnedAt: Date }[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userAchievements = mockUserAchievements.filter(ua => ua.userId === userId);
    
    return userAchievements.map(ua => {
      const achievement = mockAchievements.find(a => a.id === ua.achievementId)!;
      return {
        achievement,
        earnedAt: ua.earnedAt
      };
    });
  },
  
  // Donation Centers
  getDonationCenters: async (): Promise<DonationCenter[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDonationCenters;
  },
  
  getDonationCenterById: async (centerId: string): Promise<DonationCenter | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const center = mockDonationCenters.find(c => c.id === centerId);
    return center || null;
  }
};
