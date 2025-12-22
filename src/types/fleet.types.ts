// Fleet-related types for the fleet management application
// src/types/fleet.types.ts

import { UUID, DateString } from './base.types';

export interface FleetManager {
    userId: UUID;
    name: string;
    email?: string;
    phone?: string;
}

export interface Fleet {
    id: UUID;
    name: string;
    creationDate: DateString;
    manager: FleetManager;
    vehicleCount: number;
}

export interface CreateFleetDto {
    name: string;
    managerUserId: UUID;
}

export interface UpdateFleetDto {
    name?: string;
    managerUserId?: UUID;
}

export interface FleetStatistics {
    fleetId: UUID;
    totalVehicles: number;
    activeVehicles: number;
    inactiveVehicles: number;
    totalDrivers: number;
    activeDrivers: number;
    ongoingTrips: number;
    totalTripsToday: number;
    totalMileageToday: number;
    maintenanceAlerts: number;
    geofenceViolations: number;
}

export interface FleetFilters {
    search?: string;
    managerId?: UUID;
    fromDate?: DateString;
    toDate?: DateString;
}