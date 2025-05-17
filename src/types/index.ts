
export enum UserRole {
  DONOR = "donor",
  REQUESTER = "requester",
  ADMIN = "admin"
}

export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-"
}

export enum RequestStatus {
  PENDING = "pending",
  MATCHED = "matched", 
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum UrgencyLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  location?: GeoLocation;
  bloodType?: BloodType;
  profilePicture?: string;
  lastDonationDate?: Date;
  createdAt: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  bloodType: BloodType;
  quantity: number;
  urgency: UrgencyLevel;
  location: GeoLocation;
  status: RequestStatus;
  notes?: string;
  createdAt: Date;
  expireAt?: Date;
}

export interface Donation {
  id: string;
  donorId: string;
  requestId: string;
  appointmentId?: string;
  status: RequestStatus;
  donationDate?: Date;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  donorId: string;
  requestId: string;
  locationId: string;
  date: Date;
  status: RequestStatus;
  notes?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: string;
  linkTo?: string;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: Date;
}

export interface DonationCenter {
  id: string;
  name: string;
  location: GeoLocation;
  contactNumber: string;
  operatingHours: string;
  isActive: boolean;
}
