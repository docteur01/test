// Base types used across the fleet management application
// src/types/base.types.ts

export type UUID = string;
export type DateString = string;
export type TimeString = string;
export type DateTimeString = string;

export enum VehicleType {
    CAR = 'CAR',
    TRUCK = 'TRUCK',
    VAN = 'VAN',
    BIKE = 'BIKE',
}

export enum EngineStatus {
    OK = 'OK',
    NEEDS_SERVICE = 'NEEDS_SERVICE',
    CRITICAL = 'CRITICAL',
    DAMAGED = 'DAMAGED',
}

export enum MaintenanceStatus {
    UP_TO_DATE = 'UP_TO_DATE',
    PENDING = 'PENDING',
    OVERDUE = 'OVERDUE',
    IN_PROGRESS = 'IN_PROGRESS',
}

export enum GeofenceEventType {
    ENTRY = 'ENTRY',
    EXIT = 'EXIT',
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface OrderedCoordinates extends Coordinates {
    order: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiError {
    timestamp: DateTimeString;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface SuccessResponse {
    message: string;
}

export interface DateFilter {
    startDate?: DateString;
    endDate?: DateString;
}

export interface StatusInfo {
    active: boolean;
    label: string;
    color: 'success' | 'warning' | 'error' | 'info';
}