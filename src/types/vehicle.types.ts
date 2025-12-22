// Vehicle-related types for the fleet management application
// src/types/vehicle.types.ts

import { UUID, DateString, DateTimeString, VehicleType, EngineStatus, MaintenanceStatus, Coordinates } from './base.types';

export interface AssignedDriver {
    userId: UUID;
    name: string;
    phone?: string;
}

export interface FinancialParameters {
    insuranceNumber?: string;
    insuranceExpiryDate?: DateString;
    registrationDate?: DateString;
    purchaseDate?: DateString;
    depreciationRate?: number;
    costPerKm?: number;
}

export interface MaintenanceParameters {
    lastMaintenanceDate?: DateString;
    nextMaintenanceDue?: DateString;
    engineStatus?: EngineStatus;
    batteryHealth?: number;
    maintenanceStatus?: MaintenanceStatus;
}

export interface OperationalParameters {
    status: boolean;
    currentSpeed?: number;
    fuelLevel?: string;
    mileage?: number;
    odometerReading?: number;
    bearing?: number;
    timestamp?: DateTimeString;
    currentLocation?: Coordinates;
    currentTripId?: UUID;
}

export interface Vehicle {
    id: UUID;
    fleetId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    manufacturingYear?: number;
    type?: VehicleType;
    color?: string;
    imageUrl?: string;
    assignedDriver?: AssignedDriver;
    financialParameters?: FinancialParameters;
    maintenanceParameters?: MaintenanceParameters;
    operationalParameters?: OperationalParameters;
}

export interface CreateVehicleDto {
    fleetId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    manufacturingYear?: number;
    type?: VehicleType;
    color?: string;
    imageUrl?: string;
}

export interface UpdateVehicleDto {
    licensePlate?: string;
    brand?: string;
    model?: string;
    manufacturingYear?: number;
    type?: VehicleType;
    color?: string;
    imageUrl?: string;
}

export interface UpdateFinancialParametersDto extends Partial<FinancialParameters> {}

export interface UpdateMaintenanceParametersDto extends Partial<MaintenanceParameters> {}

export interface VehicleFilters {
    fleetId?: UUID;
    type?: VehicleType;
    status?: boolean;
    search?: string;
    assignedDriverId?: UUID;
    maintenanceStatus?: MaintenanceStatus;
}

export interface VehicleMapView {
    id: UUID;
    licensePlate: string;
    type: VehicleType;
    color?: string;
    currentLocation?: Coordinates;
    currentSpeed?: number;
    bearing?: number;
    status: boolean;
    driverName?: string;
}