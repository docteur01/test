// Driver-related types for the fleet management application
// src/types/driver.types.ts
import { UUID } from './base.types';

export interface DriverUserProfile {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

export interface AssignedVehicle {
    vehicleId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    type?: string;
    imageUrl?: string;
}

export interface Driver {
    userId: UUID;
    licenceNumber: string;
    status: boolean;
    assignedVehicle?: AssignedVehicle;
    userProfile: DriverUserProfile;
}

export interface CreateDriverDto {
    userId: UUID;
    licenceNumber: string;
    status?: boolean;
}

export interface UpdateDriverDto {
    licenceNumber?: string;
    status?: boolean;
}

export interface AssignVehicleDto {
    vehicleId: UUID;
}

export interface DriverFilters {
    status?: boolean;
    search?: string;
    hasVehicle?: boolean;
    fleetId?: UUID;
}

export interface DriverStatistics {
    driverId: UUID;
    totalTrips: number;
    totalDistance: number;
    totalDrivingTime: number;
    averageSpeed: number;
    geofenceViolations: number;
    lastTripDate?: string;
    safetyScore?: number;
}

export interface DriverActivity {
    driverId: UUID;
    currentStatus: 'idle' | 'driving' | 'on-break' | 'offline';
    currentTripId?: UUID;
    lastLocation?: {
        latitude: number;
        longitude: number;
        timestamp: string;
    };
    todayTrips: number;
    todayDistance: number;
    todayDrivingTime: number;
}