// Trip-related types for the fleet management application
// src/types/trip.types.ts

import { UUID, DateString, TimeString, VehicleType, Coordinates, DateFilter } from './base.types';

export interface RoutePoint extends Coordinates {
    routeId: UUID;
}

export interface Route {
    routeId: UUID;
    startPoint: Coordinates;
    endPoint: Coordinates;
    distance?: number;
    estimatedDuration?: number;
}

export enum TripStatus {
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    PAUSED = 'PAUSED',
}

export interface Trip {
    id: UUID;
    vehicleId: UUID;
    driverId: UUID;
    startDate: DateString;
    startTime: TimeString;
    endDate?: DateString;
    endTime?: TimeString;
    type?: VehicleType;
    color?: string;
    routes?: Route[];
    duration?: number;
    distance?: number;
    averageSpeed?: number;
    status?: TripStatus;
}

export interface CreateTripDto {
    vehicleId: UUID;
    driverId: UUID;
    startDate: DateString;
    startTime: TimeString;
    routes?: {
        startPoint: Coordinates;
        endPoint: Coordinates;
    }[];
}

export interface EndTripDto {
    endDate: DateString;
    endTime: TimeString;
}

export interface TripFilters extends DateFilter {
    vehicleId?: UUID;
    driverId?: UUID;
    fleetId?: UUID;
    status?: TripStatus;
    minDistance?: number;
    maxDistance?: number;
}

export interface TripStatistics {
    totalTrips: number;
    ongoingTrips: number;
    completedTrips: number;
    totalDistance: number;
    totalDuration: number;
    averageDistance: number;
    averageDuration: number;
    averageSpeed: number;
}

export interface DetailedTrip extends Trip {
    vehicleInfo: {
        licensePlate: string;
        brand?: string;
        model?: string;
        imageUrl?: string;
    };
    driverInfo: {
        name: string;
        phone?: string;
        avatar?: string;
    };
    fleetInfo?: {
        id: UUID;
        name: string;
    };
    startLocation?: Coordinates;
    endLocation?: Coordinates;
    geofenceEvents?: {
        zoneName: string;
        eventType: 'ENTRY' | 'EXIT';
        timestamp: string;
    }[];
}

export interface TripListItem {
    id: UUID;
    vehicleLicensePlate: string;
    driverName: string;
    startDate: DateString;
    startTime: TimeString;
    endDate?: DateString;
    endTime?: TimeString;
    distance?: number;
    duration?: number;
    status: TripStatus;
}